import type { PageServerLoad } from './$types';
import { getFirestore, collection, query, where, getDocs } from "firebase/firestore";


export const load = (async () => {
    // find all posts and return them
    const db = getFirestore();
    const q = query(collection(db, "posts"));
    const querySnapshot = await getDocs(q);
    const posts: any[] = [];
    querySnapshot.forEach((doc) => {
        posts.push({...doc.data(), content: ""});
    });


    return {posts};
}) satisfies PageServerLoad;