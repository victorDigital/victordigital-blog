import type { RequestHandler } from './$types';
import { redirect } from '@sveltejs/kit';
import { Redirect } from '@sveltejs/kit';
import { getFirestore, collection, query, where, getDocs } from "firebase/firestore";
import { firebaseInit } from '$lib/js/firebase';


export const GET: RequestHandler = async ({ url }) => {
    firebaseInit();
    let uid = url.pathname.split('/').pop();
    const db = getFirestore();
    const q = query(collection(db, "posts"), where("uid", "==", uid));
    const querySnapshot = await getDocs(q);
    const slug = querySnapshot.docs[0].data().slug;
    throw redirect(302, `/posts/${slug}`)
};