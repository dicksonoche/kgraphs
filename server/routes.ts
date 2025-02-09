import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./strorage";
import { neo4jService } from "./services/neo4j";
import { 
  fetchChemistryPapers,
  fetchChemistryJournals,
  wikidataLimiter
} from "./services/wikidata";
import {
  searchChemistryPapers,
  scholarLimiter
} from "./services/googleScholar";
import {
  insertPaperSchema,
  insertJournalSchema
} from "../shared/shema";

export function registerRoutes(app: Express): Server {
  // Wikidata routes
  app.get('/api/wikidata/papers', wikidataLimiter, async (req, res) => {
    try {
      const papers = await fetchChemistryPapers();
      const savedPapers = await Promise.all(
        papers.map(paper => storage.createPaper(paper))
      );
      await Promise.all(
        savedPapers.map(paper => neo4jService.createPaper(paper))
      );
      res.json(savedPapers);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching papers from Wikidata' });
    }
  });

  app.get('/api/wikidata/journals', wikidataLimiter, async (req, res) => {
    try {
      const journals = await fetchChemistryJournals();
      const savedJournals = await Promise.all(
        journals.map(journal => storage.createJournal(journal))
      );
      await Promise.all(
        savedJournals.map(journal => neo4jService.createJournal(journal))
      );
      res.json(savedJournals);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching journals from Wikidata' });
    }
  });

  // Google Scholar routes
  app.get('/api/scholar/search', scholarLimiter, async (req, res) => {
    const query = req.query.q as string;
    if (!query) {
      return res.status(400).json({ message: 'Query parameter required' });
    }

    try {
      const papers = await searchChemistryPapers(query);
      const savedPapers = await Promise.all(
        papers.map(paper => storage.createPaper(paper))
      );
      await Promise.all(
        savedPapers.map(paper => neo4jService.createPaper(paper))
      );
      res.json(savedPapers);
    } catch (error) {
      res.status(500).json({ message: 'Error searching Google Scholar' });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}