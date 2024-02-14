import { z } from "zod";

export const formSchema = z.object({
    content: z.string().min(100),
    title: z.string().min(20).max(100),
    subTitle: z.string().min(40).max(200),
    slug: z.string().min(10).max(100),
    uid: z.string().length(5),
    date: z.string().min(1),
    minToRead: z.string().min(1),
    topic: z.string().min(1),
    coverImage: z.custom<File>(),
    coverImageAlt: z.string().min(1),
    coverImageCaption: z.string().min(1),
    coverImageCredit: z.string().optional(),
    coverImageCreditLink: z.string().optional(),
    topicColor: z.string().min(1),
    author: z.string().min(1),
    authorUUID: z.string().min(1),
    AIsummary: z.string().optional(),
});

export type FormSchema = typeof formSchema;