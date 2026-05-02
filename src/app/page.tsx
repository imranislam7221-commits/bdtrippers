"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { db } from "@/lib/firebase";
import { collection, query, orderBy, getDocs } from "firebase/firestore";

interface SuccessStory {
  id: string;
  imageUrl: string;
  caption: string;
  createdAt: any;
}

export default function Home() {
  const [stories, setStories] = useState<SuccessStory[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadSuccessStories() {
      try {
        const q = query(collection(db, 'success_stories'), orderBy('createdAt', 'desc'));
        const querySnapshot = await getDocs(q);
        const fetchedStories: SuccessStory[] = [];
        querySnapshot.forEach(doc => {
          fetchedStories.push({ id: doc.id, ...doc.data() } as SuccessStory);
        });
        setStories(fetchedStories);
      } catch (error) {
        console.error("Error loading success stories:", error);
      } finally {
        setLoading(false);
      }
    }

    loadSuccessStories();
  }, []);

  return (
    <div>
      {/* Hero Section */}
      <section className="hero-section">
        <div className="container">
          <h2 className="welcome-text mb-2">Welcome Here</h2>
          <h1 className="display-4 fw-bold">Travel with Ease</h1>
          <p className="lead"><span className="hassle-text">Hassle</span>-free Visa Processing & Bank Solvency Support for Any Country.</p>
          <Link href="/services" className="btn btn-light btn-lg mt-3">Explore Services</Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="container my-5">
        <div className="row text-center">
          <div className="col-md-4 mb-4">
            <div className="card h-100 shadow-sm border-primary">
              <div className="card-body">
                <i className="fas fa-passport fa-3x text-primary mb-3"></i>
                <h3 className="card-title">Visa Processing</h3>
                <p className="card-text">Work, Student, and Medical visas for any country worldwide.</p>
                <Link href="/services" className="btn btn-outline-primary">Learn More</Link>
              </div>
            </div>
          </div>
          <div className="col-md-4 mb-4">
            <div className="card h-100 shadow-sm border-primary">
              <div className="card-body">
                <i className="fas fa-money-check-alt fa-3x text-primary mb-3"></i>
                <h3 className="card-title">Bank Solvency</h3>
                <p className="card-text">Bank solvency support for any required amount to secure your visa.</p>
                <Link href="/solvency" className="btn btn-outline-primary">Learn More</Link>
              </div>
            </div>
          </div>
          <div className="col-md-4 mb-4">
            <div className="card h-100 shadow-sm border-primary">
              <div className="card-body">
                <i className="fas fa-headset fa-3x text-primary mb-3"></i>
                <h3 className="card-title">24/7 Support</h3>
                <p className="card-text">Live chat and dedicated support team ready to assist you anytime.</p>
                <Link href="/contact" className="btn btn-outline-primary">Contact Us</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Visa Success Gallery */}
      <section className="container my-5">
        <h2 className="text-center text-primary mb-4">Our Success Stories</h2>
        <div className="row" id="visa-gallery">
          {loading ? (
            <div className="col-12 text-center">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          ) : stories.length > 0 ? (
            stories.map(story => (
              <div key={story.id} className="col-md-4 mb-4">
                <div className="card h-100 shadow-sm border-0" style={{ borderRadius: '12px', overflow: 'hidden' }}>
                  <img src={story.imageUrl} className="card-img-top" alt="Visa Success" style={{ height: '250px', objectFit: 'cover' }} />
                  <div className="card-body p-2 text-center">
                    <span className="badge bg-primary px-3 py-2 rounded-pill">{story.caption}</span>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-12 text-center">
              <p className="text-muted">No success stories found yet.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
