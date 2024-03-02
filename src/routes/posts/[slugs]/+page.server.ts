import type { Post } from "$lib/types/post";
import type { PageServerLoad } from "./$types";
import { getFirestore, collection, query, where, getDocs } from "firebase/firestore";

export const load = (async ({ url }) => {
  let slug = url.pathname.split("/").pop();

  const db = getFirestore();
  const q = query(collection(db, "posts"), where("slug", "==", slug));
  const querySnapshot = await getDocs(q);
  let post: Post = {
    AIsummary: "",
    author: "",
    authorUUID: "",
    content: "",
    coverImageLink: "",
    coverImageFile: null,
    coverImageLink100x300Avif: "",
    coverImageLink100x300Webp: "",
    coverImageLink100x300Png: "",
    coverImageLink200x600Avif: "",
    coverImageLink200x600Webp: "",
    coverImageLink200x600Png: "",
    coverImageLinkAvif: "",
    coverImageLinkWebp: "",
    coverImageLinkPng: "",
    coverImageAlt: "",
    date: "",
    minToRead: 0,
    slug: "",
    subTitle: "",
    title: "",
    topic: "",
    topicColor: "",
    uid: "",
  }; // Initialize post variable with an empty object
  querySnapshot.forEach((doc) => {
    post = doc.data() as Post;
    // change $$[...]$$ to ```latex $$[...]$$```
    post.content = post.content.replace(/\$\$([^$]+)\$\$/g, "```latex\n$1\n```");
  });

  return { slug, post };
}) satisfies PageServerLoad;
