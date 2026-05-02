"use client";

import { useState } from "react";
import Link from "next/link";
import { db, storage, auth } from "@/lib/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { ref, uploadString, getDownloadURL } from "firebase/storage";
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
        setStatus({ type: "info", message: "Step 1: Logging in..." });
        await signInAnonymously(auth);
        setIsLoggedIn(true);
        setStatus({ type: "success", message: "Login Successful! Firebase is ready." });
      } catch (error: any) {
        setStatus({ type: "danger", message: "Auth Error: " + error.message });
      }
    } else {
      alert("Incorrect Password!");
    }
  };

  // NEW: Test Database connection only
  const testDbWrite = async () => {
    setStatus({ type: "info", message: "Testing Database only (No Photo)..." });
    try {
      await addDoc(collection(db, 'success_stories'), {
        imageUrl: "https://via.placeholder.com/150",
        caption: "Database Test: " + (caption || "No Caption"),
        createdAt: serverTimestamp()
      });
      setStatus({ type: "success", message: "DATABASE TEST SUCCESS! This means Firebase is reachable." });
    } catch (error: any) {
      setStatus({ type: "danger", message: "Database Failed: " + error.message });
    }
  };

  const handleUpload = async () => {
    if (!file || !caption) {
      alert("Please select a file and enter a caption.");
      return;
    }

    setUploading(true);
    setStatus({ type: "info", message: "Step 2: Preparing Photo (Base64)..." });

    try {
      const reader = new FileReader();
      const base64String = await new Promise<string>((resolve, reject) => {
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = reject;
        reader.readAsDataURL(file);
      });

      setStatus({ type: "info", message: "Step 2.1: Opening secure stream..." });
      const uniqueName = `stories/${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.]/g, '_')}`;
      const storageRef = ref(storage, uniqueName);
      
      setStatus({ type: "info", message: "Step 2.2: Pushing data directly to Firebase (Please wait 15s)..." });
      await uploadString(storageRef, base64String, 'data_url');
      
      setStatus({ type: "info", message: "Step 3: Generating link..." });
      const downloadURL = await getDownloadURL(storageRef);

      setStatus({ type: "info", message: "Step 4: Updating Website..." });
      await addDoc(collection(db, 'success_stories'), {
        imageUrl: downloadURL,
        caption: caption,
        createdAt: serverTimestamp()
      });

      setStatus({ type: "success", message: "ALHAMDULILLAH! PHOTO UPLOADED SUCCESSFULLY!" });
      setFile(null);
      setCaption("");
    } catch (error: any) {
      console.error("Direct Upload Error:", error);
      setStatus({ type: "danger", message: `Failed: ${error.message}` });
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
              <h4 className="m-0 fw-bold">Admin: Photo Upload</h4>
            </div>
            <div className="card-body p-4">
              {status.message && (
                <div className={`alert alert-${status.type} small`}>{status.message}</div>
              )}

              {!isLoggedIn ? (
                <div>
                  <input type="password" title="password" className="form-control mb-3" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                  <button onClick={handleLogin} className="btn btn-primary w-100 fw-bold">Login to Admin</button>
                </div>
              ) : (
                <div>
                  <div className="text-end mb-3"><Link href="/admin/inbox" className="btn btn-sm btn-outline-primary">Go to Inbox</Link></div>
                  <div className="mb-3">
                    <label className="form-label small fw-bold">Select Image</label>
                    <input type="file" title="file" className="form-control" onChange={(e) => setFile(e.target.files ? e.target.files[0] : null)} />
                  </div>
                  <div className="mb-3">
                    <label className="form-label small fw-bold">Caption</label>
                    <input type="text" title="caption" className="form-control" placeholder="e.g. Canada Visa" value={caption} onChange={(e) => setCaption(e.target.value)} />
                  </div>
                  
                  <div className="d-grid gap-2">
                    <button disabled={uploading} onClick={handleUpload} className="btn btn-success fw-bold">
                      {uploading ? "Uploading..." : "Upload Photo"}
                    </button>
                    <button disabled={uploading} onClick={testDbWrite} className="btn btn-outline-secondary btn-sm">
                      Test Database Only (No Photo)
                    </button>
                  </div>
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
