import type { PageServerLoad } from "./$types";

export const load = (async ({ fetch }) => {
  console.log("fetching");
  let res = await fetch("/api/add-post", {
    method: "POST",
    body: JSON.stringify({ author: "me", title: "my title", content: "my content" }),
  });

  let body = await res.json();
  console.log(body);

  return {};
}) satisfies PageServerLoad;
