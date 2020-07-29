import * as firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import "firebase/analytics";
import computeScoreFromAnswers from "../utils/computeScoreFromAnswers";

// initialize firebase
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID,
};
firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
const auth = firebase.auth();
firebase.analytics();

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

export const createUserCourseInFirestore = (
  courseId,
  userEmail,
  itemNumber,
  userItems,
  course
) => {
  return db.collection("userCourses").add({
    created: firebase.firestore.FieldValue.serverTimestamp(),
    updated: firebase.firestore.FieldValue.serverTimestamp(),
    courseId,
    userEmail: userEmail || null,
    course,
    itemNumber,
    userItems,
    submitted: null,
    score: null,
  });
};

export const updateUserCourseInFirestore = (
  userCourseId,
  itemNumber,
  userItems,
  submitted
) => {
  return db
    .collection("userCourses")
    .doc(userCourseId)
    .update({
      updated: firebase.firestore.FieldValue.serverTimestamp(),
      itemNumber,
      userItems,
      submitted: submitted
        ? firebase.firestore.FieldValue.serverTimestamp()
        : null,
      score: submitted ? computeScoreFromAnswers(userItems) : null,
    });
};

export const saveFeedbackToFirestore = (
  sentFrom,
  courseId,
  email,
  feedback,
  userItems
) => {
  return db.collection("feedback").add({
    timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    sentFrom,
    courseId: courseId || null,
    email,
    feedback,
    userItems: userItems || null,
  });
};

export const getPublishedCourseFromFirestore = (courseId) => {
  return db.collection("courses").doc(courseId).get();
};

export const getDraftCourseFromFirestore = (courseId) => {
  return db.collection("draftCourses").doc(courseId).get();
};

// get all draft courses belonging to author
export const getAuthorCoursesFromFirestore = async (userId) => {
  const result = await db
    .collection("draftCourses")
    .where("userId", "==", userId)
    .orderBy("updated", "desc")
    .get();

  return result.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
};

export const addNewDraftCourseInFirestore = (course) => {
  return db.collection("draftCourses").add({
    ...course,
    created: firebase.firestore.FieldValue.serverTimestamp(),
    updated: firebase.firestore.FieldValue.serverTimestamp(),
  });
};

// soft delete draft and published courses
export const deleteCourseInFirestore = (courseId) => {
  // get a new batch write
  const batch = db.batch();

  // update the draft course
  const draftRef = db.collection("draftCourses").doc(courseId);
  batch.update(draftRef, {
    deleted: firebase.firestore.FieldValue.serverTimestamp(),
  });

  // update the published course
  const publishedRef = db.collection("courses").doc(courseId);
  batch.update(publishedRef, {
    deleted: firebase.firestore.FieldValue.serverTimestamp(),
  });

  // commit the batch
  return batch.commit();
};

// update (or create, if necessary) published course
export const updatePublishedCourseInFirestore = (courseId, course) => {
  return db
    .collection("courses")
    .doc(courseId)
    .set({
      ...course,
      updated: firebase.firestore.FieldValue.serverTimestamp(),
    });
};

// updates existing draft course
export const updateDraftCourseInFirestore = (courseId, course) => {
  return db
    .collection("draftCourses")
    .doc(courseId)
    .update({
      ...course,
      updated: firebase.firestore.FieldValue.serverTimestamp(),
    });
};

export const getUserCoursesFromFirestore = async (courseId) => {
  const result = await db
    .collection("userCourses")
    .where("courseId", "==", courseId)
    .orderBy("submitted", "desc")
    .get();

  return result.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
};

export const getUserCourseFromFirestore = (userCourseId) => {
  return db.collection("userCourses").doc(userCourseId).get();
};

export const sendProgressEmailToUser = (userEmail, courseTitle, targetUrl) => {
  return db.collection("mail").add({
    to: userEmail,
    message: {
      subject: courseTitle,
      html: `<p>Thanks for starting ${courseTitle}! In case you need to leave before finishing the course, you can <a href="${targetUrl}" target="_blank">click this link</a> to restore your progress and start where you left off.</p><p>- The Courseflo Team</p><p>P.S. You can respond to this email if you need help.</p>`,
    },
  });
};

export const addPaidLaunchSignupToFirebase = (userId, userEmail, userPlan) => {
  return db.collection("paidLaunchSignup").add({
    timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    userId,
    userEmail,
    userPlan,
  });
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
