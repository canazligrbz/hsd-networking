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
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  databaseURL: import.meta.env.VITE_FIREBASE_DATABASE_URL,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
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
