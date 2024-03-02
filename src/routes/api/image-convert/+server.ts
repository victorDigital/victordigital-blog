import { error, json } from "@sveltejs/kit";
import type { RequestHandler } from "./$types";
import sharp from "sharp";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

export const POST: RequestHandler = async ({ request }) => {
  const startTime = Date.now();

  // get the image from the request body
  const body = await request.json();
  const imagelink = body.image;
  const width = body.width;
  const height = body.height;
  const format = body.format;
  //download the image and save in a variable using a buffer
  let buffer = await (await fetch(imagelink)).arrayBuffer();
  const image = sharp(Buffer.from(buffer));
  console.log("image", image);

  const endTime = Date.now();
  return json({ time: endTime - startTime, newImage: await resizeImage(image, format, width, height) });
};

async function resizeImage(
  image: sharp.Sharp,
  format: "avif" | "webp" | "png" | "jpeg" | "jpg",
  width?: number,
  height?: number
) {
  // create a random filename of 7 characters
  const fileName = Math.random().toString(36).substring(2, 9);

  const formatLookup = {
    avif: "image/avif",
    webp: "image/webp",
    png: "image/png",
    jpeg: "image/jpeg",
    jpg: "image/jpeg",
  };

  let modifiedImage: Buffer;
  if (width && height) {
    modifiedImage = await image.resize(width, height).toFormat(format).toBuffer();
  } else {
    modifiedImage = await image.toFormat(format).toBuffer();
  }

  const newFilename = `resized-${fileName}-${width}-${height}.${format}`;

  // upload the new image to the storage bucket
  const storage = getStorage();
  const storageRef = ref(storage, newFilename);

  const metadata = {
    contentType: formatLookup[format],
  };

  await uploadBytes(storageRef, modifiedImage, metadata);

  const downloadURL = await getDownloadURL(storageRef);

  return downloadURL;
}
