import Link from "next/link";

export default function Solvency() {
  return (
    <div className="container my-5">
      <div className="row justify-content-center">
        <div className="col-md-10 text-center">
          <h1 className="text-primary mb-4 fw-bold"><i className="fas fa-money-check-alt me-2"></i>Bank Solvency Support</h1>
          <p className="lead text-muted mb-5">Professional and verified bank solvency documents to secure your global journey.</p>

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
                <Link href="/contact" className="btn btn-primary btn-lg rounded-pill px-5">Contact Us for a Quote</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
