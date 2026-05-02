"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { db, storage, auth } from "@/lib/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { signInAnonymously, onAuthStateChanged } from "firebase/auth";

export default function AdminUpload() {
  const [password, setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [caption, setCaption] = useState("");
  const [uploading, setUploading] = useState(false);
  const [status, setStatus] = useState({ type: "", message: "" });

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      if (user) console.log("Firebase Auth Active:", user.uid);
    });
    return () => unsub();
  }, []);

  const handleLogin = async () => {
    if (password === "siam123") {
      try {
        setStatus({ type: "info", message: "Logging in..." });
        await signInAnonymously(auth);
        setIsLoggedIn(true);
        setStatus({ type: "success", message: "READY! (BUILD ID: 999)" });
      } catch (err: any) {
        setStatus({ type: "danger", message: "Auth Error: " + err.message });
      }
    } else {
      alert("Wrong Password");
    }
  };

  const uploadTinyTest = async () => {
    setStatus({ type: "info", message: "Testing with 1x1 image..." });
    try {
      // Create a tiny 1x1 red pixel blob
      const blob = new Blob([new Uint8Array([137, 80, 78, 71, 13, 10, 26, 10, 0, 0, 0, 13, 73, 72, 68, 82, 0, 0, 0, 1, 0, 0, 0, 1, 8, 2, 0, 0, 0, 144, 119, 83, 222, 0, 0, 0, 9, 112, 72, 89, 115, 0, 0, 14, 196, 0, 0, 14, 196, 1, 149, 43, 14, 27, 0, 0, 0, 12, 73, 68, 65, 84, 8, 215, 99, 248, 159, 240, 255, 63, 0, 5, 254, 2, 254, 220, 204, 89, 231, 0, 0, 0, 0, 73, 69, 78, 68, 174, 66, 96, 130])], { type: 'image/png' });
      const storageRef = ref(storage, `tests/tiny_${Date.now()}.png`);
      await uploadBytes(storageRef, blob);
      const url = await getDownloadURL(storageRef);
      await addDoc(collection(db, "success_stories"), {
        imageUrl: url,
        caption: "TINY IMAGE TEST SUCCESS ✅",
        createdAt: serverTimestamp()
      });
      setStatus({ type: "success", message: "TINY IMAGE SUCCESS! Database updated." });
    } catch (err: any) {
      setStatus({ type: "danger", message: "Tiny Test Failed: " + err.message });
    }
  };

  const handleUpload = async () => {
    if (!file || !caption) return alert("Select file and caption");
    setUploading(true);
    setStatus({ type: "info", message: "Step 2: Uploading Real Image..." });

    try {
      const fileName = `stories/${Date.now()}.png`;
      const storageRef = ref(storage, fileName);
      
      // Standard Upload
      await uploadBytes(storageRef, file);
      
      setStatus({ type: "info", message: "Step 3: Saving..." });
      const url = await getDownloadURL(storageRef);

      await addDoc(collection(db, "success_stories"), {
        imageUrl: url,
        caption: caption,
        createdAt: serverTimestamp()
      });

      setStatus({ type: "success", message: "ASHOL PHOTO UPLOADED! Check home page." });
      setFile(null);
      setCaption("");
    } catch (error: any) {
      setStatus({ type: "danger", message: "FAILED: " + error.message });
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card shadow border-0">
            <div className="card-header bg-primary text-white text-center">
              <h5 className="m-0 py-2">Admin Panel (BUILD: 999)</h5>
            </div>
            <div className="card-body p-4">
              {status.message && (
                <div className={`alert alert-${status.type} small`}>{status.message}</div>
              )}

              {!isLoggedIn ? (
                <div>
                  <input type="password" title="password" className="form-control mb-3" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                  <button onClick={handleLogin} className="btn btn-primary w-100">Login</button>
                </div>
              ) : (
                <div>
                  <input type="file" title="file" className="form-control mb-3" onChange={(e) => setFile(e.target.files ? e.target.files[0] : null)} />
                  <input type="text" title="caption" className="form-control mb-3" placeholder="Caption" value={caption} onChange={(e) => setCaption(e.target.value)} />
                  
                  <div className="d-grid gap-2">
                    <button disabled={uploading} onClick={handleUpload} className="btn btn-success fw-bold">
                      {uploading ? "Uploading..." : "Upload Story Photo"}
                    </button>
                    <button disabled={uploading} onClick={uploadTinyTest} className="btn btn-outline-info btn-sm">
                      Test Tiny Image (1KB)
                    </button>
                  </div>
                </div>
              )}
              <div className="text-center mt-3"><Link href="/" className="small">Home</Link></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
