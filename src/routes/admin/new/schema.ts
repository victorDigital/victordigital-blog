import { z } from "zod";

export const formSchema = z.object({
  content: z.string().min(100),
  title: z.string().min(1).max(100),
  subTitle: z.string().min(1).max(200),
  slug: z.string().min(1).max(100),
  uid: z.string().length(5),
  date: z.string().min(1),
  minToRead: z.string().min(1),
  topic: z.string().min(1),
  coverImageFile: z.custom<File>(),
  coverImageLink: z.string().optional(),
  coverImageLinkAvif: z.string().optional(),
  coverImageLinkWebp: z.string().optional(),
  coverImageLinkPng: z.string().optional(),
  coverImageLink100x300Avif: z.string().optional(),
  coverImageLink100x300Webp: z.string().optional(),
  coverImageLink100x300Png: z.string().optional(),
  coverImageLink200x600Avif: z.string().optional(),
  coverImageLink200x600Webp: z.string().optional(),
  coverImageLink200x600Png: z.string().optional(),
  coverImageAlt: z.string().min(1),
  topicColor: z.string().min(1),
  author: z.string().min(1),
  authorUUID: z.string().min(1),
  AIsummary: z.string().optional(),
});

export type FormSchema = typeof formSchema;
