import { sql } from "@vercel/postgres";
import type { PageServerLoad } from "./$types";

export const load = (async () => {
  let start = Date.now();
  //find the first post in the post table with the title "my title"
  let posts = await sql`SELECT * FROM Posts WHERE Title = 'my title' LIMIT 1`;
  console.log(posts);

  let end = Date.now();
  return { posts, time: end - start };
}) satisfies PageServerLoad;
