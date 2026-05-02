"use client";

import { useState } from "react";
import Link from "next/link";
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth, signInAnonymously } from "firebase/auth";
import { getFirestore, collection, addDoc, serverTimestamp } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

// MANUALLY VERIFIED CONFIG
const firebaseConfig = {
  apiKey: "AIzaSyCBdvKSUf0mOUvCA4F338kuxgf1m9i1u3w",
  authDomain: "bd-trippers.firebaseapp.com",
  projectId: "bd-trippers",
  storageBucket: "bd-trippers.firebasestorage.app",
  messagingSenderId: "972185706940",
  appId: "1:972185706940:web:cd259421e06658805e0bb9"
};

// INITIALIZE LOCAL
const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export default function AdminUpload() {
  const [password, setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [caption, setCaption] = useState("");
  const [uploading, setUploading] = useState(false);
  const [status, setStatus] = useState({ type: "", message: "" });

  const handleLogin = async () => {
    if (password === "siam123") {
      try {
        setStatus({ type: "info", message: "Logging in..." });
        await signInAnonymously(auth);
        setIsLoggedIn(true);
        setStatus({ type: "success", message: "READY! (BUILD: 1000)" });
      } catch (err: any) {
        setStatus({ type: "danger", message: "Auth Error: " + err.message });
      }
    } else {
      alert("Wrong Password");
    }
  };

  const handleUpload = async () => {
    if (!file || !caption) return alert("Select file and caption");
    setUploading(true);
    setStatus({ type: "info", message: "Step 1: Uploading Photo..." });

    try {
      const fileName = `stories/${Date.now()}.png`;
      const storageRef = ref(storage, fileName);
      
      // Attempt Binary Upload
      await uploadBytes(storageRef, file);
      
      setStatus({ type: "info", message: "Step 2: Saving to site..." });
      const url = await getDownloadURL(storageRef);

      await addDoc(collection(db, "success_stories"), {
        imageUrl: url,
        caption: caption,
        createdAt: serverTimestamp()
      });

      setStatus({ type: "success", message: "UPLOAD SUCCESSFUL! Check home page." });
      setFile(null);
      setCaption("");
    } catch (error: any) {
      console.error("Critical Upload Error:", error);
      setStatus({ type: "danger", message: "Upload Failed: " + error.message });
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
              <h5 className="m-0 fw-bold">Admin: Build 1000 ✅</h5>
            </div>
            <div className="card-body p-4">
              {status.message && (
                <div className={`alert alert-${status.type} small`}>{status.message}</div>
              )}

              {!isLoggedIn ? (
                <div>
                  <input type="password" title="password" className="form-control mb-3" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                  <button onClick={handleLogin} className="btn btn-primary w-100 fw-bold">Login</button>
                </div>
              ) : (
                <div>
                  <div className="text-end mb-2"><Link href="/admin/inbox" className="small">Admin Inbox</Link></div>
                  <div className="mb-3">
                    <label className="form-label small fw-bold">Select Photo</label>
                    <input type="file" title="file" className="form-control" onChange={(e) => setFile(e.target.files ? e.target.files[0] : null)} />
                  </div>
                  <div className="mb-3">
                    <label className="form-label small fw-bold">Caption</label>
                    <input type="text" title="caption" className="form-control" placeholder="e.g. Europe Visa" value={caption} onChange={(e) => setCaption(e.target.value)} />
                  </div>
                  <button disabled={uploading} onClick={handleUpload} className="btn btn-success w-100 fw-bold">
                    {uploading ? "Processing..." : "Start Upload"}
                  </button>
                </div>
              )}
              <div className="text-center mt-3"><Link href="/" className="small text-muted">Back to Site</Link></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
