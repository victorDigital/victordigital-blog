import type { PageServerLoad } from "./$types";
import type { Post } from "$lib/types/post";
import { sql } from "@vercel/postgres";

export const load = (async () => {
  const start = Date.now();
  // find all posts (ROWS) in the posts table and return them in a posts array
  const { rows } = await sql`SELECT * FROM Posts`;
  let posts = rows as Post[];
  const end = Date.now();

  //before returning the posts, we need to strip the content from the posts
  posts = posts.map((post) => {
    return {
      ...post,
      content: "",
      coverimagelinkavif: "",
      coverimagelinkwebp: "",
      coverimagelinkpng: "",
    };
  });

  return { posts, time: end - start };
}) satisfies PageServerLoad;
