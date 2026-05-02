"use client";

import { useState } from "react";
import Link from "next/link";
import { db, storage } from "@/lib/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

export default function AdminUpload() {
  const [password, setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [caption, setCaption] = useState("");
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState({ type: "", message: "" });

  const correctPass = "siam123";

  const handleLogin = () => {
    if (password === correctPass) {
      setIsLoggedIn(true);
      setStatus({ type: "info", message: "Welcome, Admin!" });
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
    setStatus({ type: "info", message: "Starting upload..." });

    try {
      const fileName = Date.now() + "_" + file.name;
      const storageRef = ref(storage, 'success_stories/' + fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on('state_changed',
        (snapshot) => {
          const progressValue = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setProgress(progressValue);
        },
        (error) => {
          console.error("Upload error:", error);
          setStatus({ type: "danger", message: `Error: ${error.message}` });
          setUploading(false);
        },
        async () => {
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
          await addDoc(collection(db, 'success_stories'), {
            imageUrl: downloadURL,
            caption: caption,
            createdAt: serverTimestamp()
          });

          setStatus({ type: "success", message: "Success! Photo uploaded and saved permanently." });
          setUploading(false);
          setFile(null);
          setCaption("");
          setProgress(0);
        }
      );
    } catch (error: any) {
      console.error("Upload failed:", error);
      setStatus({ type: "danger", message: `Error: ${error.message}` });
      setUploading(false);
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card shadow border-0" style={{ borderRadius: '15px' }}>
            <div className="card-header bg-primary text-white text-center py-3" style={{ borderRadius: '15px 15px 0 0' }}>
              <h4 className="m-0 fw-bold">Upload Success Photo</h4>
            </div>
            <div className="card-body p-4">
              {status.message && (
                <div className={`alert alert-${status.type}`}>{status.message}</div>
              )}

              {!isLoggedIn ? (
                <div id="login-section">
                  <div className="mb-3">
                    <label className="form-label fw-bold">Admin Password</label>
                    <input
                      type="password"
                      className="form-control"
                      placeholder="Enter password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleLogin()}
                    />
                  </div>
                  <button onClick={handleLogin} className="btn btn-primary w-100 fw-bold py-2">Login to Admin</button>
                </div>
              ) : (
                <div id="upload-section">
                  <div className="text-end mb-3">
                    <Link href="/admin/inbox" className="btn btn-sm btn-outline-primary">
                      <i className="fas fa-inbox me-1"></i> Go to Inbox
                    </Link>
                  </div>
                  <div className="mb-3">
                    <label className="form-label fw-bold">Select Visa Photo</label>
                    <input
                      type="file"
                      className="form-control"
                      accept="image/*"
                      onChange={(e) => setFile(e.target.files ? e.target.files[0] : null)}
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label fw-bold">Caption (e.g. USA Student Visa)</label>
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
                    className="btn btn-success w-100 fw-bold py-2"
                  >
                    <i className="fas fa-cloud-upload-alt me-1"></i>
                    {uploading ? `Uploading... ${Math.round(progress)}%` : "Upload to Firebase"}
                  </button>
                  {uploading && (
                    <div className="progress mt-3">
                      <div
                        className="progress-bar progress-bar-striped progress-bar-animated"
                        role="progressbar"
                        style={{ width: `${progress}%` }}
                      ></div>
                    </div>
                  )}
                </div>
              )}

              <div className="text-center mt-3">
                <Link href="/" className="btn btn-link text-decoration-none text-muted">Back to Website</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
