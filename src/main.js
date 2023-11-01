import { createApp } from "vue";
import App from "./App.vue";
import router from "./resources/router";
import { store } from "./resources/store";
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/auth";

// import { firestore } from "./resources/firebase/firebaseConfig";

window.Kakao.init("32c148d16c25b3ee3fa4bf5641ae39a9");

const app = createApp(App);
app.use(router);
app.use(store);
app.mount("#app");

const firebaseConfig = {
  apiKey: "AIzaSyC0Mkz2NVwti8gkyUYacZMHjePaG7v_bbY",
  authDomain: "manito-a3802.firebaseapp.com",
  projectId: "manito-a3802",
  storageBucket: "manito-a3802.appspot.com",
  messagingSenderId: "998289841185",
  appId: "1:998289841185:web:2b1c8ad92bb6f2968dd760",
  measurementId: "8ZLQ81112R",
};

var db = firebase.initializeApp(firebaseConfig);

db.firestore()
  .collection("test")
  .add({
    test: [1, 3],
    a: "a",
  })
  .then((r) => console.log(r))
  .catch((e) => console.log(e));
db.firestore()
  .collection("tes2t")
  .add({
    test: [2, 0],
    a: "b",
  })
  .then((r) => console.log(r))
  .catch((e) => console.log(e));
