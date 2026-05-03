"use client";

import { useState } from "react";
import Link from "next/link";

export default function Solvency() {
  const [amount, setAmount] = useState<number>(1000000); // Default 10 Lakh
  const [duration, setDuration] = useState<number>(3); // Default 3 months
  const [estimatedFee, setEstimatedFee] = useState<number | null>(null);

  const calculateFee = () => {
    // This is a placeholder logic for estimation
    // For example: 0.5% of amount per month
    const fee = (amount * 0.005) * duration;
    setEstimatedFee(Math.round(fee));
  };

  return (
    <div className="container my-5">
      <div className="row justify-content-center">
        <div className="col-md-10 text-center">
          <h1 className="text-primary mb-4 fw-bold"><i className="fas fa-money-check-alt me-2"></i>Bank Solvency Support</h1>
          <p className="lead text-muted mb-5">Professional and verified bank solvency documents to secure your global journey.</p>

          {/* Calculator Section */}
          <div className="row g-4 mb-5 text-start">
            <div className="col-lg-6">
              <div className="card shadow-sm border-0 p-4 h-100" style={{ borderRadius: '24px', background: '#f8faff' }}>
                <h3 className="h5 fw-bold mb-4 text-primary">Solvency Calculator</h3>
                <div className="mb-3">
                  <label className="form-label fw-bold">Required Amount (BDT):</label>
                  <input 
                    type="number" 
                    className="form-control form-control-lg" 
                    value={amount}
                    onChange={(e) => setAmount(Number(e.target.value))}
                    style={{ borderRadius: '12px' }}
                  />
                  <small className="text-muted">Enter the amount you need to show in bank.</small>
                </div>
                <div className="mb-4">
                  <label className="form-label fw-bold">Duration (Months):</label>
                  <select 
                    className="form-select form-select-lg" 
                    value={duration}
                    onChange={(e) => setDuration(Number(e.target.value))}
                    style={{ borderRadius: '12px' }}
                  >
                    <option value={1}>1 Month</option>
                    <option value={3}>3 Months</option>
                    <option value={6}>6 Months</option>
                    <option value={12}>12 Months</option>
                  </select>
                </div>
                <button 
                  onClick={calculateFee}
                  className="btn btn-primary btn-lg w-100 rounded-pill shadow-sm"
                >
                  Calculate Estimated Fee
                </button>
              </div>
            </div>

            <div className="col-lg-6">
              <div className="card shadow-sm border-0 p-4 h-100 bg-primary text-white" style={{ borderRadius: '24px' }}>
                <h3 className="h5 fw-bold mb-4">Estimation Result</h3>
                {estimatedFee ? (
                  <div className="text-center py-4">
                    <span className="d-block small text-white-50">Estimated Service Charge</span>
                    <h2 className="display-4 fw-bold mb-0">৳ {estimatedFee.toLocaleString()}</h2>
                    <p className="mt-3 small opacity-75">* This is an approximate amount. Final quote may vary based on bank selection and specific requirements.</p>
                    <a 
                      href={`https://wa.me/8801700000000?text=I need bank solvency for BDT ${amount.toLocaleString()} for ${duration} months.`} 
                      target="_blank" 
                      className="btn btn-light btn-lg mt-3 w-100 rounded-pill text-primary fw-bold"
                    >
                      Apply Now
                    </a>
                  </div>
                ) : (
                  <div className="text-center py-5 opacity-75">
                    <i className="fas fa-calculator fa-3x mb-3"></i>
                    <p>Enter your details and click calculate to see an estimate.</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Info Section */}
          <div className="card shadow-sm border-0 mt-5" style={{ borderRadius: '24px', overflow: 'hidden' }}>
            <div className="card-header bg-white border-0 py-4">
              <h3 className="mb-0 fw-bold">Why Choose Our Solvency Support?</h3>
            </div>
            <div className="card-body p-4 p-md-5">
              <div className="row text-start g-4">
                <div className="col-md-6 mb-3">
                  <div className="d-flex align-items-center mb-2">
                    <div className="bg-light p-2 rounded-circle me-3">
                      <i className="fas fa-shield-alt text-primary"></i>
                    </div>
                    <h5 className="mb-0 fw-bold">100% Genuine</h5>
                  </div>
                  <p className="text-muted">Verified documents directly from reputed financial institutions recognized by embassies.</p>
                </div>
                <div className="col-md-6 mb-3">
                  <div className="d-flex align-items-center mb-2">
                    <div className="bg-light p-2 rounded-circle me-3">
                      <i className="fas fa-bolt text-primary"></i>
                    </div>
                    <h5 className="mb-0 fw-bold">Fast Processing</h5>
                  </div>
                  <p className="text-muted">Get your documents ready within 24-48 hours of requirement submission.</p>
                </div>
                <div className="col-md-6 mb-3">
                  <div className="d-flex align-items-center mb-2">
                    <div className="bg-light p-2 rounded-circle me-3">
                      <i className="fas fa-globe text-primary"></i>
                    </div>
                    <h5 className="mb-0 fw-bold">Worldwide Acceptance</h5>
                  </div>
                  <p className="text-muted">Documents tailored to meet the specific financial requirements of embassies worldwide.</p>
                </div>
                <div className="col-md-6 mb-3">
                  <div className="d-flex align-items-center mb-2">
                    <div className="bg-light p-2 rounded-circle me-3">
                      <i className="fas fa-headset text-primary"></i>
                    </div>
                    <h5 className="mb-0 fw-bold">Expert Guidance</h5>
                  </div>
                  <p className="text-muted">Our financial experts help you decide the right amount for your visa success.</p>
                </div>
              </div>
              <div className="text-center mt-4">
                <Link href="/contact" className="btn btn-outline-primary btn-lg rounded-pill px-5">Still Have Questions?</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
