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
              <p className="small mb-0"><i className="fas fa-map-marker-alt me-1"></i> 10/2, Gawsia Kashem Center (4th floor), Arambagh Culvert Road, Motijheel, Dhaka-1000, Bangladesh</p>
              <p className="small mb-0"><i className="fas fa-phone me-1"></i> +880 1735-182024</p>
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
              <div className="social-icons d-inline-flex flex-column align-items-start text-start">
                <a href="https://www.facebook.com/bdtrippersltd" target="_blank" rel="noopener noreferrer" className="text-decoration-none">
                  <i className="fab fa-facebook me-2" style={{ width: '24px', textAlign: 'center' }}></i> <span className="small">BD Trippers</span>
                </a>
                <a href="https://www.facebook.com/share/18HxJeEAZV/" target="_blank" rel="noopener noreferrer" className="text-decoration-none">
                  <i className="fab fa-facebook me-2" style={{ width: '24px', textAlign: 'center' }}></i> <span className="small">Bank Solvency Support</span>
                </a>
                <a href="https://wa.me/8801735182024" target="_blank" rel="noopener noreferrer" className="text-decoration-none">
                  <i className="fab fa-whatsapp me-2" style={{ width: '24px', textAlign: 'center' }}></i> <span className="small">WhatsApp Support</span>
                </a>
                <a href="#" className="text-decoration-none">
                  <i className="fab fa-instagram me-2" style={{ width: '24px', textAlign: 'center' }}></i> <span className="small">Instagram Page</span>
                </a>
              </div>
            </div>
          </div>
          <hr />
          <p className="mb-0">&copy; {new Date().getFullYear()} BD TRIPPER. All Rights Reserved.</p>
        </div>
      </footer>

      {/* Floating WhatsApp Button */}
      <a href="https://wa.me/8801735182024" className="whatsapp-float" target="_blank" rel="noopener noreferrer">
        <i className="fab fa-whatsapp"></i>
      </a>
    </>
  );
}
