import * as firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import computeScoreFromAnswers from "../utils/computeScoreFromAnswers";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

export const saveSubmissionToFirestore = (courseId, submission) => {
  return db.collection("submissions").add({
    timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    courseId,
    score: computeScoreFromAnswers(submission),
    submission,
  });
};

export const saveFeedbackToFirestore = (courseId, email, feedback, answers) => {
  return db.collection("feedback").add({
    timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    courseId,
    email,
    feedback,
    answers,
  });
};

export const getCourseFromFirestore = (courseId) => {
  return db.collection("courses").doc(courseId).get();
};

export const saveCourseToFirestore = (course) => {
  return db.collection("courses").add({
    timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    ...course,
  });
};

export const updateCourseInFirestore = (courseId, course) => {
  return db
    .collection("courses")
    .doc(courseId)
    .update({ ...course });
};

// export const authenticateAnonymously = () => {
//   return firebase.auth().signInAnonymously();
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
