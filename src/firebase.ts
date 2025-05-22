import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBfAeMMuKJBNuoSHkcet51A_xDQ87irMZE",
  authDomain: "boksi-shop.firebaseapp.com",
  projectId: "boksi-shop",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
