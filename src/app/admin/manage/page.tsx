// @ts-nocheck
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth, signInAnonymously } from "firebase/auth";
import { getFirestore, collection, query, orderBy, getDocs, deleteDoc, doc } from "firebase/firestore";
import { getStorage, ref, deleteObject } from "firebase/storage";

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

export default function AdminManage() {
  const [password, setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleLogin = async () => {
    if (password === "siam123") {
      try {
        await signInAnonymously(auth);
        setIsLoggedIn(true);
        loadStories();
      } catch (err) {
        alert("Auth Error: " + err.message);
      }
    } else {
      alert("Wrong Password");
    }
  };

  const loadStories = async () => {
    setLoading(true);
    try {
      const q = query(collection(db, "success_stories"), orderBy("createdAt", "desc"));
      const querySnapshot = await getDocs(q);
      const fetchedStories = [];
      querySnapshot.forEach((doc) => {
        fetchedStories.push({ id: doc.id, ...doc.data() });
      });
      setStories(fetchedStories);
    } catch (err) {
      console.error("Error loading stories:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (storyId, imageUrl) => {
    if (!confirm("Are you sure you want to delete this story?")) return;
    
    try {
      // 1. Delete from Firestore
      await deleteDoc(doc(db, "success_stories", storyId));
      
      // 2. Try to delete from Storage (optional, if url is internal)
      try {
        if (imageUrl.includes("firebasestorage.googleapis.com")) {
          const storageRef = ref(storage, imageUrl);
          await deleteObject(storageRef);
        }
      } catch (storageErr) {
        console.warn("Storage deletion error (maybe file already gone):", storageErr);
      }

      setMessage("Story deleted successfully!");
      setStories(stories.filter(s => s.id !== storyId));
    } catch (err) {
      alert("Delete Error: " + err.message);
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-10">
          <div className="card shadow border-0">
            <div className="card-header bg-danger text-white d-flex justify-content-between align-items-center py-3">
              <h5 className="m-0 fw-bold">Manage Success Stories</h5>
              <Link href="/admin/upload" className="btn btn-sm btn-light fw-bold">Upload New</Link>
            </div>
            <div className="card-body p-4">
              {!isLoggedIn ? (
                <div className="col-md-6 mx-auto">
                  <input type="password" title="password" className="form-control mb-3" placeholder="Admin Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                  <button onClick={handleLogin} className="btn btn-danger w-100 fw-bold">Login to Manage</button>
                </div>
              ) : (
                <>
                  {message && <div className="alert alert-success small">{message}</div>}
                  {loading ? (
                    <div className="text-center p-5"><div className="spinner-border text-danger"></div></div>
                  ) : (
                    <div className="row">
                      {stories.length === 0 ? (
                        <div className="col-12 text-center text-muted">No stories found.</div>
                      ) : (
                        stories.map((story) => (
                          <div key={story.id} className="col-md-4 mb-4">
                            <div className="card h-100 border shadow-sm">
                              <img src={story.imageUrl} className="card-img-top" alt="Preview" style={{ height: '150px', objectFit: 'cover' }} />
                              <div className="card-body p-2 text-center">
                                <p className="small mb-2 fw-bold text-truncate">{story.caption}</p>
                                <button 
                                  onClick={() => handleDelete(story.id, story.imageUrl)} 
                                  className="btn btn-sm btn-outline-danger w-100"
                                >
                                  <i className="fas fa-trash me-1"></i> Delete
                                </button>
                              </div>
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                  )}
                </>
              )}
              <div className="text-center mt-4"><Link href="/" className="small text-muted">Back to Home</Link></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
