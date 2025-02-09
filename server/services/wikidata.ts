import axios from 'axios';
import { InsertPaper, InsertJournal } from '../../shared/shema'
import rateLimit from 'express-rate-limit';

const WIKIDATA_ENDPOINT = 'https://query.wikidata.org/sparql';
const MAX_RETRIES = 3;
const RETRY_DELAY = 1000; // 1 second

export const wikidataLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 30 // 30 requests per minute
});

async function makeWikidataRequest(query: string, retries = MAX_RETRIES): Promise<any> {
  try {
    const response = await axios.get(WIKIDATA_ENDPOINT, {
      params: {
        query,
        format: 'json'
      },
      headers: {
        'Accept': 'application/json',
        'User-Agent': 'ChemistryDataCollector/1.0'
      }
    });
    return response.data;
  } catch (error: any) {
    if (retries > 0 && (error.response?.status === 429 || error.response?.status >= 500)) {
      console.log("Retrying Wikidata request, ${retries} attempts remaining");
      await new Promise(resolve => setTimeout(resolve, RETRY_DELAY));
      return makeWikidataRequest(query, retries - 1);
    }
    throw new Error("Wikidata API error: ${error.message}");
  }
}

export async function fetchChemistryPapers(): Promise<InsertPaper[]> {
  const query = `
    SELECT DISTINCT ?paper ?paperLabel ?abstract ?date ?doi WHERE {
      ?paper wdt:P31 wd:Q13442814;
             wdt:P921 wd:Q2329;
             rdfs:label ?paperLabel;
             wdt:P577 ?date.
      OPTIONAL { ?paper wdt:P1476 ?abstract }
      OPTIONAL { ?paper wdt:P356 ?doi }
      FILTER(LANG(?paperLabel) = "en")
      FILTER(YEAR(?date) >= YEAR(NOW()) - 2)
    }
    LIMIT 50
  `;

  try {
    const data = await makeWikidataRequest(query);
    if (!data.results?.bindings) {
      throw new Error('Invalid response format from Wikidata');
    }

    return data.results.bindings.map((result: any) => ({
      title: result.paperLabel.value,
      abstract: result.abstract?.value || 'No abstract available',
      authors: [], // Would need another query to fetch authors
      publicationDate: new Date(result.date.value).toISOString(),
      doi: result.doi?.value,
      citations: 0,
      url: result.doi?.value ? "https://doi.org/${result.doi.value}" : '',
    }));
  } catch (error) {
    console.error('Error fetching chemistry papers:', error);
    throw error;
  }
}

export async function fetchChemistryJournals(): Promise<InsertJournal[]> {
  const query = `
    SELECT DISTINCT ?journal ?journalLabel ?publisher ?publisherLabel ?impact WHERE {
      ?journal wdt:P31 wd:Q5633421;
               wdt:P921 wd:Q2329;
               rdfs:label ?journalLabel;
               wdt:P123 ?publisher.
      ?publisher rdfs:label ?publisherLabel
      OPTIONAL { ?journal wdt:P4510 ?impact }
      FILTER(LANG(?journalLabel) = "en")
      FILTER(LANG(?publisherLabel) = "en")
    }
    LIMIT 50
  `;

  try {
    const data = await makeWikidataRequest(query);
    if (!data.results?.bindings) {
      throw new Error('Invalid response format from Wikidata');
    }

    return data.results.bindings.map((result: any) => ({
      name: result.journalLabel.value,
      publisher: result.publisherLabel.value,
      impactFactor: result.impact?.value ? parseFloat(result.impact.value) : null
    }));
  } catch (error) {
    console.error('Error fetching chemistry journals:', error);
    throw error;
  }
}