// firebase-admin.ts
import admin from "firebase-admin";
import { firebaseConfig } from "../config";
console.log("firebaseConfig: ","started");
admin.initializeApp({
  credential: admin.credential.cert(firebaseConfig as any),
  storageBucket: "naqra-app.appspot.com",
});
