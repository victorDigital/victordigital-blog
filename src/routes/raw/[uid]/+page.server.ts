import type { Post } from "$lib/types/post";
import { sql } from "@vercel/postgres";
import type { PageServerLoad } from "./$types";

export const load = (async ({ url }) => {
  const start = Date.now();
  let uid = url.pathname.split("/").pop();

  const { rows } = await sql`SELECT * FROM Posts WHERE uid = ${uid}`;
  let post = rows[0] as Post;
  const end = Date.now();

  return { uid, post, time: end - start };
}) satisfies PageServerLoad;
