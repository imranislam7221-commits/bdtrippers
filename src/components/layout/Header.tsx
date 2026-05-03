"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { auth } from "@/lib/firebase";
import { onAuthStateChanged, signInWithPopup, GoogleAuthProvider, FacebookAuthProvider, signOut, User } from "firebase/auth";
import Image from "next/image";

export default function Header() {
  const [user, setUser] = useState<User | null>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isNavOpen, setIsNavOpen] = useState(false);

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
    } catch (error: any) {
      console.error("Google Login Error:", error);
      alert("Google Login Error: " + error.message);
    }
  };

  const loginWithFacebook = async () => {
    const provider = new FacebookAuthProvider();
    try {
      await signInWithPopup(auth, provider);
    } catch (error: any) {
      console.error("Facebook Login Error:", error);
      alert("Facebook Login Error: " + error.message);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Logout Error:", error);
    }
  };

  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);
  const toggleNav = () => setIsNavOpen(!isNavOpen);

  return (
    <nav className="navbar navbar-expand-lg custom-navbar sticky-top shadow-sm">
      <div className="container d-flex justify-content-between align-items-center">
        <Link className="navbar-brand brand-logo" href="/">
          BD <span className="fw-light">TRIPPER</span>
        </Link>

        {/* Login System (Moved to the left) */}
        <div className="d-flex align-items-center ms-lg-3 me-auto order-lg-2" id="auth-btn-container">
          {user ? (
            <div className={`dropdown ${isDropdownOpen ? 'show' : ''}`}>
              <button 
                className="btn btn-outline-primary dropdown-toggle rounded-pill" 
                type="button" 
                onClick={toggleDropdown}
              >
                {user.photoURL && (
                  <img src={user.photoURL} alt={user.displayName || "User"} width="25" className="rounded-circle me-1" />
                )}
                {user.displayName?.split(" ")[0] || "User"}
              </button>
              <ul className={`dropdown-menu dropdown-menu-end shadow border-0 mt-2 ${isDropdownOpen ? 'show' : ''}`} style={{ position: isDropdownOpen ? 'absolute' : 'static', left: 0 }}>
                <li><Link className="dropdown-item" href="/dashboard" onClick={() => setIsDropdownOpen(false)}>Dashboard</Link></li>
                <li><hr className="dropdown-divider" /></li>
                <li><button className="dropdown-item" onClick={() => { handleLogout(); setIsDropdownOpen(false); }}>Logout</button></li>
              </ul>
            </div>
          ) : (
            <div className={`dropdown ${isDropdownOpen ? 'show' : ''}`}>
              <button 
                className="btn btn-primary rounded-pill px-3 px-md-4 dropdown-toggle" 
                type="button" 
                onClick={toggleDropdown}
              >
                <i className="fas fa-sign-in-alt me-1"></i> Login
              </button>
              <ul className={`dropdown-menu dropdown-menu-end shadow border-0 mt-2 ${isDropdownOpen ? 'show' : ''}`} style={{ position: isDropdownOpen ? 'absolute' : 'static', left: 0 }}>
                <li>
                  <button className="dropdown-item py-2" onClick={() => { loginWithGoogle(); setIsDropdownOpen(false); }}>
                    <i className="fab fa-google text-danger me-2"></i> Login with Google
                  </button>
                </li>
                <li>
                  <button className="dropdown-item py-2" onClick={() => { loginWithFacebook(); setIsDropdownOpen(false); }}>
                    <i className="fab fa-facebook-f text-primary me-2" style={{ color: "#1877F2" }}></i> Login with Facebook
                  </button>
                </li>
              </ul>
            </div>
          )}
        </div>

        <div className={`collapse navbar-collapse flex-grow-0 order-lg-3 ${isNavOpen ? 'show' : ''}`} id="navbarNav">
          <ul className="navbar-nav align-items-center">
            <li className="nav-item">
              <Link className="nav-link custom-link" href="/" onClick={() => setIsNavOpen(false)}>Home</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link custom-link" href="/services" onClick={() => setIsNavOpen(false)}>Visa Services</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link custom-link" href="/solvency" onClick={() => setIsNavOpen(false)}>Bank Solvency</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link custom-link" href="/admin/upload" onClick={() => setIsNavOpen(false)}>Admin Panel</Link>
            </li>
            <li className="nav-item ms-lg-3 mt-3 mt-lg-0 w-100 w-lg-auto text-center">
              <Link className="btn custom-btn-white rounded-pill px-4" href="/contact" onClick={() => setIsNavOpen(false)}>Contact Us</Link>
            </li>
          </ul>
        </div>

        <button 
          className="navbar-toggler border-0 shadow-none px-2 d-lg-none order-lg-4" 
          type="button" 
          onClick={toggleNav}
        >
          <i className="fa-solid fa-ellipsis-vertical fs-2"></i>
        </button>
      </div>
    </nav>
  );
}
