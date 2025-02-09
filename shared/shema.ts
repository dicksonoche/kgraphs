import { z } from "zod";

// Base schemas
export const academicFieldSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string().optional(),
});

export const courseSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  provider: z.string(),
  url: z.string().url(),
  fieldId: z.string(),
});

export const lessonSchema = z.object({
  id: z.string(),
  title: z.string(),
  content: z.string(),
  courseId: z.string(),
});

export const paperSchema = z.object({
  id: z.string(),
  title: z.string(),
  abstract: z.string(),
  authors: z.array(z.string()),
  publicationDate: z.string(),
  doi: z.string().optional(),
  citations: z.number().default(0),
  url: z.string().url(),
  journalId: z.string().optional(),
});

export const journalSchema = z.object({
  id: z.string(),
  name: z.string(),
  publisher: z.string(),
  impactFactor: z.number().optional(),
});

// Insert schemas (without IDs)
export const insertAcademicFieldSchema = academicFieldSchema.omit({ id: true });
export const insertCourseSchema = courseSchema.omit({ id: true });
export const insertLessonSchema = lessonSchema.omit({ id: true });
export const insertPaperSchema = paperSchema.omit({ id: true });
export const insertJournalSchema = journalSchema.omit({ id: true });

// Types
export type AcademicField = z.infer<typeof academicFieldSchema>;
export type Course = z.infer<typeof courseSchema>;
export type Lesson = z.infer<typeof lessonSchema>;
export type Paper = z.infer<typeof paperSchema>;
export type Journal = z.infer<typeof journalSchema>;

export type InsertAcademicField = z.infer<typeof insertAcademicFieldSchema>;
export type InsertCourse = z.infer<typeof insertCourseSchema>;
export type InsertLesson = z.infer<typeof insertLessonSchema>;
export type InsertPaper = z.infer<typeof insertPaperSchema>;
export type InsertJournal = z.infer<typeof insertJournalSchema>;