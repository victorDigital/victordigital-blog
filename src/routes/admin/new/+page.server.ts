import type { PageServerLoad } from "./$types";
import { fail, redirect } from "@sveltejs/kit";
import { zod } from "sveltekit-superforms/adapters";
import { superValidate, withFiles } from "sveltekit-superforms/server";
import { formSchema } from "./schema";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { sql } from "@vercel/postgres";

export const load = async () => {
  return {
    form: await superValidate(zod(formSchema)),
  };
};

export const actions = {
  default: async ({ request, fetch }) => {
    const formData = await request.formData();
    console.log("formData", formData);
    const form = await superValidate(formData, zod(formSchema), { allowFiles: true });

    if (!form.valid) {
      return fail(400, withFiles({ form }));
    }

    const file = formData.get("Cover Image");
    console.log("file", file);
    console.log("file instanceof File", file instanceof File);
    if (file instanceof File) {
      //read the filename and type
      const filename = file.name;

      //upload file to firebase storage bucket and get url
      const storage = getStorage();
      const storageRef = ref(storage, filename);
      await uploadBytes(storageRef, file);

      const downloadURL = await getDownloadURL(storageRef);

      //now create a new post in the firestore
      const post = {
        ...form.data,
        AIsummary: "Unimplemented",
        coverImageLink: downloadURL,
        coverImageLinkAvif: await formatConvert(fetch, downloadURL, "avif"),
        coverImageLinkWebp: await formatConvert(fetch, downloadURL, "webp"),
        coverImageLinkPng: await formatConvert(fetch, downloadURL, "png"),
        coverImageLink100x300Avif: await formatConvert(fetch, downloadURL, "avif", 300, 100),
        coverImageLink100x300Webp: await formatConvert(fetch, downloadURL, "webp", 300, 100),
        coverImageLink100x300Png: await formatConvert(fetch, downloadURL, "png", 300, 100),
        coverImageLink200x600Avif: await formatConvert(fetch, downloadURL, "avif", 600, 200),
        coverImageLink200x600Webp: await formatConvert(fetch, downloadURL, "webp", 600, 200),
        coverImageLink200x600Png: await formatConvert(fetch, downloadURL, "png", 600, 200),
      };

      //add the post to the vercel postgres database
      await sql`INSERT INTO Posts ( AIsummary, Author, AuthorUUID, Content, CoverImageLink, CoverImageLinkAvif,
      CoverImageLinkWebp, CoverImageLinkPng, CoverImageLink100x300Avif, CoverImageLink100x300Webp, CoverImageLink100x300Png,
      CoverImageLink200x600Avif, CoverImageLink200x600Webp, CoverImageLink200x600Png, CoverImageAlt, Date, MinToRead,
      Slug, SubTitle, Title, Topic, TopicColor, UID ) VALUES ( ${post.AIsummary}, ${post.author}, ${post.authorUUID}, ${post.content}, ${post.coverImageLink},
      ${post.coverImageLinkAvif}, ${post.coverImageLinkWebp}, ${post.coverImageLinkPng}, ${post.coverImageLink100x300Avif}, ${post.coverImageLink100x300Webp},
      ${post.coverImageLink100x300Png}, ${post.coverImageLink200x600Avif}, ${post.coverImageLink200x600Webp}, ${post.coverImageLink200x600Png}, ${post.coverImageAlt},
      ${post.date}, ${post.minToRead}, ${post.slug}, ${post.subTitle}, ${post.title}, ${post.topic}, ${post.topicColor}, ${post.uid} )`;

      return redirect(302, "/posts/" + post.slug);
    }

    return withFiles({ form });
  },
};

async function formatConvert(
  fetch: (input: RequestInfo, init?: RequestInit | undefined) => Promise<Response>,
  image: string,
  format: "avif" | "webp" | "png" | "jpeg" | "jpg",
  width?: number,
  height?: number
) {
  console.log("formatConvert");
  let link: string = "test";
  await fetch("/api/image-convert", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ image, format, width, height }),
  })
    .then((response) => response.json())
    .then((a) => {
      console.log("Success:", a);
      link = a.newImage;
    })
    .catch((error) => {
      return error;
    });

  return link;
}
