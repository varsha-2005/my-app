// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from "firebase/auth";
import { getFirestore, collection, addDoc, getDocs, doc, deleteDoc, updateDoc } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDa61en2U12PuVYg15lYBvAFYXCHEgwWO8",
  authDomain: "todo-c8970.firebaseapp.com",
  projectId: "todo-c8970",
  storageBucket: "todo-c8970.firebasestorage.app",
  messagingSenderId: "393323869965",
  appId: "1:393323869965:web:09f7fb860c13600e11e244"
};



// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app)

export function signUp(email, password) {
  return createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      console.log("User signed up:", userCredential.user)
    })
    .catch((e) => {
      console.log("Error signing up:", e)
    })
}

export function signIn(email, password) {
  return signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      console.log("User signed in:", userCredential.user);
      return userCredential; // Return the user credential for further use if needed
    })
    .catch((error) => {
      console.error("Error signing in:", error);
      throw error; // Throw the error to be handled in the calling function
    });
}


export function signOutUser() {
  return signOut(auth)
    .then(() => {
      console.log("User signed out");
    })
    .catch((error) => {
      console.error("Error signing out:", error);
    });
}

export async function addTask(userId, taskTitle) {
  try {
    const docRef = await addDoc(collection(db, "tasks"), {
      userId: userId,
      title: taskTitle,
      completed: false,
      createdAt: new Date()
    })
    console.log("Task added with ID: ", docRef.id)
    return docRef
  }
  catch (e) {
    console.log("Error adding task: ", e)
  }
}

export async function getTasks(userId) {
  const querySnapshot = await getDocs(collection(db, "tasks"))
  const tasks = querySnapshot.docs.filter(doc => doc.data().userId === userId)
  .map(doc => ({
    id: doc.id, ...doc.data()
  }))
  return tasks
}

export async function updateTask(taskId,updatedTitle) {
  const taskDoc = doc(db,"tasks",taskId)
  try{
    await updateDoc(taskDoc,{
      title:updatedTitle
    })
    console.log("Task updated successfully")
  }
  catch(e){
    console.error("Error updating task: ", e);
  }
}

export async function deleteTask(taskId) {
  const taskDoc = doc(db,"tasks",taskId);
  try{
    await deleteDoc(taskDoc)
    console.log("Task deleted successfully")
  }
  catch(e){
    console.error("Error deleting task: ", e)
  }
}

export { auth, db };