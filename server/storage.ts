import {
    type AcademicField, type Course, type Lesson,
    type Paper, type Journal,
    type InsertAcademicField, type InsertCourse,
    type InsertLesson, type InsertPaper, type InsertJournal
  } from "../shared/shema";
  import { v4 as uuidv4 } from 'uuid';
  
  export interface IStorage {
    // Academic Fields
    getAcademicField(id: string): Promise<AcademicField | undefined>;
    createAcademicField(field: InsertAcademicField): Promise<AcademicField>;
    
    // Courses
    getCourse(id: string): Promise<Course | undefined>;
    createCourse(course: InsertCourse): Promise<Course>;
    
    // Lessons
    getLesson(id: string): Promise<Lesson | undefined>;
    createLesson(lesson: InsertLesson): Promise<Lesson>;
    
    // Papers
    getPaper(id: string): Promise<Paper | undefined>;
    createPaper(paper: InsertPaper): Promise<Paper>;
    
    // Journals
    getJournal(id: string): Promise<Journal | undefined>;
    createJournal(journal: InsertJournal): Promise<Journal>;
  }
  
  export class MemStorage implements IStorage {
    private academicFields: Map<string, AcademicField>;
    private courses: Map<string, Course>;
    private lessons: Map<string, Lesson>;
    private papers: Map<string, Paper>;
    private journals: Map<string, Journal>;
  
    constructor() {
      this.academicFields = new Map();
      this.courses = new Map();
      this.lessons = new Map();
      this.papers = new Map();
      this.journals = new Map();
    }
  
    // Academic Fields
    async getAcademicField(id: string): Promise<AcademicField | undefined> {
      return this.academicFields.get(id);
    }
  
    async createAcademicField(field: InsertAcademicField): Promise<AcademicField> {
      const id = uuidv4();
      const newField = { ...field, id };
      this.academicFields.set(id, newField);
      return newField;
    }
  
    // Courses
    async getCourse(id: string): Promise<Course | undefined> {
      return this.courses.get(id);
    }
  
    async createCourse(course: InsertCourse): Promise<Course> {
      const id = uuidv4();
      const newCourse = { ...course, id };
      this.courses.set(id, newCourse);
      return newCourse;
    }
  
    // Lessons
    async getLesson(id: string): Promise<Lesson | undefined> {
      return this.lessons.get(id);
    }
  
    async createLesson(lesson: InsertLesson): Promise<Lesson> {
      const id = uuidv4();
      const newLesson = { ...lesson, id };
      this.lessons.set(id, newLesson);
      return newLesson;
    }
  
    // Papers
    async getPaper(id: string): Promise<Paper | undefined> {
      return this.papers.get(id);
    }
  
    async createPaper(paper: InsertPaper): Promise<Paper> {
      const id = uuidv4();
      const newPaper = { ...paper, id };
      this.papers.set(id, newPaper);
      return newPaper;
    }
  
    // Journals
    async getJournal(id: string): Promise<Journal | undefined> {
      return this.journals.get(id);
    }
  
    async createJournal(journal: InsertJournal): Promise<Journal> {
      const id = uuidv4();
      const newJournal = { ...journal, id };
      this.journals.set(id, newJournal);
      return newJournal;
    }
  }
  
  export const storage = new MemStorage();