import type { PageServerLoad } from "./$types";
import type { Post } from "$lib/types/post";
import {
  getFirestore,
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";

export const load = (async () => {
  // find all posts and return them
  const db = getFirestore();
  const q = query(collection(db, "posts"));
  const querySnapshot = await getDocs(q);
  const posts: Post[] = [];
  querySnapshot.forEach((doc) => {
    posts.push({ ...(doc.data() as Post), content: "" });
  });

  return { posts };
}) satisfies PageServerLoad;
