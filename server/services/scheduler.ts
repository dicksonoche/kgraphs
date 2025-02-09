import { neo4jService } from './neo4j';
import { fetchChemistryPapers, fetchChemistryJournals } from './wikidata';
import { searchChemistryPapers } from './googleScholar';

export class Scheduler {
  private jobs: Map<string, NodeJS.Timeout> = new Map();

  scheduleJob(cronExpression: string, jobName: string, task: () => Promise<void>) {
    const [minute, hour] = cronExpression.split(' ');
    
    const now = new Date();
    const nextRun = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate(),
      parseInt(hour),
      parseInt(minute)
    );
    
    if (nextRun <= now) {
      nextRun.setDate(nextRun.getDate() + 1);
    }
    
    const timeout = nextRun.getTime() - now.getTime();
    
    const job = setTimeout(async () => {
      try {
        await task();
        this.scheduleJob(cronExpression, jobName, task);
      } catch (error) {
        console.error("Job ${jobName} failed:", error);
      }
    }, timeout);
    
    this.jobs.set(jobName, job);
  }

  cancelJob(jobName: string) {
    const job = this.jobs.get(jobName);
    if (job) {
      clearTimeout(job);
      this.jobs.delete(jobName);
    }
  }
}

export const scheduler = new Scheduler();