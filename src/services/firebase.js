import * as firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import computeScoreFromAnswers from "../utils/computeScoreFromAnswers";

// initialize firebase
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
};
firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
const auth = firebase.auth();

export const createNewUser = (email, password, setError) => {
  return auth.createUserWithEmailAndPassword(email, password).catch((error) => {
    setError(error.message);
    console.error("Error creating user:", error);
  });
};

export const signInExistingUser = (email, password, setError) => {
  return auth.signInWithEmailAndPassword(email, password).catch((error) => {
    setError(error.message);
    console.error("Error signing in:", error);
  });
};

export const getUserSubscription = async (userId) => {
  const result = await db
    .collection("subscriptions")
    .where("userId", "==", userId)
    .get();

  const sub = result.docs.map((doc) => doc.data())[0];

  return sub || null;
};

export const saveSubmissionToFirestore = (courseId, submission) => {
  return db.collection("submissions").add({
    timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    courseId,
    score: computeScoreFromAnswers(submission),
    submission,
  });
};

export const saveFeedbackToFirestore = (
  sentFrom,
  courseId,
  email,
  feedback,
  answers
) => {
  return db.collection("feedback").add({
    timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    sentFrom,
    courseId: courseId || null,
    email,
    feedback,
    answers: answers || null,
  });
};

export const getCourseFromFirestore = (courseId) => {
  return db.collection("courses").doc(courseId).get();
};

export const getUserCoursesFromFirestore = async (userId) => {
  const result = await db
    .collection("courses")
    .where("userId", "==", userId)
    .orderBy("updated", "desc")
    .get();

  return result.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
};

export const saveCourseToFirestore = (course) => {
  return db.collection("courses").add({
    ...course,
    created: firebase.firestore.FieldValue.serverTimestamp(),
    updated: firebase.firestore.FieldValue.serverTimestamp(),
  });
};

export const deleteCourseFromFirestore = (courseId) => {
  return db.collection("courses").doc(courseId).delete();
};

export const updateCourseInFirestore = (courseId, course) => {
  return db
    .collection("courses")
    .doc(courseId)
    .update({
      ...course,
      updated: firebase.firestore.FieldValue.serverTimestamp(),
    });
};

export const getSubmissionsFromFirestore = async (courseId) => {
  const result = await db
    .collection("submissions")
    .where("courseId", "==", courseId)
    .orderBy("timestamp", "desc")
    .get();

  return result.docs.map((doc) => doc.data());
};

// export const sendPasswordResetEmail = (email) => {
//   return auth
//     .sendPasswordResetEmail(email)
//     .catch((error) =>
//       console.error("Error sending password reset email:", error)
//     );
// };

// export const authenticateAnonymously = () => {
//   return auth.signInAnonymously();
// };

// export const updateCourseItemsInFirestore = (courseId, items) => {
//   return db.collection("courses").doc(courseId).update({ items });
// };

// export const getGroceryListItems = groceryListId => {
//     return db.collection('groceryLists')
//         .doc(groceryListId)
//         .collection('items')
//         .get();
// }

// export const streamGroceryListItems = (groceryListId, observer) => {
//     return db.collection('groceryLists')
//         .doc(groceryListId)
//         .collection('items')
//         .orderBy('created')
//         .onSnapshot(observer);
// };

// export const addUserToGroceryList = (userName, groceryListId, userId) => {
//     return db.collection('groceryLists')
//         .doc(groceryListId)
//         .update({
//             users: firebase.firestore.FieldValue.arrayUnion({
//                 userId: userId,
//                 name: userName
//             })
//         });
// };

// export const addGroceryListItem = (item, groceryListId, userId) => {
//     return getGroceryListItems(groceryListId)
//         .then(querySnapshot => querySnapshot.docs)
//         .then(groceryListItems => groceryListItems.find(groceryListItem => groceryListItem.data().name.toLowerCase() === item.toLowerCase()))
//         .then(matchingItem => {
//             if (!matchingItem) {
//                 return db.collection('groceryLists')
//                     .doc(groceryListId)
//                     .collection('items')
//                     .add({
//                         name: item,
//                         created: firebase.firestore.FieldValue.serverTimestamp(),
//                         createdBy: userId
//                     });
//             }
//             throw new Error('duplicate-item-error');
//         });
// };
