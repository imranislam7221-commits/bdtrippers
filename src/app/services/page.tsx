"use client";

import { useState } from "react";

const VISA_DATA: Record<string, { requirements: string[]; processingTime: string; fee: string }> = {
  "United Kingdom": {
    requirements: [
      "Valid Passport (at least 6 months)",
      "CAS Letter (for students)",
      "Bank Statement (28 days rule)",
      "TB Test Certificate",
      "IELTS/English Proficiency"
    ],
    processingTime: "15-21 Working Days",
    fee: "£490 (Standard)"
  },
  "USA": {
    requirements: [
      "DS-160 Confirmation",
      "I-20 Form (for students)",
      "SEVIS Fee Receipt",
      "Valid Passport",
      "Financial Documents"
    ],
    processingTime: "Depends on Interview Slot",
    fee: "$185 (MRV Fee)"
  },
  "Canada": {
    requirements: [
      "LOA from DLI",
      "GIC Certificate ($20,635 CAD)",
      "Study Plan/SOP",
      "Medical Exam",
      "Valid Passport"
    ],
    processingTime: "8-12 Weeks",
    fee: "$150 CAD"
  },
  "Australia": {
    requirements: [
      "CoE (Confirmation of Enrolment)",
      "OSHC (Health Insurance)",
      "Genuine Student (GS) Requirement",
      "English Proficiency (IELTS/PTE)",
      "Financial Capacity Evidence"
    ],
    processingTime: "4-8 Weeks",
    fee: "$710 AUD"
  }
};

export default function Services() {
  const [selectedCountry, setSelectedCountry] = useState("United Kingdom");

  return (
    <div className="container my-5">
      <h1 className="text-center text-primary mb-5 fw-bold">Our Visa Services</h1>

      {/* Dynamic Visa Guide */}
      <section className="mb-5 p-4 shadow-sm rounded-4 bg-white border">
        <h2 className="text-center mb-4">Quick Visa Guide</h2>
        <div className="row justify-content-center mb-4">
          <div className="col-md-6">
            <label className="form-label fw-bold">Select Destination Country:</label>
            <select 
              className="form-select form-select-lg" 
              value={selectedCountry}
              onChange={(e) => setSelectedCountry(e.target.value)}
              style={{ borderRadius: '12px' }}
            >
              {Object.keys(VISA_DATA).map(country => (
                <option key={country} value={country}>{country}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="row">
          <div className="col-md-7">
            <div className="p-3 bg-light rounded-4 h-100">
              <h4 className="text-primary mb-3"><i className="fas fa-file-alt me-2"></i>Requirements for {selectedCountry}</h4>
              <ul className="list-group list-group-flush bg-transparent">
                {VISA_DATA[selectedCountry].requirements.map((req, index) => (
                  <li key={index} className="list-group-item bg-transparent border-0 ps-0">
                    <i className="fas fa-check-circle text-success me-2"></i> {req}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="col-md-5">
            <div className="p-3 bg-light rounded-4 h-100">
              <h4 className="text-primary mb-3"><i className="fas fa-info-circle me-2"></i>Details</h4>
              <div className="mb-3">
                <span className="fw-bold d-block text-muted small">Estimated Processing Time:</span>
                <span className="fs-5">{VISA_DATA[selectedCountry].processingTime}</span>
              </div>
              <div className="mb-3">
                <span className="fw-bold d-block text-muted small">Visa Fee (Approx):</span>
                <span className="fs-5">{VISA_DATA[selectedCountry].fee}</span>
              </div>
              <div className="mt-4">
                <a href={`https://wa.me/8801700000000?text=I need help with ${selectedCountry} visa`} target="_blank" className="btn btn-primary w-100 rounded-pill py-2">
                  Get Started for {selectedCountry}
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Existing Content */}
      <div className="row mb-5 align-items-center">
        <div className="col-md-6">
          <h2><i className="fas fa-user-graduate text-primary"></i> Student Visa</h2>
          <p>Achieve your educational dreams with our hassle-free student visa processing. We assist with university admissions, offer letters, and the entire visa application process for students aiming to study anywhere in the world.</p>
          <ul className="list-group list-group-flush mb-3">
            <li className="list-group-item"><i className="fas fa-check text-success"></i> Admission Assistance</li>
            <li className="list-group-item"><i className="fas fa-check text-success"></i> Financial Document Guidance</li>
            <li className="list-group-item"><i className="fas fa-check text-success"></i> University Selection Support</li>
          </ul>
        </div>
        <div className="col-md-6 text-center">
          <div className="p-5 bg-light rounded-4 border border-primary">
            <h4>Study Destinations</h4>
            <p>Top universities in USA, UK, Canada, Australia, Germany, Asia, and more.</p>
          </div>
        </div>
      </div>

      <hr />

      <div className="row my-5 align-items-center">
        <div className="col-md-6 order-md-2">
          <h2><i className="fas fa-briefcase text-primary"></i> Work Visa</h2>
          <p>We provide comprehensive support for work visas to any country. Our experts help you navigate the documentation, employment contracts, and application procedures to ensure a smooth transition to your new career abroad.</p>
          <ul className="list-group list-group-flush mb-3">
            <li className="list-group-item"><i className="fas fa-check text-success"></i> Document Verification</li>
            <li className="list-group-item"><i className="fas fa-check text-success"></i> Application Processing</li>
            <li className="list-group-item"><i className="fas fa-check text-success"></i> Interview Preparation</li>
          </ul>
        </div>
        <div className="col-md-6 order-md-1 text-center">
          <div className="p-5 bg-light rounded-4 border border-primary">
            <h4>Supported Countries</h4>
            <p>USA, Canada, UK, Australia, Europe (Schengen), Middle East, Asia, and more.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
