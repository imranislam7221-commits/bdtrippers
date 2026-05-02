import Link from "next/link";

export default function Solvency() {
  return (
    <div className="container my-5">
      <div className="row justify-content-center">
        <div className="col-md-8 text-center">
          <h1 className="text-primary mb-4"><i className="fas fa-money-check"></i> Bank Solvency Support</h1>
          <p className="lead">Need to show proof of funds for your visa application? We've got you covered.</p>

          <div className="card shadow-lg border-primary mt-5">
            <div className="card-header bg-primary text-white">
              <h3 className="mb-0">Any Amount. Any Country.</h3>
            </div>
            <div className="card-body p-5">
              <p className="card-text fs-5">We provide legally compliant and verified bank solvency documents to meet the financial requirements of embassies worldwide.</p>

              <div className="row text-start mt-4">
                <div className="col-md-6 mb-3">
                  <h5><i className="fas fa-shield-alt text-primary"></i> 100% Genuine</h5>
                  <p>Verified documents directly from reputed financial institutions.</p>
                </div>
                <div className="col-md-6 mb-3">
                  <h5><i className="fas fa-bolt text-primary"></i> Fast Processing</h5>
                  <p>Get your documents ready within 24-48 hours of requirement submission.</p>
                </div>
              </div>

              <Link href="/contact" className="btn btn-primary btn-lg mt-3 w-100">Contact Us for a Quote</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
