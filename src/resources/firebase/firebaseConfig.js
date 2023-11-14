// import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/auth";

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// const firebaseConfig = {
//   apiKey: process.env.VUE_APP_FIREBASE_APIKEY,
//   authDomain: process.env.VUE_APP_FIREBASE_AUTH_DOMAIN,
//   projectId: process.env.VUE_APP_FIREBASE_PROJECTID,
//   storageBucket: process.env.VUE_APP_FIREBASE_STORAGEBUCKET,
//   messagingSenderId: process.env.VUE_APP_FIREBASE_MESSAGINGSENDERID,
//   appId: process.env.VUE_APP_FIREBASE_APPID,
//   measurementId: process.env.VUE_APP_FIREBASE_MEASUREMENTID,
// };

const firebaseConfig = {
  apiKey: "AIzaSyC0Mkz2NVwti8gkyUYacZMHjePaG7v_bbY",
  authDomain: "manito-a3802.firebaseapp.com",
  projectId: "manito-a3802",
  storageBucket: "manito-a3802.appspot.com",
  messagingSenderId: "998289841185",
  appId: "1:998289841185:web:2b1c8ad92bb6f2968dd760",
  measurementId: "8ZLQ81112R",
};

// firebaseConfig 정보로 firebase 시작
const firebaseApp = initializeApp(firebaseConfig);

// firebase의 firestore 인스턴스를 변수에 저장
const firestore = getFirestore(firebaseApp);

// 필요한 곳에서 사용할 수 있도록 내보내기
// 다른 곳에서 불러올때 firestore로 불러와야 함!!
export { firestore };

// auth 내보내기
// export const auth = firebase.auth();

// apikey 내보내기
// export const apiKey = firebaseConfig.apiKey;

// TODO::2023.12.1에 firestore tester 모드 종료 - 권한 바꿔야함.
