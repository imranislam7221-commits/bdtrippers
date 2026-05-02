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

const HERO_SLIDES = [
  {
    url: "https://images.pexels.com/photos/3769118/pexels-photo-3769118.jpeg?auto=compress&cs=tinysrgb&w=1200",
    title: "Work Visa Support",
    description: "Global career opportunities for professionals."
  },
  {
    url: "https://images.pexels.com/photos/1438072/pexels-photo-1438072.jpeg?auto=compress&cs=tinysrgb&w=1200",
    title: "Student Visa Processing",
    description: "Secure your future in top foreign universities."
  },
  {
    url: "https://images.pexels.com/photos/4056853/pexels-photo-4056853.jpeg?auto=compress&cs=tinysrgb&w=1200",
    title: "Medical Visa Assistance",
    description: "Fast-track access to world-class healthcare."
  }
];

export default function Home() {
  const [stories, setStories] = useState<SuccessStory[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

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
    <main style={{ minHeight: '100vh' }}>
      {/* Hero Section */}
      <section className="hero-section-v2" style={{ padding: '80px 0', background: '#0056b3', color: 'white' }}>
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6 mb-4 mb-lg-0">
              <span style={{ background: 'rgba(255,255,255,0.1)', padding: '5px 15px', borderRadius: '20px', fontSize: '0.8rem', fontWeight: 'bold', textTransform: 'uppercase' }}>
                Trusted Travel Partner
              </span>
              <h1 style={{ fontSize: '3.5rem', fontWeight: '800', marginTop: '20px', lineHeight: '1.2' }}>
                Travel with <br />
                <span style={{ fontStyle: 'italic', fontWeight: '300' }}>Ease & Confidence</span>
              </h1>
              <p style={{ fontSize: '1.1rem', opacity: 0.9, marginTop: '20px', maxWidth: '500px' }}>
                Premium Visa Processing and Bank Solvency support tailored for your global journey.
              </p>
              <div className="mt-4">
                <Link href="/services" className="btn btn-light btn-lg rounded-pill px-4 fw-bold text-primary shadow">
                  Explore Services <i className="fas fa-arrow-right ms-2"></i>
                </Link>
              </div>
            </div>
            
            <div className="col-lg-6">
              <div style={{ position: 'relative', height: '400px', borderRadius: '30px', overflow: 'hidden', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)', background: '#1a1a1a' }}>
                {HERO_SLIDES.map((slide, index) => (
                  <div 
                    key={index}
                    style={{ 
                      position: 'absolute', 
                      inset: 0, 
                      opacity: index === currentSlide ? 1 : 0,
                      transition: 'opacity 0.8s ease-in-out',
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
                        bottom: '0', 
                        left: '0', 
                        right: '0',
                        padding: '40px 25px 25px',
                        background: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, transparent 100%)',
                        color: 'white'
                      }}
                    >
                      <h4 style={{ margin: 0, fontWeight: 'bold' }}>{slide.title}</h4>
                      <p style={{ margin: 0, opacity: 0.8, fontSize: '0.9rem' }}>{slide.description}</p>
                    </div>
                  </div>
                ))}

                {/* Badges */}
                <div style={{ position: 'absolute', top: '20px', left: '20px', zIndex: 5, background: 'white', color: 'black', padding: '8px 15px', borderRadius: '15px', display: 'flex', alignItems: 'center', gap: '10px', boxShadow: '0 10px 20px rgba(0,0,0,0.2)' }}>
                   <i className="fas fa-passport text-primary"></i>
                   <span style={{ fontSize: '0.7rem', fontWeight: 'bold' }}>GLOBAL ACCESS</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="container py-5 my-5">
        <div className="row g-4 text-center">
          {[
            { icon: 'fa-passport', title: 'Visa Processing', text: 'Work, Student, and Medical.' },
            { icon: 'fa-money-check-alt', title: 'Bank Solvency', text: 'Any amount, any country.' },
            { icon: 'fa-headset', title: '24/7 Support', text: 'Always here to help you.' }
          ].map((feature, i) => (
            <div key={i} className="col-md-4">
              <div className="p-5 h-100 shadow-sm border-0 rounded-4" style={{ background: '#f8faff' }}>
                <div className="mb-4 text-primary"><i className={`fas ${feature.icon} fa-3x`}></i></div>
                <h4 className="fw-bold">{feature.title}</h4>
                <p className="text-muted">{feature.text}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Stories */}
      <section className="container py-5">
        <h2 className="text-center fw-bold mb-5 text-primary">Success Stories</h2>
        <div className="row g-4">
          {loading ? (
            <div className="col-12 text-center py-5"><div className="spinner-border text-primary"></div></div>
          ) : stories.length > 0 ? (
            stories.map(s => (
              <div key={s.id} className="col-md-4">
                <div className="card h-100 border-0 shadow-sm rounded-4 overflow-hidden">
                  <img src={s.imageUrl} className="card-img-top" style={{ height: '250px', objectFit: 'cover' }} alt="Visa" />
                  <div className="card-body text-center bg-primary text-white p-2">
                    <small className="fw-bold">{s.caption}</small>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-12 text-center text-muted">No stories yet.</div>
          )}
        </div>
      </section>
    </main>
  );
}
