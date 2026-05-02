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
  const [file, setFile] = useState<any>(null);
  const [caption, setCaption] = useState("");
  const [uploading, setUploading] = useState(false);
  const [status, setStatus] = useState({ type: "", message: "" });

  const handleLogin = async () => {
    if (password === "siam123") {
      try {
        await signInAnonymously(auth);
        setIsLoggedIn(true);
        setStatus({ type: "success", message: "READY! (BUILD: 1001)" });
      } catch (err: any) {
        setStatus({ type: "danger", message: "Error: " + err.message });
      }
    } else {
      alert("Wrong Password");
    }
  };

  const handleUpload = async () => {
    if (!file || !caption) {
      alert("Please select a file and enter a caption.");
      return;
    }
    
    setUploading(true);
    setStatus({ type: "info", message: "Processing... Please wait." });

    try {
      const fileName = "stories/" + Date.now() + ".png";
      const storageRef = ref(storage, fileName);
      
      // Upload execution
      const snapshot = await uploadBytes(storageRef, file);
      const url = await getDownloadURL(snapshot.ref);

      // Save to database
      await addDoc(collection(db, "success_stories"), {
        imageUrl: url,
        caption: caption,
        createdAt: serverTimestamp()
      });

      setStatus({ type: "success", message: "SUCCESS! PHOTO IS NOW LIVE!" });
      setFile(null);
      setCaption("");
    } catch (error: any) {
      setStatus({ type: "danger", message: "Failed: " + error.message });
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card shadow border-0">
            <div className="card-header bg-primary text-white text-center py-3">
              <h5 className="m-0 fw-bold">Admin: Build 1001 ✅</h5>
            </div>
            <div className="card-body p-4">
              {status.message && (
                <div className={`alert alert-${status.type} small`}>{status.message}</div>
              )}

              {!isLoggedIn ? (
                <div>
                  <input type="password" title="password" className="form-control mb-3" placeholder="Admin Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                  <button onClick={handleLogin} className="btn btn-primary w-100 fw-bold">Login to Admin</button>
                </div>
              ) : (
                <div>
                  <input type="file" title="file" className="form-control mb-3" onChange={(e) => setFile(e.target.files ? e.target.files[0] : null)} />
                  <input type="text" title="caption" className="form-control mb-3" placeholder="Image Caption" value={caption} onChange={(e) => setCaption(e.target.value)} />
                  <button disabled={uploading} onClick={handleUpload} className="btn btn-success w-100 fw-bold">
                    {uploading ? "Uploading..." : "Click to Upload Photo"}
                  </button>
                </div>
              )}
              <div className="text-center mt-3">
                <Link href="/" className="small text-muted text-decoration-none">Back to Website</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
