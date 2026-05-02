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
      {/* Hero Section V2 */}
      <section className="hero-section-v2">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6 mb-5 mb-lg-0 text-start">
              <span className="hero-eyebrow">Trusted Travel Partner</span>
              <h1 className="hero-title">
                Travel with <br />
                <span style={{ fontStyle: 'italic' }}>Ease & Confidence</span>
              </h1>
              <p className="hero-lead">
                Premium Visa Processing and Bank Solvency support tailored for your global journey. Experience hassle-free documentation with our expert team.
              </p>
              <div>
                <Link href="/services" className="btn-premium">
                  <span className="btn-premium-inner">
                    Explore Our Services
                    <span className="btn-icon-wrapper">
                      <i className="fas fa-arrow-right"></i>
                    </span>
                  </span>
                </Link>
              </div>
            </div>
            
            <div className="col-lg-6">
              <div className="hero-visual">
                <div className="visual-card">
                  <img 
                    src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=1000&auto=format&fit=crop" 
                    alt="Travel Hero" 
                    className="img-fluid rounded-4 shadow-sm"
                    style={{ width: '100%', height: '400px', objectFit: 'cover' }}
                  />
                  
                  {/* Floating Badges */}
                  <div className="floating-badge badge-1">
                    <div className="icon bg-primary-soft p-2 rounded-circle" style={{ background: '#eef6ff' }}>
                      <i className="fas fa-passport text-primary"></i>
                    </div>
                    <div>
                      <div className="fw-bold small">Global Access</div>
                      <div className="text-muted smallest" style={{ fontSize: '10px' }}>150+ Countries</div>
                    </div>
                  </div>
                  
                  <div className="floating-badge badge-2">
                    <div className="icon bg-success-soft p-2 rounded-circle" style={{ background: '#e6fffa' }}>
                      <i className="fas fa-check-circle text-success"></i>
                    </div>
                    <div>
                      <div className="fw-bold small">High Success Rate</div>
                      <div className="text-muted smallest" style={{ fontSize: '10px' }}>Verified Support</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container my-5 py-5">
        <div className="row text-center">
          <div className="col-md-4 mb-4">
            <div className="card h-100 shadow-sm border-0 p-4" style={{ borderRadius: '24px', background: '#f8faff' }}>
              <div className="card-body">
                <div className="bg-white shadow-sm p-3 rounded-circle d-inline-block mb-4">
                  <i className="fas fa-passport fa-2x text-primary"></i>
                </div>
                <h3 className="card-title h4 fw-bold">Visa Processing</h3>
                <p className="card-text text-muted">Work, Student, and Medical visas for any country worldwide.</p>
                <Link href="/services" className="btn btn-link text-primary text-decoration-none fw-bold mt-2">
                  Learn More <i className="fas fa-chevron-right small ms-1"></i>
                </Link>
              </div>
            </div>
          </div>
          <div className="col-md-4 mb-4">
            <div className="card h-100 shadow-sm border-0 p-4" style={{ borderRadius: '24px', background: '#f8faff' }}>
              <div className="card-body">
                <div className="bg-white shadow-sm p-3 rounded-circle d-inline-block mb-4">
                  <i className="fas fa-money-check-alt fa-2x text-primary"></i>
                </div>
                <h3 className="card-title h4 fw-bold">Bank Solvency</h3>
                <p className="card-text text-muted">Bank solvency support for any required amount to secure your visa.</p>
                <Link href="/solvency" className="btn btn-link text-primary text-decoration-none fw-bold mt-2">
                  Learn More <i className="fas fa-chevron-right small ms-1"></i>
                </Link>
              </div>
            </div>
          </div>
          <div className="col-md-4 mb-4">
            <div className="card h-100 shadow-sm border-0 p-4" style={{ borderRadius: '24px', background: '#f8faff' }}>
              <div className="card-body">
                <div className="bg-white shadow-sm p-3 rounded-circle d-inline-block mb-4">
                  <i className="fas fa-headset fa-2x text-primary"></i>
                </div>
                <h3 className="card-title h4 fw-bold">24/7 Support</h3>
                <p className="card-text text-muted">Live chat and dedicated support team ready to assist you anytime.</p>
                <Link href="/contact" className="btn btn-link text-primary text-decoration-none fw-bold mt-2">
                  Contact Us <i className="fas fa-chevron-right small ms-1"></i>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Visa Success Gallery */}
      <section className="container my-5 py-5">
        <h2 className="text-center text-primary mb-5 fw-bold">Our Success Stories</h2>
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
                <div className="card h-100 shadow-sm border-0" style={{ borderRadius: '20px', overflow: 'hidden' }}>
                  <img src={story.imageUrl} className="card-img-top" alt="Visa Success" style={{ height: '300px', objectFit: 'cover' }} />
                  <div className="card-body p-3 text-center">
                    <span className="badge bg-primary px-3 py-2 rounded-pill" style={{ fontWeight: '500' }}>{story.caption}</span>
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
