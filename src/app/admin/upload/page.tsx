// @ts-nocheck
"use client";

import { useState } from "react";
import Link from "next/link";
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth, signInAnonymously } from "firebase/auth";
import { getFirestore, collection, addDoc, serverTimestamp } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCBdvKSUf0mOUvCA4F338kuxgf1m9i1u3w",
  authDomain: "bd-trippers.firebaseapp.com",
  projectId: "bd-trippers",
  storageBucket: "bd-trippers.firebasestorage.app",
  messagingSenderId: "972185706940",
  appId: "1:972185706940:web:cd259421e06658805e0bb9"
};

const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export default function AdminUpload() {
  const [password, setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [file, setFile] = useState(null);
  const [caption, setCaption] = useState("");
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState("");
  const [msgType, setMsgType] = useState("");

  const handleLogin = async () => {
    if (password === "siam123") {
      try {
        await signInAnonymously(auth);
        setIsLoggedIn(true);
        setMessage("Build 1002: Login Success!");
        setMsgType("success");
      } catch (err) {
        setMessage("Auth Error: " + err.message);
        setMsgType("danger");
      }
    } else {
      alert("Wrong Password");
    }
  };

  const handleUpload = async () => {
    if (!file || !caption) return alert("Select file and caption");
    setUploading(true);
    setMessage("Uploading photo...");
    setMsgType("info");

    try {
      const fileName = "stories/" + Date.now() + ".png";
      const storageRef = ref(storage, fileName);
      const snapshot = await uploadBytes(storageRef, file);
      const url = await getDownloadURL(snapshot.ref);

      await addDoc(collection(db, "success_stories"), {
        imageUrl: url,
        caption: caption,
        createdAt: serverTimestamp()
      });

      setMessage("UPLOAD SUCCESS! Check home page.");
      setMsgType("success");
      setFile(null);
      setCaption("");
    } catch (err) {
      setMessage("Error: " + err.message);
      setMsgType("danger");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card shadow border-0">
            <div className="card-header bg-primary text-white d-flex justify-content-between align-items-center py-3">
              <h5 className="m-0 fw-bold">Admin: Upload ✅</h5>
              <Link href="/admin/manage" className="btn btn-sm btn-light fw-bold">Manage Stories</Link>
            </div>
            <div className="card-body p-4">
              {message && <div className={`alert alert-${msgType} small`}>{message}</div>}
              {!isLoggedIn ? (
                <div>
                  <input type="password" title="password" className="form-control mb-3" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                  <button onClick={handleLogin} className="btn btn-primary w-100 fw-bold">Login</button>
                </div>
              ) : (
                <div>
                  <input type="file" title="file" className="form-control mb-3" onChange={(e) => setFile(e.target.files[0])} />
                  <input type="text" title="caption" className="form-control mb-3" placeholder="Caption" value={caption} onChange={(e) => setCaption(e.target.value)} />
                  <button disabled={uploading} onClick={handleUpload} className="btn btn-success w-100 fw-bold">
                    {uploading ? "Wait..." : "Upload Story Photo"}
                  </button>
                </div>
              )}
              <div className="text-center mt-3"><Link href="/" className="small text-muted">Home</Link></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
