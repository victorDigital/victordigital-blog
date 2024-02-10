import type { PageServerLoad } from './$types';
import { getFirestore, collection, query, where, getDocs } from "firebase/firestore";

export const load = (async ({url}) => {
    let slug = url.pathname.split('/').pop();

    const db = getFirestore();
    const q = query(collection(db, "posts"), where("slug", "==", slug));
    const querySnapshot = await getDocs(q);
    let post = {};
    querySnapshot.forEach((doc) => {
        post = doc.data();
    });

    console.log(slug);
    return {slug, post};
}) satisfies PageServerLoad;