import firebase from "firebase";
import { ref, onUnmounted } from "vue";

const config = {
  apiKey: "AIzaSyB3rLr1pZ_8oVADgeedmtXz3gbqopybTWc",

  authDomain: "page-one-one.firebaseapp.com",

  databaseURL: "https://page-one-one-default-rtdb.firebaseio.com",

  projectId: "page-one-one",

  storageBucket: "page-one-one.appspot.com",

  messagingSenderId: "22930157867",

  appId: "1:22930157867:web:75fd4ea7b35fd9f780556e",

  measurementId: "G-RBY3CG2YY4",
};

const firebaseApp = firebase.initializeApp(config);

const db = firebaseApp.firestore();
const usersCollection = db.collection("users");

export const createUser = (user) => {
  return usersCollection.add(user);
};

export const getUser = async (id) => {
  const user = await usersCollection.doc(id).get();
  return user.exists ? user.data() : null;
};

export const updateUser = (id, user) => {
  return usersCollection.doc(id).update(user);
};

export const deleteUser = (id) => {
  return usersCollection.doc(id).delete();
};

export const useLoadUsers = () => {
  const users = ref([]);
  const close = usersCollection.onSnapshot((snapshot) => {
    users.value = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  });
  onUnmounted(close);
  return users;
};
