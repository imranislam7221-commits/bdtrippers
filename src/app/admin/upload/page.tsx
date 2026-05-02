"use client";

import { useState } from "react";
import Link from "next/link";
import { db, storage, auth } from "../../../lib/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { signInAnonymously } from "firebase/auth";

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
        await signInAnonymously(auth);
        setIsLoggedIn(true);
        setStatus({ type: "success", message: "Login Successful! Ready." });
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
    setStatus({ type: "info", message: "Step 1: Preparing Image..." });

    try {
      const fileName = `stories/${Date.now()}.png`;
      const storageRef = ref(storage, fileName);
      
      setStatus({ type: "info", message: "Step 2: Sending directly to Firebase (Waiting 20s)..." });
      
      // Failsafe Timeout
      const uploadTask = uploadBytes(storageRef, file);
      const timeout = new Promise((_, reject) => setTimeout(() => reject(new Error("TIMEOUT")), 20000));
      
      await Promise.race([uploadTask, timeout]);
      
      setStatus({ type: "info", message: "Step 3: Saving metadata..." });
      const url = await getDownloadURL(storageRef);

      await addDoc(collection(db, 'success_stories'), {
        imageUrl: url,
        caption: caption,
        createdAt: serverTimestamp()
      });

      setStatus({ type: "success", message: "ALHAMDULILLAH! UPLOAD SUCCESS!" });
      setFile(null);
      setCaption("");
    } catch (err: any) {
      console.error("Critical Failure:", err);
      let msg = "Failed: " + err.message;
      if (err.message === "TIMEOUT") msg = "Network Blocked! Try using a different browser or VPN.";
      setStatus({ type: "danger", message: msg });
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card shadow border-0" style={{ borderTop: '5px solid #28a745' }}>
            <div className="card-header bg-primary text-white text-center">
              <h5 className="m-0 py-2">Admin: Build Successful ✅</h5>
            </div>
            <div className="card-body p-4">
              {status.message && <div className={`alert alert-${status.type} small`}>{status.message}</div>}
              
              {!isLoggedIn ? (
                <div>
                  <input type="password" title="password" className="form-control mb-3" placeholder="Enter Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                  <button onClick={handleLogin} className="btn btn-primary w-100">Login to Admin</button>
                </div>
              ) : (
                <div>
                  <input type="file" title="file" className="form-control mb-3" onChange={(e) => setFile(e.target.files ? e.target.files[0] : null)} />
                  <input type="text" title="caption" className="form-control mb-3" placeholder="Caption" value={caption} onChange={(e) => setCaption(e.target.value)} />
                  <button disabled={uploading} onClick={handleUpload} className="btn btn-success w-100 fw-bold">
                    {uploading ? "Uploading..." : "Click to Upload Photo"}
                  </button>
                </div>
              )}
              <div className="text-center mt-3"><Link href="/" className="small text-muted">Back to Home</Link></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
