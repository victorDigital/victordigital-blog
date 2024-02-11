import { z } from "zod";

export const formSchema = z.object({
    content: z.string(),
    title: z.string(),
    subTitle: z.string(),
    slug: z.string(),
    uid: z.string(),
    date: z.string(),
    minToRead: z.string(),
    topic: z.string(),
    coverImage: z.custom<File>(),
    coverImageAlt: z.string(),
    coverImageCaption: z.string(),
    coverImageCredit: z.string(),
    coverImageCreditLink: z.string(),
    topicColor: z.string(),
    author: z.string(),
    authorUUID: z.string(),
    AIsummary: z.string().optional(),
});

export type FormSchema = typeof formSchema;