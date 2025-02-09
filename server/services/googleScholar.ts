import axios from 'axios';
import * as cheerio from 'cheerio';
import { InsertPaper } from '../../shared/shema';
import rateLimit from 'express-rate-limit';

const GOOGLE_SCHOLAR_URL = 'https://scholar.google.com/scholar';

export const scholarLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 10 // 10 requests per minute
});

export async function searchChemistryPapers(query: string): Promise<InsertPaper[]> {
  try {
    const response = await axios.get(GOOGLE_SCHOLAR_URL, {
      params: {
        q: "chemistry ${query}",
        hl: 'en'
      },
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      }
    });

    const $ = cheerio.load(response.data);
    const papers: InsertPaper[] = [];

    $('.gs_ri').each((_, element) => {
      const $element = $(element);
      const title = $element.find('.gs_rt').text().trim();
      const authors = $element.find('.gs_a').text().split('-')[0].trim();
      const abstract = $element.find('.gs_rs').text().trim();
      const citationsText = $element.find('.gs_fl a').first().text();
      const citations = parseInt(citationsText.match(/\d+/)?.[0] || '0');

      papers.push({
        title,
        abstract,
        authors: authors.split(',').map(a => a.trim()),
        publicationDate: new Date().toISOString(), // Would need better parsing
        citations,
        url: $element.find('.gs_rt a').attr('href') || '',
      });
    });

    return papers;
  } catch (error) {
    console.error('Error fetching from Google Scholar:', error);
    throw error;
  }
}