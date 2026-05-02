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
  const [currentSlide, setCurrentSlide] = useState(0);

  const heroSlides = [
    {
      url: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=1200&auto=format&fit=crop",
      title: "Work Visa Support",
      description: "Global career opportunities."
    },
    {
      url: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=1200&auto=format&fit=crop",
      title: "Student Visa Processing",
      description: "Secure your future abroad."
    },
    {
      url: "https://images.unsplash.com/photo-1505751172107-5739a007351e?q=80&w=1200&auto=format&fit=crop",
      title: "Medical Visa Assistance",
      description: "World-class healthcare access."
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [heroSlides.length]);

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
    <main>
      {/* Hero Section V2 */}
      <section className="hero-section-v2" style={{ minHeight: '600px', display: 'flex', alignItems: 'center' }}>
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6 mb-5 mb-lg-0">
              <span className="hero-eyebrow">Trusted Travel Partner</span>
              <h1 className="hero-title">
                Travel with <br />
                <span style={{ fontStyle: 'italic' }}>Ease & Confidence</span>
              </h1>
              <p className="hero-lead">
                Premium Visa Processing and Bank Solvency support tailored for your global journey.
              </p>
              <div className="mt-4">
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
              <div className="hero-visual" style={{ position: 'relative' }}>
                <div className="visual-card" style={{ height: '400px', width: '100%', position: 'relative', overflow: 'hidden', borderRadius: '32px', background: '#eee' }}>
                  {heroSlides.map((slide, index) => (
                    <div 
                      key={index}
                      style={{ 
                        position: 'absolute', 
                        inset: 0, 
                        opacity: index === currentSlide ? 1 : 0,
                        transition: 'opacity 1s ease-in-out',
                        zIndex: index === currentSlide ? 1 : 0
                      }}
                    >
                      <img 
                        src={slide.url} 
                        alt={slide.title} 
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      />
                      <div 
                        style={{ 
                          position: 'absolute', 
                          bottom: '20px', 
                          left: '20px', 
                          right: '20px',
                          background: 'rgba(0,86,179,0.8)',
                          backdropFilter: 'blur(10px)',
                          padding: '15px',
                          borderRadius: '15px',
                          color: 'white',
                          zIndex: 2
                        }}
                      >
                        <h4 className="mb-1" style={{ fontSize: '1.1rem', fontWeight: '700' }}>{slide.title}</h4>
                        <p className="small mb-0 opacity-75">{slide.description}</p>
                      </div>
                    </div>
                  ))}
                  
                  {/* Floating Badges */}
                  <div className="floating-badge badge-1" style={{ zIndex: 10 }}>
                    <div className="icon p-2 rounded-circle" style={{ background: '#eef6ff' }}>
                      <i className="fas fa-passport text-primary"></i>
                    </div>
                    <div>
                      <div className="fw-bold small">Global Access</div>
                    </div>
                  </div>
                  
                  <div className="floating-badge badge-2" style={{ zIndex: 10 }}>
                    <div className="icon p-2 rounded-circle" style={{ background: '#e6fffa' }}>
                      <i className="fas fa-check-circle text-success"></i>
                    </div>
                    <div>
                      <div className="fw-bold small">High Success Rate</div>
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
                <p className="card-text text-muted">Work, Student, and Medical visas worldwide.</p>
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
                <p className="card-text text-muted">Support for any required amount.</p>
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
                <p className="card-text text-muted">Dedicated team ready to assist you.</p>
                <Link href="/contact" className="btn btn-link text-primary text-decoration-none fw-bold mt-2">
                  Contact Us <i className="fas fa-chevron-right small ms-1"></i>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className="container my-5 py-5">
        <h2 className="text-center text-primary mb-5 fw-bold">Our Success Stories</h2>
        <div className="row">
          {loading ? (
            <div className="col-12 text-center">
              <div className="spinner-border text-primary" role="status"></div>
            </div>
          ) : stories.length > 0 ? (
            stories.map(story => (
              <div key={story.id} className="col-md-4 mb-4">
                <div className="card h-100 shadow-sm border-0" style={{ borderRadius: '20px', overflow: 'hidden' }}>
                  <img src={story.imageUrl} className="card-img-top" alt="Visa" style={{ height: '300px', objectFit: 'cover' }} />
                  <div className="card-body p-3 text-center">
                    <span className="badge bg-primary px-3 py-2 rounded-pill">{story.caption}</span>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-12 text-center text-muted">No success stories found.</div>
          )}
        </div>
      </section>
    </main>
  );
}
