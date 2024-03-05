import { error, json } from "@sveltejs/kit";
import type { RequestHandler } from "./$types";
import { sql } from "@vercel/postgres";

export const GET: RequestHandler = async () => {
  console.log("Creating table");
  try {
    const result =
      await sql`CREATE TABLE Posts ( AIsummary TEXT, Author TEXT, AuthorUUID TEXT, Content TEXT, CoverImageLink TEXT, CoverImageLinkAvif TEXT, 
        CoverImageLinkWebp TEXT, CoverImageLinkPng TEXT, CoverImageLink100x300Avif TEXT, CoverImageLink100x300Webp TEXT, CoverImageLink100x300Png TEXT, 
        CoverImageLink200x600Avif TEXT, CoverImageLink200x600Webp TEXT, CoverImageLink200x600Png TEXT, CoverImageAlt TEXT, Date TEXT, MinToRead INT, 
        Slug TEXT, SubTitle TEXT, Title TEXT, Topic TEXT, TopicColor TEXT, UID TEXT )`;
    console.log(result);
    return json({ result });
  } catch (e) {
    console.log(e);
    return error(500, "error");
  }
};
