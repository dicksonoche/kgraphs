import express, { type Request, Response, NextFunction } from "express";
import { registerRoutes } from "./routes";
import { setupVite, serveStatic, log } from "./vite";
import { scheduler } from './services/scheduler';
import { neo4jService } from './services/neo4j';
import { fetchChemistryPapers, fetchChemistryJournals } from './services/wikidata';
import { searchChemistryPapers } from './services/googleScholar';

const app = express();

// Schedule data ingestion job to run daily at 2 AM
scheduler.scheduleJob('0 2', 'dataIngestion', async () => {
  console.log('Starting scheduled data ingestion...');
  try {
    const [wikiPapers, wikiJournals, scholarPapers] = await Promise.all([
      fetchChemistryPapers(),
      fetchChemistryJournals(),
      searchChemistryPapers('recent chemistry research')
    ]);

    await Promise.all([
      ...wikiPapers.map(paper => neo4jService.createPaper(paper)),
      ...wikiJournals.map(journal => neo4jService.createJournal(journal)),
      ...scholarPapers.map(paper => neo4jService.createPaper(paper))
    ]);
    
    console.log('Scheduled data ingestion completed successfully');
  } catch (error) {
    console.error('Scheduled data ingestion failed:', error);
  }
});

// Add trust proxy setting for rate limiter to work in Replit
app.set('trust proxy', 1);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use((req, res, next) => {
  const start = Date.now();
  const path = req.path;
  let capturedJsonResponse: Record<string, any> | undefined = undefined;

  const originalResJson = res.json;
  res.json = function (bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };

  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path.startsWith("/api")) {
      let logLine = "${req.method} ${path} ${res.statusCode} in ${duration}ms";
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }

      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "…";
      }

      log(logLine);
    }
  });

  next();
});

(async () => {
  const server = registerRoutes(app);

  app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
    log("Error: ${err.message}");
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    res.status(status).json({ message });
  });

  if (app.get("env") === "development") {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }

  const PORT = 5000;
  server.listen(PORT, "0.0.0.0", () => {
    log("serving on port ${PORT}");
  });
})();