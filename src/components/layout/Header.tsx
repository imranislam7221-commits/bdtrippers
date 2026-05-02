"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { auth } from "@/lib/firebase";
import { onAuthStateChanged, signInWithPopup, GoogleAuthProvider, FacebookAuthProvider, signOut, User } from "firebase/auth";
import Image from "next/image";

export default function Header() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const loginWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error("Google Login Error:", error);
    }
  };

  const loginWithFacebook = async () => {
    const provider = new FacebookAuthProvider();
    try {
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error("Facebook Login Error:", error);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Logout Error:", error);
    }
  };

  return (
    <nav className="navbar navbar-expand-lg custom-navbar sticky-top shadow-sm">
      <div className="container d-flex justify-content-between">
        <Link className="navbar-brand brand-logo" href="/">
          BD <span className="fw-light">TRIPPER</span>
        </Link>

        <div className="collapse navbar-collapse flex-grow-0" id="navbarNav">
          <ul className="navbar-nav align-items-center">
            <li className="nav-item">
              <Link className="nav-link custom-link" href="/">Home</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link custom-link" href="/services">Visa Services</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link custom-link" href="/solvency">Bank Solvency</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link custom-link" href="/admin/upload">Admin Panel</Link>
            </li>
            <li className="nav-item ms-lg-3 mt-3 mt-lg-0 w-100 w-lg-auto text-center">
              <Link className="btn custom-btn-white rounded-pill px-4" href="/contact">Contact Us</Link>
            </li>
          </ul>
        </div>

        <div className="ms-auto d-flex align-items-center me-3" id="auth-btn-container">
          {user ? (
            <div className="dropdown">
              <button className="btn btn-outline-primary dropdown-toggle rounded-pill" type="button" data-bs-toggle="dropdown">
                {user.photoURL && (
                  <img src={user.photoURL} alt={user.displayName || "User"} width="25" className="rounded-circle me-1" />
                )}
                {user.displayName?.split(" ")[0] || "User"}
              </button>
              <ul className="dropdown-menu dropdown-menu-end shadow border-0 mt-2">
                <li><Link className="dropdown-item" href="/dashboard">Dashboard</Link></li>
                <li><hr className="dropdown-divider" /></li>
                <li><button className="dropdown-item" onClick={handleLogout}>Logout</button></li>
              </ul>
            </div>
          ) : (
            <div className="dropdown">
              <button className="btn btn-primary rounded-pill px-3 px-md-4 dropdown-toggle" type="button" id="loginDropdown" data-bs-toggle="dropdown" aria-expanded="false">
                <i className="fas fa-sign-in-alt me-1"></i> Login
              </button>
              <ul className="dropdown-menu dropdown-menu-end shadow border-0 mt-2" aria-labelledby="loginDropdown">
                <li>
                  <button className="dropdown-item py-2" onClick={loginWithGoogle}>
                    <i className="fab fa-google text-danger me-2"></i> Login with Google
                  </button>
                </li>
                <li>
                  <button className="dropdown-item py-2" onClick={loginWithFacebook}>
                    <i className="fab fa-facebook-f text-primary me-2" style={{ color: "#1877F2" }}></i> Login with Facebook
                  </button>
                </li>
              </ul>
            </div>
          )}
        </div>

        <button className="navbar-toggler border-0 shadow-none px-2 d-lg-none" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <i className="fa-solid fa-ellipsis-vertical fs-2"></i>
        </button>
      </div>
    </nav>
  );
}
