import Link from "next/link";

export default function Services() {
  return (
    <div className="container my-5">
      <h1 className="text-center text-primary mb-5">Our Visa Services</h1>

      {/* Work Visa */}
      <div className="row mb-5 align-items-center">
        <div className="col-md-6">
          <h2><i className="fas fa-briefcase text-primary"></i> Work Visa</h2>
          <p>We provide comprehensive support for work visas to any country. Our experts help you navigate the documentation, employment contracts, and application procedures to ensure a smooth transition to your new career abroad.</p>
          <ul className="list-group list-group-flush mb-3">
            <li className="list-group-item"><i className="fas fa-check text-success"></i> Document Verification</li>
            <li className="list-group-item"><i className="fas fa-check text-success"></i> Application Processing</li>
            <li className="list-group-item"><i className="fas fa-check text-success"></i> Interview Preparation</li>
          </ul>
        </div>
        <div className="col-md-6 text-center">
          <div className="p-5 bg-light rounded border border-primary">
            <h4>Supported Countries</h4>
            <p>USA, Canada, UK, Australia, Europe (Schengen), Middle East, and more.</p>
          </div>
        </div>
      </div>

      <hr />

      {/* Student Visa */}
      <div className="row my-5 align-items-center">
        <div className="col-md-6 order-md-2">
          <h2><i className="fas fa-user-graduate text-primary"></i> Student Visa</h2>
          <p>Achieve your educational dreams with our hassle-free student visa processing. We assist with university admissions, offer letters, and the entire visa application process for students aiming to study anywhere in the world.</p>
          <ul className="list-group list-group-flush mb-3">
            <li className="list-group-item"><i className="fas fa-check text-success"></i> Admission Assistance</li>
            <li className="list-group-item"><i className="fas fa-check text-success"></i> Financial Document Guidance</li>
          </ul>
        </div>
        <div className="col-md-6 order-md-1 text-center">
          <div className="p-5 bg-light rounded border border-primary">
            <h4>Study Destinations</h4>
            <p>Top universities in USA, UK, Canada, Australia, Germany, and more.</p>
          </div>
        </div>
      </div>

      <hr />

      {/* Medical Visa */}
      <div className="row mt-5 align-items-center">
        <div className="col-md-6">
          <h2><i className="fas fa-hospital text-primary"></i> Medical Visa</h2>
          <p>When health is a priority, we ensure fast-tracked medical visa processing. We coordinate with hospitals abroad and handle the paperwork so you can focus on treatment and recovery.</p>
        </div>
        <div className="col-md-6 text-center">
          <div className="p-5 bg-light rounded border border-primary">
            <h4>Medical Hubs</h4>
            <p>India, Singapore, Thailand, USA, UK, and more.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
