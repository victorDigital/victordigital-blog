import type { PageServerLoad, Actions } from "./$types";
import { fail, redirect } from "@sveltejs/kit";
import { superValidate } from "sveltekit-superforms/server";
import { formSchema } from "./schema";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { addDoc, collection, getFirestore} from "firebase/firestore";


export const load: PageServerLoad = async () => {
  return {
    form: await superValidate(formSchema),
  };
};

export const actions: Actions = {
  default: async (event) => {
    const formData = await event.request.formData();
    const form = await superValidate(formData, formSchema);
    if (!form.valid) {
      return fail(400, {
        form,
      });
    }

    const file = formData.get('coverImage');
    console.log(file + " is the file");
    if (file instanceof File) {
      //read the filename and type
      const filename = file.name;
      const type = file.type;
      console.log(filename + " is the filename");
      console.log(type + " is the type");

      //upload file to firebase storage bucket and get url
      const storage = getStorage();
      const storageRef = ref(storage, filename);
      const snapshot = await uploadBytes(storageRef, file);
      console.log('Uploaded a blob or file!');
      console.log(snapshot);

      const downloadURL = await getDownloadURL(storageRef);
      console.log('File available at', downloadURL);

      //now create a new post in the firestore
      const post = {
        ...form.data,
        AIsummary: "Unimplemented AI summary",
        coverImage: downloadURL,
      };

      //add the post to the firestore
      const db = getFirestore();
      const docRef = await addDoc(collection(db, "posts"), post);
      console.log("Document written with ID: ", docRef.id);
      throw redirect(302, "/a/"+form.data.uid);
    }

    return {
      form,
    };
  },
};
