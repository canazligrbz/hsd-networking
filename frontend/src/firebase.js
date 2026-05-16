import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from "firebase/auth";
import {
  getFirestore,
  collection,
  addDoc,
  onSnapshot,
  query,
  orderBy,
  getDocs,
  writeBatch,
  doc,
  setDoc,
  getDoc,
  where
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDuvHMLf8zhEsAOcVLrHDbaJ7--ymQuhMs",
  authDomain: "ilk-uygulamamm.firebaseapp.com",
  databaseURL: "https://ilk-uygulamamm.firebaseio.com",
  projectId: "ilk-uygulamamm",
  storageBucket: "ilk-uygulamamm.firebasestorage.app",
  messagingSenderId: "309389390890",
  appId: "1:309389390890:web:5868449fae0e66bcb7ff53"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

// ─── AUTH ────────────────────────────────────────────────
export const registerUser = (email, password) =>
  createUserWithEmailAndPassword(auth, email, password);

export const loginUser = (email, password) =>
  signInWithEmailAndPassword(auth, email, password);

export const logoutUser = () => signOut(auth);

export const onAuthChange = (callback) =>
  onAuthStateChanged(auth, callback);

// ─── EVENTS ──────────────────────────────────────────────
export const createEvent = async (userId, eventData) => {
  const ref = await addDoc(collection(db, "events"), {
    ...eventData,
    ownerId: userId,
    createdAt: new Date().toISOString()
  });
  return ref.id;
};

export const subscribeToMyEvents = (userId, callback) => {
  const q = query(
    collection(db, "events"),
    where("ownerId", "==", userId),
    orderBy("createdAt", "desc")
  );
  return onSnapshot(q, (snap) => {
    callback(snap.docs.map(d => ({ id: d.id, ...d.data() })));
  });
};

export const getEvent = async (eventId) => {
  const snap = await getDoc(doc(db, "events", eventId));
  return snap.exists() ? { id: snap.id, ...snap.data() } : null;
};

// ─── PARTICIPANTS ─────────────────────────────────────────
export const addParticipant = async (eventId, participant) => {
  const ref = await addDoc(
    collection(db, "events", eventId, "participants"),
    { ...participant, timestamp: new Date().toISOString() }
  );
  return ref.id;
};

export const subscribeToParticipants = (eventId, callback) => {
  const q = query(
    collection(db, "events", eventId, "participants"),
    orderBy("timestamp", "asc")
  );
  return onSnapshot(q, (snap) => {
    callback(snap.docs.map(d => ({ id: d.id, ...d.data() })));
  });
};

export const clearParticipants = async (eventId) => {
  const snap = await getDocs(
    collection(db, "events", eventId, "participants")
  );
  const batch = writeBatch(db);
  snap.docs.forEach(d => batch.delete(d.ref));
  await batch.commit();
};
