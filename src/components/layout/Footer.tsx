"use client";

import Link from "next/link";
import { useEffect } from "react";

export default function Footer() {
  useEffect(() => {
    // Tawk.to Live Chat (Optional: replace with your actual ID)
    const script = document.createElement("script");
    script.async = true;
    script.src = 'https://embed.tawk.to/65abcdef1234567890abcdef/1abcd2efg';
    script.charset = 'UTF-8';
    script.setAttribute('crossorigin', '*');
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <>
      <footer className="footer text-center">
        <div className="container">
          <div className="row">
            <div className="col-md-4 mb-3">
              <h5>BD TRIPPER</h5>
              <p>Your trusted visa processing partner.</p>
            </div>
            <div className="col-md-4 mb-3">
              <h5>Quick Links</h5>
              <ul className="list-unstyled">
                <li><Link href="/services" className="text-decoration-none">Visa Services</Link></li>
                <li><Link href="/solvency" className="text-decoration-none">Bank Solvency</Link></li>
              </ul>
            </div>
            <div className="col-md-4 mb-3">
              <h5>Follow Us</h5>
              <div className="social-icons">
                <a href="#"><i className="fab fa-facebook"></i></a>
                <a href="#"><i className="fab fa-instagram"></i></a>
                <a href="#"><i className="fab fa-whatsapp"></i></a>
              </div>
            </div>
          </div>
          <hr />
          <p className="mb-0">&copy; {new Date().getFullYear()} BD TRIPPER. All Rights Reserved.</p>
        </div>
      </footer>

      {/* Floating WhatsApp Button */}
      <a href="https://wa.me/8801753599539" className="whatsapp-float" target="_blank" rel="noopener noreferrer">
        <i className="fab fa-whatsapp"></i>
      </a>
    </>
  );
}
