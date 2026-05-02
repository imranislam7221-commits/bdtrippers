"use client";

import { useState } from "react";
import Link from "next/link";
import { db, storage, auth } from "@/lib/firebase";
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

  const correctPass = "siam123";

  const handleLogin = async () => {
    if (password === correctPass) {
      try {
        setStatus({ type: "info", message: "Step 1: Authenticating..." });
        await signInAnonymously(auth);
        setIsLoggedIn(true);
        setStatus({ type: "success", message: "Login Successful!" });
      } catch (error: any) {
        setStatus({ type: "danger", message: "Auth Error: " + error.message });
      }
    } else {
      alert("Incorrect Password!");
    }
  };

  const handleUpload = async () => {
    if (!file || !caption) {
      alert("Please select a file and enter a caption.");
      return;
    }

    setUploading(true);
    setStatus({ type: "info", message: "FINAL | Step 2: Sending Photo..." });

    try {
      const uniqueName = `stories/${Date.now()}.png`;
      const storageRef = ref(storage, uniqueName);
      
      // Standard Upload
      await uploadBytes(storageRef, file);
      
      setStatus({ type: "info", message: "FINAL | Step 3: Saving..." });
      const downloadURL = await getDownloadURL(storageRef);

      await addDoc(collection(db, 'success_stories'), {
        imageUrl: downloadURL,
        caption: caption,
        createdAt: serverTimestamp()
      });

      setStatus({ type: "success", message: "ALHAMDULILLAH! UPLOAD SUCCESS!" });
      setFile(null);
      setCaption("");
    } catch (error: any) {
      console.error("Upload process failure:", error);
      setStatus({ type: "danger", message: "FAILED: " + error.message });
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card shadow border-0" style={{ borderRadius: '15px' }}>
            <div className="card-header bg-primary text-white text-center py-3">
              <h4 className="m-0 fw-bold">Admin: Photo Upload (V-FINAL)</h4>
            </div>
            <div className="card-body p-4">
              {status.message && (
                <div className={`alert alert-${status.type} small`}>{status.message}</div>
              )}

              {!isLoggedIn ? (
                <div>
                  <input type="password" title="pass" className="form-control mb-3" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                  <button onClick={handleLogin} className="btn btn-primary w-100 fw-bold">Login</button>
                </div>
              ) : (
                <div>
                  <div className="text-end mb-2"><Link href="/admin/inbox" className="small">Inbox</Link></div>
                  <div className="mb-3">
                    <label className="form-label small fw-bold">Image</label>
                    <input type="file" title="file" className="form-control" onChange={(e) => setFile(e.target.files ? e.target.files[0] : null)} />
                  </div>
                  <div className="mb-3">
                    <label className="form-label small fw-bold">Caption</label>
                    <input type="text" title="cap" className="form-control" placeholder="Caption" value={caption} onChange={(e) => setCaption(e.target.value)} />
                  </div>
                  <button disabled={uploading} onClick={handleUpload} className="btn btn-success w-100 fw-bold">
                    {uploading ? "Uploading..." : "Start Upload"}
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
