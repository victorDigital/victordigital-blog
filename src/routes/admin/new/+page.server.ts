import type { PageServerLoad } from "./$types";
import { fail, redirect } from "@sveltejs/kit";
import { zod } from "sveltekit-superforms/adapters";
import { superValidate, withFiles } from "sveltekit-superforms/server";
import { formSchema } from "./schema";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { addDoc, collection, getFirestore } from "firebase/firestore";

export const load = async () => {
  return {
    form: await superValidate(zod(formSchema)),
  };
};

// superforms v1 DEPRECATED
//export const actions: Actions = {
//  default: async (event) => {
//    const formData = await event.request.formData();
//    const form = await superValidate(zod(formSchema));
//    console.log("Form valid:", form.valid);
//    if (!form.valid) {
//      return fail(400, {
//        form,
//      });
//    }
//
//    const file = formData.get("coverImage");
//    if (file instanceof File) {
//      //read the filename and type
//      const filename = file.name;
//
//      //upload file to firebase storage bucket and get url
//      const storage = getStorage();
//      const storageRef = ref(storage, filename);
//      await uploadBytes(storageRef, file);
//
//      const downloadURL = await getDownloadURL(storageRef);
//
//      //now create a new post in the firestore
//      const post = {
//        ...form.data,
//        AIsummary: "Unimplemented AI summary",
//        coverImage: downloadURL,
//      };
//
//      //add the post to the firestore
//      const db = getFirestore();
//      const docRef = await addDoc(collection(db, "posts"), post);
//      console.log("Document written with ID: ", docRef.id);
//      throw redirect(302, "/a/" + form.data.uid);
//    }
//
//    return {
//      form,
//    };
//  },
//};

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

      //add the post to the firestore
      const db = getFirestore();
      const docRef = await addDoc(collection(db, "posts"), post);
      console.log("Document written with ID: ", docRef.id);
      throw redirect(302, "/a/" + form.data.uid);
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
