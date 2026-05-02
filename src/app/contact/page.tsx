"use client";

import { useState } from "react";
import { db } from "@/lib/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

export default function Contact() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState({ type: "", message: "" });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setStatus({ type: "info", message: "Sending your message..." });

    try {
      await addDoc(collection(db, 'inquiries'), {
        ...formData,
        createdAt: serverTimestamp()
      });
      setStatus({ type: "success", message: `Thank you, ${formData.name}! Your message has been sent successfully. We will contact you soon.` });
      setFormData({ name: "", email: "", message: "" });
    } catch (error) {
      console.error("Error sending message:", error);
      setStatus({ type: "danger", message: "Failed to send message. Please try again later." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container my-5">
      <h1 className="text-center text-primary mb-5">Contact BD TRIPPER</h1>

      <div className="row">
        {/* Contact Information */}
        <div className="col-md-5 mb-4">
          <div className="card h-100 border-0 shadow-sm">
            <div className="card-body bg-light p-4 rounded">
              <h3>Get in Touch</h3>
              <p>Have questions about visas or bank solvency? Reach out to us!</p>

              <ul className="list-unstyled mt-4">
                <li className="mb-3"><i className="fas fa-map-marker-alt text-primary me-2"></i> 10/2, Gawsia Kashem Center (4th floor), Arambagh Culvert Road, Motijheel, Dhaka-1000, Bangladesh</li>
                <li className="mb-3"><i className="fas fa-phone text-primary me-2"></i> +880 1735-182024</li>
                <li className="mb-3"><i className="fas fa-envelope text-primary me-2"></i> bdtrippers.info@gmail.com</li>
                <li className="mb-3"><i className="fab fa-whatsapp text-success me-2"></i> +880 1735-182024</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="col-md-7">
          <div className="card shadow-sm border-primary">
            <div className="card-header bg-primary text-white">
              <h4 className="mb-0">Send us a Message</h4>
            </div>
            <div className="card-body p-4">
              {status.message && (
                <div className={`alert alert-${status.type}`}>{status.message}</div>
              )}

              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">Full Name</label>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">Email Address</label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="message" className="form-label">Your Message / Requirement</label>
                  <textarea
                    className="form-control"
                    id="message"
                    rows={4}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  ></textarea>
                </div>
                <button type="submit" className="btn btn-primary w-100" disabled={loading}>
                  {loading ? "Sending..." : "Send Message"} <i className="fas fa-paper-plane ms-1"></i>
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
