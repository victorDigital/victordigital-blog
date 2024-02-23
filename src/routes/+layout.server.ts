import { firebaseInit } from "$lib/js/firebase";
import type { LayoutServerLoad } from "./$types";

export const load = (async () => {
  firebaseInit();
  return {};
}) satisfies LayoutServerLoad;
