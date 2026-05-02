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

  const handleLogin = async () => {
    if (password === "siam123") {
      try {
        await signInAnonymously(auth);
        setIsLoggedIn(true);
        setStatus({ type: "success", message: "Login Successful!" });
      } catch (err: any) {
        setStatus({ type: "danger", message: "Auth Error: " + err.message });
      }
    } else {
      alert("Wrong Password");
    }
  };

  const handleUpload = async () => {
    if (!file || !caption) return alert("Please select a file and enter a caption.");
    
    setUploading(true);
    setStatus({ type: "info", message: "Uploading... (Please wait)" });

    try {
      const fileName = `stories/${Date.now()}.png`;
      const storageRef = ref(storage, fileName);
      
      // Send Photo
      const snapshot = await uploadBytes(storageRef, file);
      const url = await getDownloadURL(snapshot.ref);

      // Save Data
      await addDoc(collection(db, "success_stories"), {
        imageUrl: url,
        caption: caption,
        createdAt: serverTimestamp()
      });

      setStatus({ type: "success", message: "Success! Photo is now on home page." });
      setFile(null);
      setCaption("");
    } catch (err: any) {
      console.error("Upload Error:", err);
      setStatus({ type: "danger", message: "Error: " + err.message });
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
              <h5 className="m-0 py-2">Admin Panel: Success Story Upload</h5>
            </div>
            <div className="card-body p-4">
              {status.message && (
                <div className={`alert alert-${status.type} small`}>{status.message}</div>
              )}

              {!isLoggedIn ? (
                <div>
                  <div className="mb-3">
                    <label className="form-label small fw-bold">Admin Password</label>
                    <input
                      type="password"
                      className="form-control"
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                  <button onClick={handleLogin} className="btn btn-primary w-100">Login to Admin</button>
                </div>
              ) : (
                <div>
                  <div className="text-end mb-2">
                    <Link href="/admin/inbox" className="small">Admin Inbox</Link>
                  </div>
                  <div className="mb-3">
                    <label className="form-label small fw-bold">Select Image</label>
                    <input
                      type="file"
                      className="form-control"
                      onChange={(e) => setFile(e.target.files ? e.target.files[0] : null)}
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label small fw-bold">Caption (e.g. UK Study Visa)</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter caption"
                      value={caption}
                      onChange={(e) => setCaption(e.target.value)}
                    />
                  </div>
                  <button
                    disabled={uploading}
                    onClick={handleUpload}
                    className="btn btn-success w-100 fw-bold"
                  >
                    {uploading ? "Processing..." : "Upload Story Photo"}
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
