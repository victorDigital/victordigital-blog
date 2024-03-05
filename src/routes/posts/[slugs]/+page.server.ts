import type { Post } from "$lib/types/post";
import { sql } from "@vercel/postgres";
import type { PageServerLoad } from "./$types";

export const load = (async ({ url }) => {
  const start = Date.now();
  let slug = url.pathname.split("/").pop();

  const { rows } = await sql`SELECT * FROM Posts WHERE Slug = ${slug}`;
  let post = rows[0] as Post;
  const end = Date.now();

  return { slug, post, time: end - start };
}) satisfies PageServerLoad;
