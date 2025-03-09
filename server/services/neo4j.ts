import neo4j, { Driver, Session } from 'neo4j-driver';
import {
  type AcademicField, type Course, type Lesson,
  type Paper, type Journal
} from '../../shared/schema';

export class Neo4jService {
  private driver: Driver;
  private isConnected: boolean = false;

  constructor() {
    const uri = "neo4j+s://19ade1e9.databases.neo4j.io";
    const user = "neo4j";
    const password = "D9sdsnBUH6XHlkwftVuPgv_7P0-wpDnmE0nA5avG4uM";

    if (!uri || !user || !password) {
      throw new Error('Missing Neo4j credentials. Please set NEO4J_URI, NEO4J_USER, and NEO4J_PASSWORD environment variables.');
    }

    this.driver = neo4j.driver(uri, neo4j.auth.basic(user, password), {
      maxConnectionLifetime: 3 * 60 * 60 * 1000, // 3 hours
      maxConnectionPoolSize: 50,
      connectionAcquisitionTimeout: 30000, // 30 seconds
    });
  }

  async initialize() {
    if (this.isConnected) return;

    try {
      await this.driver.verifyConnectivity();
      console.log('Successfully connected to Neo4j database');
      this.isConnected = true;
    } catch (error) {
      console.error('Failed to connect to Neo4j:', error);
      throw new Error('Neo4j connection failed');
    }
  }

  private async getSession(): Promise<Session> {
    if (!this.isConnected) {
      await this.initialize();
    }
    return this.driver.session();
  }

  async createAcademicField(field: AcademicField) {
    const session = await this.getSession();
    try {
      await session.run(
        `CREATE (f:AcademicField {
          id: $id,
          name: $name,
          description: $description
        })`,
        field
      );
      console.log("Created academic field: ${field.name}");
    } catch (error) {
      console.error("Error creating academic field: ${error}");
      throw error;
    } finally {
      await session.close();
    }
  }

  async createCourse(course: Course) {
    const session = await this.getSession();
    try {
      await session.run(
        `MATCH (f:AcademicField {id: $fieldId})
         CREATE (c:Course {
           id: $id,
           title: $title,
           description: $description,
           provider: $provider,
           url: $url
         })-[:BELONGS_TO]->(f)`,
        course
      );
      console.log("Created course: ${course.title}");
    } catch (error) {
      console.error("Error creating course: ${error}");
      throw error;
    } finally {
      await session.close();
    }
  }

  async createLesson(lesson: Lesson) {
    const session = await this.getSession();
    try {
      await session.run(
        `MATCH (c:Course {id: $courseId})
         CREATE (l:Lesson {
           id: $id,
           title: $title,
           content: $content
         })-[:PART_OF]->(c)`,
        lesson
      );
      console.log("Created lesson: ${lesson.title}");
    } catch (error) {
      console.error("Error creating lesson: ${error}");
      throw error;
    } finally {
      await session.close();
    }
  }

  async createPaper(paper: Paper) {
    const session = await this.getSession();
    try {
      const result = await session.run(
        `CREATE (p:Paper {
          id: $id,
          title: $title,
          abstract: $abstract,
          authors: $authors,
          publicationDate: $publicationDate,
          doi: $doi,
          citations: $citations,
          url: $url
        }) RETURN p`,
        paper
      );
      console.log("Created paper: ${paper.title}");
      return result.records[0].get('p').properties;
    } catch (error) {
      console.error("Error creating paper: ${error}");
      throw error;
    } finally {
      await session.close();
    }
  }

  async createJournal(journal: Journal) {
    const session = await this.getSession();
    try {
      const result = await session.run(
        `CREATE (j:Journal {
          id: $id,
          name: $name,
          publisher: $publisher,
          impactFactor: $impactFactor
        }) RETURN j`,
        journal
      );
      console.log("Created journal: ${journal.name}");
      return result.records[0].get('j').properties;
    } catch (error) {
      console.error("Error creating journal: ${error}");
      throw error;
    } finally {
      await session.close();
    }
  }

  async close() {
    if (this.driver) {
      await this.driver.close();
      this.isConnected = false;
      console.log('Neo4j connection closed');
    }
  }
}

// Create and initialize the service
export const neo4jService = new Neo4jService();