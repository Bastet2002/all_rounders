import { collection, addDoc, getDocs, doc, getDoc, updateDoc, deleteDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import { db, storage } from '../firebase/config';

// Form submission
export const submitForm = async (formData, collectionName) => {
  try {
    const docRef = await addDoc(collection(db, collectionName), formData);
    return { id: docRef.id, ...formData };
  } catch (error) {
    console.error("Error submitting form: ", error);
    throw error;
  }
};

// Get all documents from a collection
export const getDocuments = async (collectionName) => {
  try {
    const querySnapshot = await getDocs(collection(db, collectionName));
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    console.error("Error getting documents: ", error);
    throw error;
  }
};

// Get a single document
export const getDocument = async (collectionName, docId) => {
  try {
    const docRef = doc(db, collectionName, docId);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() };
    } else {
      throw new Error("Document does not exist");
    }
  } catch (error) {
    console.error("Error getting document: ", error);
    throw error;
  }
};

// Update a document
export const updateDocument = async (collectionName, docId, data) => {
  try {
    const docRef = doc(db, collectionName, docId);
    await updateDoc(docRef, data);
    return { id: docId, ...data };
  } catch (error) {
    console.error("Error updating document: ", error);
    throw error;
  }
};

// Delete a document
export const deleteDocument = async (collectionName, docId) => {
  try {
    await deleteDoc(doc(db, collectionName, docId));
    return true;
  } catch (error) {
    console.error("Error deleting document: ", error);
    throw error;
  }
};

// Delete a file
export const deleteFile = async (filePath) => {
  try {
    const fileRef = ref(storage, filePath);
    await deleteObject(fileRef);
    return true;
  } catch (error) {
    console.error("Error deleting file: ", error);
    throw error;
  }
};

// File upload with metadata to handle CORS
export const uploadFile = async (file, path) => {
  try {
    // Create a unique filename to avoid collisions
    const timestamp = new Date().getTime();
    const uniqueFilename = `${timestamp}_${file.name}`;
    const storageRef = ref(storage, `${path}/${uniqueFilename}`);
    
    // Set metadata with CORS headers
    const metadata = {
      contentType: file.type,
      customMetadata: {
        'Access-Control-Allow-Origin': '*'
      }
    };
    
    // Upload file with metadata
    const snapshot = await uploadBytes(storageRef, file, metadata);
    console.log('File uploaded successfully');
    
    // Get download URL
    const downloadURL = await getDownloadURL(snapshot.ref);
    console.log('File available at', downloadURL);
    
    return {
      name: file.name,
      url: downloadURL,
      path: snapshot.ref.fullPath
    };
  } catch (error) {
    console.error("Error uploading file: ", error);
    throw error;
  }
};