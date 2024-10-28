import { db } from './firebase';
import {
  collection,
  addDoc,
  getDocs,
  getDoc,
  doc,
  updateDoc,
  deleteDoc,
  query,
  where,
  writeBatch,
} from 'firebase/firestore';

const handleError = (error) => {
  console.error("Firestore error:", error);
  throw new Error("Firestore operation failed: " + error.message);
};

const validateEventData = (data) => {
  if (!data.title || !data.description) {
    throw new Error("Title and description are required.");
  }
};

const validateFigureData = (data) => {
  if (!data.name || !data.bio) {
    throw new Error("Name and biography are required.");
  }
};

const eventsCollectionRef = collection(db, 'events');

export const createEvent = async (eventData) => {
  validateEventData(eventData);
  try {
    const docRef = await addDoc(eventsCollectionRef, eventData);
    return { id: docRef.id, ...eventData };
  } catch (error) {
    handleError(error);
  }
};

export const getEvents = async () => {
  try {
    const data = await getDocs(eventsCollectionRef);
    return data.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    handleError(error);
  }
};

export const getEventById = async (id) => {
  try {
    const eventDoc = doc(db, 'events', id);
    const eventData = await getDoc(eventDoc);
    return eventData.exists() ? { id: eventData.id, ...eventData.data() } : null;
  } catch (error) {
    handleError(error);
  }
};

export const getEventsByDate = async (date) => {
  const eventsQuery = query(eventsCollectionRef, where("date", "==", date));
  try {
    const data = await getDocs(eventsQuery);
    return data.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    handleError(error);
  }
};

export const updateEvent = async (id, updatedData) => {
  validateEventData(updatedData);
  try {
    const eventDoc = doc(db, 'events', id);
    await updateDoc(eventDoc, updatedData);
    return { id, ...updatedData };
  } catch (error) {
    handleError(error);
  }
};

export const deleteEvent = async (id) => {
  try {
    const eventDoc = doc(db, 'events', id);
    await deleteDoc(eventDoc);
  } catch (error) {
    handleError(error);
  }
};

const figuresCollectionRef = collection(db, 'figures');

export const createFigure = async (figureData) => {
  validateFigureData(figureData);
  try {
    const docRef = await addDoc(figuresCollectionRef, figureData);
    return { id: docRef.id, ...figureData };
  } catch (error) {
    handleError(error);
  }
};

export const getFigures = async () => {
  try {
    const data = await getDocs(figuresCollectionRef);
    return data.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    handleError(error);
  }
};

export const getFigureById = async (id) => {
  try {
    const figureDoc = doc(db, 'figures', id);
    const figureData = await getDoc(figureDoc);
    return figureData.exists() ? { id: figureData.id, ...figureData.data() } : null;
  } catch (error) {
    handleError(error);
  }
};

export const getFiguresByNationality = async (nationality) => {
  const figuresQuery = query(figuresCollectionRef, where("nationality", "==", nationality));
  try {
    const data = await getDocs(figuresQuery);
    return data.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    handleError(error);
  }
};

export const updateFigure = async (id, updatedData) => {
  validateFigureData(updatedData);
  try {
    const figureDoc = doc(db, 'figures', id);
    await updateDoc(figureDoc, updatedData);
    return { id, ...updatedData };
  } catch (error) {
    handleError(error);
  }
};

export const deleteFigure = async (id) => {
  try {
    const figureDoc = doc(db, 'figures', id);
    await deleteDoc(figureDoc);
  } catch (error) {
    handleError(error);
  }
};

const commentsCollectionRef = collection(db, 'comments');

export const createComment = async (commentData) => {
  try {
    const docRef = await addDoc(commentsCollectionRef, commentData);
    return { id: docRef.id, ...commentData };
  } catch (error) {
    handleError(error);
  }
};

export const getComments = async () => {
  try {
    const data = await getDocs(commentsCollectionRef);
    return data.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    handleError(error);
  }
};

export const updateComment = async (id, updatedData) => {
  try {
    const commentDoc = doc(db, 'comments', id);
    await updateDoc(commentDoc, updatedData);
    return { id, ...updatedData };
  } catch (error) {
    handleError(error);
  }
};

export const deleteComment = async (id) => {
  try {
    const commentDoc = doc(db, 'comments', id);
    await deleteDoc(commentDoc);
  } catch (error) {
    handleError(error);
  }
};

const insightsCollectionRef = collection(db, 'insights');

export const createInsight = async (insightData) => {
  try {
    const docRef = await addDoc(insightsCollectionRef, insightData);
    return { id: docRef.id, ...insightData };
  } catch (error) {
    handleError(error);
  }
};

export const getInsights = async () => {
  try {
    const data = await getDocs(insightsCollectionRef);
    return data.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    handleError(error);
  }
};

export const getInsightById = async (id) => {
  try {
    const insightDoc = doc(db, 'insights', id);
    const insightData = await getDoc(insightDoc);
    return insightData.exists() ? { id: insightData.id, ...insightData.data() } : null;
  } catch (error) {
    handleError(error);
  }
};

export const updateInsight = async (id, updatedData) => {
  try {
    const insightDoc = doc(db, 'insights', id);
    await updateDoc(insightDoc, updatedData);
    return { id, ...updatedData };
  } catch (error) {
    handleError(error);
  }
};

export const deleteInsight = async (id) => {
  try {
    const insightDoc = doc(db, 'insights', id);
    await deleteDoc(insightDoc);
  } catch (error) {
    handleError(error);
  }
};

export const batchCreateEventsAndFigures = async (events, figures) => {
  const batch = writeBatch(db);
  
  events.forEach(event => {
    const eventRef = doc(eventsCollectionRef);
    batch.set(eventRef, event);
  });

  figures.forEach(figure => {
    const figureRef = doc(figuresCollectionRef);
    batch.set(figureRef, figure);
  });

  try {
    await batch.commit();
    return { message: "Batch write successful!" };
  } catch (error) {
    handleError(error);
  }
};
