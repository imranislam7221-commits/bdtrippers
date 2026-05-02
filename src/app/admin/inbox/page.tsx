"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { db } from "@/lib/firebase";
import { collection, query, orderBy, getDocs, doc, updateDoc, deleteDoc } from "firebase/firestore";

interface Inquiry {
  id: string;
  name: string;
  email: string;
  message: string;
  createdAt: any;
}

interface Booking {
  id: string;
  uid: string;
  destination: string;
  travelDate: string;
  status: string;
  createdAt: any;
}

interface UserUpload {
  id: string;
  uid: string;
  userName: string;
  userEmail: string;
  fileUrl: string;
  fileType: string;
  createdAt: any;
}

export default function AdminInbox() {
  const [password, setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeTab, setActiveTab] = useState("inquiries");
  
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [uploads, setUploads] = useState<UserUpload[]>([]);
  const [loading, setLoading] = useState(false);

  const correctPass = "siam123";

  const handleLogin = () => {
    if (password === correctPass) {
      setIsLoggedIn(true);
      loadData();
    } else {
      alert("Incorrect Password!");
    }
  };

  const loadData = async () => {
    setLoading(true);
    try {
      // Load Inquiries
      const inquiriesQ = query(collection(db, 'inquiries'), orderBy('createdAt', 'desc'));
      const inquiriesSnapshot = await getDocs(inquiriesQ);
      setInquiries(inquiriesSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Inquiry)));

      // Load Bookings
      const bookingsQ = query(collection(db, 'bookings'), orderBy('createdAt', 'desc'));
      const bookingsSnapshot = await getDocs(bookingsQ);
      setBookings(bookingsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Booking)));

      // Load Uploads
      const uploadsQ = query(collection(db, 'user_uploads'), orderBy('createdAt', 'desc'));
      const uploadsSnapshot = await getDocs(uploadsQ);
      setUploads(uploadsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as UserUpload)));

    } catch (error) {
      console.error("Error loading admin data:", error);
    } finally {
      setLoading(false);
    }
  };

  const updateBookingStatus = async (bookingId: string, newStatus: string) => {
    try {
      await updateDoc(doc(db, 'bookings', bookingId), { status: newStatus });
      setBookings(bookings.map(b => b.id === bookingId ? { ...b, status: newStatus } : b));
    } catch (error) {
      alert("Failed to update status");
    }
  };

  const deleteItem = async (collectionName: string, id: string) => {
    if (!confirm("Are you sure you want to delete this item?")) return;
    try {
      await deleteDoc(doc(db, collectionName, id));
      if (collectionName === 'inquiries') setInquiries(inquiries.filter(i => i.id !== id));
      if (collectionName === 'bookings') setBookings(bookings.filter(b => b.id !== id));
      if (collectionName === 'user_uploads') setUploads(uploads.filter(u => u.id !== id));
    } catch (error) {
      alert("Failed to delete item");
    }
  };

  if (!isLoggedIn) {
    return (
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-md-4">
            <div className="card shadow-sm border-0" style={{ borderRadius: '15px' }}>
              <div className="card-header bg-primary text-white text-center py-3">
                <h4 className="m-0 fw-bold">Admin Inbox Login</h4>
              </div>
              <div className="card-body p-4">
                <input
                  type="password"
                  className="form-control mb-3"
                  placeholder="Enter admin password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleLogin()}
                />
                <button onClick={handleLogin} className="btn btn-primary w-100 fw-bold">Login</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container my-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="text-primary fw-bold">Admin Inbox</h1>
        <div>
          <Link href="/admin/upload" className="btn btn-outline-primary me-2">Upload Gallery</Link>
          <button onClick={loadData} className="btn btn-light" disabled={loading}>
            <i className={`fas fa-sync-alt ${loading ? 'fa-spin' : ''}`}></i> Refresh
          </button>
        </div>
      </div>

      <ul className="nav nav-pills mb-4">
        <li className="nav-item">
          <button className={`nav-link ${activeTab === 'inquiries' ? 'active' : ''}`} onClick={() => setActiveTab('inquiries')}>
            Inquiries <span className="badge bg-light text-primary ms-1">{inquiries.length}</span>
          </button>
        </li>
        <li className="nav-item">
          <button className={`nav-link ${activeTab === 'bookings' ? 'active' : ''}`} onClick={() => setActiveTab('bookings')}>
            Bookings <span className="badge bg-light text-primary ms-1">{bookings.length}</span>
          </button>
        </li>
        <li className="nav-item">
          <button className={`nav-link ${activeTab === 'uploads' ? 'active' : ''}`} onClick={() => setActiveTab('uploads')}>
            User Uploads <span className="badge bg-light text-primary ms-1">{uploads.length}</span>
          </button>
        </li>
      </ul>

      <div className="card shadow-sm border-0">
        <div className="card-body p-0">
          {activeTab === 'inquiries' && (
            <div className="table-responsive">
              <table className="table table-hover mb-0">
                <thead className="table-light">
                  <tr>
                    <th>Date</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Message</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {inquiries.map(item => (
                    <tr key={item.id}>
                      <td className="small">{item.createdAt?.toDate().toLocaleDateString()}</td>
                      <td className="fw-bold">{item.name}</td>
                      <td>{item.email}</td>
                      <td>{item.message}</td>
                      <td>
                        <button onClick={() => deleteItem('inquiries', item.id)} className="btn btn-sm btn-outline-danger">
                          <i className="fas fa-trash"></i>
                        </button>
                      </td>
                    </tr>
                  ))}
                  {inquiries.length === 0 && <tr><td colSpan={5} className="text-center py-4 text-muted">No inquiries found</td></tr>}
                </tbody>
              </table>
            </div>
          )}

          {activeTab === 'bookings' && (
            <div className="table-responsive">
              <table className="table table-hover mb-0">
                <thead className="table-light">
                  <tr>
                    <th>Date</th>
                    <th>Destination</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {bookings.map(item => (
                    <tr key={item.id}>
                      <td className="small">{item.createdAt?.toDate().toLocaleDateString()}</td>
                      <td className="fw-bold">{item.destination}</td>
                      <td>
                        <select 
                          className={`form-select form-select-sm badge ${item.status === 'Approved' ? 'bg-success' : item.status === 'Rejected' ? 'bg-danger' : 'bg-warning text-dark'}`}
                          value={item.status}
                          onChange={(e) => updateBookingStatus(item.id, e.target.value)}
                        >
                          <option value="Pending">Pending</option>
                          <option value="Approved">Approved</option>
                          <option value="Rejected">Rejected</option>
                        </select>
                      </td>
                      <td>
                        <button onClick={() => deleteItem('bookings', item.id)} className="btn btn-sm btn-outline-danger">
                          <i className="fas fa-trash"></i>
                        </button>
                      </td>
                    </tr>
                  ))}
                  {bookings.length === 0 && <tr><td colSpan={4} className="text-center py-4 text-muted">No bookings found</td></tr>}
                </tbody>
              </table>
            </div>
          )}

          {activeTab === 'uploads' && (
            <div className="table-responsive">
              <table className="table table-hover mb-0">
                <thead className="table-light">
                  <tr>
                    <th>Date</th>
                    <th>User</th>
                    <th>Type</th>
                    <th>File</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {uploads.map(item => (
                    <tr key={item.id}>
                      <td className="small">{item.createdAt?.toDate().toLocaleDateString()}</td>
                      <td>
                        <div className="fw-bold">{item.userName}</div>
                        <div className="smallest text-muted">{item.userEmail}</div>
                      </td>
                      <td><span className="badge bg-info">{item.fileType}</span></td>
                      <td>
                        <a href={item.fileUrl} target="_blank" rel="noopener noreferrer" className="btn btn-sm btn-primary">
                          <i className="fas fa-external-link-alt me-1"></i> View File
                        </a>
                      </td>
                      <td>
                        <button onClick={() => deleteItem('user_uploads', item.id)} className="btn btn-sm btn-outline-danger">
                          <i className="fas fa-trash"></i>
                        </button>
                      </td>
                    </tr>
                  ))}
                  {uploads.length === 0 && <tr><td colSpan={5} className="text-center py-4 text-muted">No user uploads found</td></tr>}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
