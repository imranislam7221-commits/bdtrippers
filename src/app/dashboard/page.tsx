"use client";

import { useEffect, useState } from "react";
import { auth, db, storage } from "@/lib/firebase";
import { onAuthStateChanged, User, signOut } from "firebase/auth";
import { collection, addDoc, query, where, orderBy, getDocs, serverTimestamp } from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface Booking {
  id: string;
  destination: string;
  travelDate: string;
  status: string;
}

export default function Dashboard() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [destination, setDestination] = useState("");
  const [travelDate, setTravelDate] = useState("");
  const [uploadStatus, setUploadStatus] = useState("");
  const [bookingLoading, setBookingLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (!currentUser) {
        router.push("/");
      } else {
        setUser(currentUser);
        loadBookings(currentUser.uid);
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, [router]);

  async function loadBookings(uid: string) {
    try {
      const q = query(
        collection(db, 'bookings'),
        where('uid', '==', uid),
        orderBy('createdAt', 'desc')
      );
      const querySnapshot = await getDocs(q);
      const fetchedBookings: Booking[] = [];
      querySnapshot.forEach(doc => {
        fetchedBookings.push({ id: doc.id, ...doc.data() } as Booking);
      });
      setBookings(fetchedBookings);
    } catch (error) {
      console.error("Error loading bookings:", error);
    }
  }

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    const passportInput = document.getElementById('passport-file') as HTMLInputElement;
    const photoInput = document.getElementById('photo-file') as HTMLInputElement;
    const passportFile = passportInput.files?.[0];
    const photoFile = photoInput.files?.[0];

    if (!passportFile && !photoFile) {
      alert("Please select at least one file.");
      return;
    }

    setUploadStatus("Uploading...");

    const uploadFile = (file: File, type: string) => {
      return new Promise<string>((resolve, reject) => {
        const fileName = `${type}_${Date.now()}_${file.name}`;
        const storageRef = ref(storage, `documents/${user.uid}/${fileName}`);
        const uploadTask = uploadBytesResumable(storageRef, file);

        uploadTask.on('state_changed',
          (snapshot) => {
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            setUploadStatus(`Uploading ${type}: ${Math.round(progress)}%`);
          },
          (error) => reject(error),
          async () => {
            const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
            resolve(downloadURL);
          }
        );
      });
    };

    try {
      const urls: { type: string; url: string }[] = [];
      if (passportFile) {
        const url = await uploadFile(passportFile, 'passport');
        urls.push({ type: 'passport', url });
      }
      if (photoFile) {
        const url = await uploadFile(photoFile, 'photo');
        urls.push({ type: 'photo', url });
      }

      for (const item of urls) {
        await addDoc(collection(db, 'user_uploads'), {
          uid: user.uid,
          userName: user.displayName || "Anonymous",
          userEmail: user.email,
          fileUrl: item.url,
          fileType: item.type,
          createdAt: serverTimestamp()
        });
      }

      setUploadStatus("Upload successful!");
      alert("Documents uploaded successfully!");
    } catch (error: any) {
      console.error("Upload error:", error);
      setUploadStatus(`Error: ${error.message}`);
    }
  };

  const createBooking = async () => {
    if (!user || !destination || !travelDate) {
      alert("Please fill in all fields.");
      return;
    }

    setBookingLoading(true);
    try {
      await addDoc(collection(db, 'bookings'), {
        uid: user.uid,
        destination,
        travelDate,
        status: 'Pending',
        createdAt: serverTimestamp()
      });

      alert("Booking submitted successfully!");
      setDestination("");
      setTravelDate("");
      loadBookings(user.uid);
    } catch (error) {
      console.error("Error creating booking:", error);
      alert("Failed to submit booking.");
    } finally {
      setBookingLoading(false);
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
    router.push("/");
  };

  if (loading) return (
    <div className="container mt-5 text-center py-5">
      <div className="spinner-border text-primary" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );
  
  if (!user) return null;

  return (
    <div className="container-fluid py-5 bg-light" style={{ minHeight: '90vh' }}>
      <div className="container">
        {/* Dashboard Header */}
        <div className="d-flex justify-content-between align-items-center mb-5">
          <div>
            <h1 className="fw-bold mb-0">Welcome, {user.displayName?.split(' ')[0]}! 👋</h1>
            <p className="text-muted">Manage your visa applications and documents.</p>
          </div>
          <button onClick={handleLogout} className="btn btn-outline-danger rounded-pill px-4">
            <i className="fas fa-sign-out-alt me-2"></i>Logout
          </button>
        </div>

        <div className="row g-4">
          {/* Sidebar / Profile Card */}
          <div className="col-lg-4">
            <div className="card shadow-sm border-0 text-center p-4 mb-4" style={{ borderRadius: '24px' }}>
              <div className="position-relative d-inline-block mx-auto mb-3">
                {user.photoURL ? (
                  <img src={user.photoURL} className="rounded-circle border border-4 border-white shadow-sm" width="120" height="120" alt={user.displayName || "User"} style={{ objectFit: 'cover' }} />
                ) : (
                  <div className="rounded-circle bg-primary text-white d-flex align-items-center justify-content-center mx-auto shadow-sm" style={{ width: '120px', height: '120px', fontSize: '40px' }}>
                    {user.displayName?.charAt(0) || "U"}
                  </div>
                )}
                <span className="position-absolute bottom-0 end-0 bg-success border border-2 border-white rounded-circle" style={{ width: '20px', height: '20px' }}></span>
              </div>
              <h3 className="fw-bold h4 mb-1">{user.displayName}</h3>
              <p className="text-muted small mb-3">{user.email}</p>
              <hr />
              <div className="row text-center mt-3">
                <div className="col-6">
                  <div className="fw-bold text-primary">{bookings.length}</div>
                  <div className="small text-muted">Bookings</div>
                </div>
                <div className="col-6">
                  <div className="fw-bold text-primary">0</div>
                  <div className="small text-muted">Messages</div>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="card shadow-sm border-0 p-4" style={{ borderRadius: '24px' }}>
              <h5 className="fw-bold mb-3">Quick Actions</h5>
              <Link href="/services" className="btn btn-light w-100 text-start mb-2 rounded-3 border">
                <i className="fas fa-passport text-primary me-2"></i> Visa Requirements
              </Link>
              <Link href="/solvency" className="btn btn-light w-100 text-start rounded-3 border">
                <i className="fas fa-calculator text-primary me-2"></i> Solvency Calculator
              </Link>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="col-lg-8">
            <div className="row g-4">
              {/* Document Upload */}
              <div className="col-12">
                <div className="card shadow-sm border-0 p-4" style={{ borderRadius: '24px' }}>
                  <h5 className="fw-bold mb-4"><i className="fas fa-cloud-upload-alt text-primary me-2"></i>Upload Documents</h5>
                  <form onSubmit={handleUpload}>
                    <div className="row g-3">
                      <div className="col-md-6">
                        <label className="form-label small fw-bold text-muted text-uppercase">Passport Copy</label>
                        <input type="file" id="passport-file" className="form-control" accept="image/*,.pdf" style={{ borderRadius: '12px' }} />
                      </div>
                      <div className="col-md-6">
                        <label className="form-label small fw-bold text-muted text-uppercase">Personal Photo</label>
                        <input type="file" id="photo-file" className="form-control" accept="image/*" style={{ borderRadius: '12px' }} />
                      </div>
                      <div className="col-12">
                        <button type="submit" className="btn btn-primary px-4 py-2 rounded-pill shadow-sm">
                          Upload Now
                        </button>
                        <span className="ms-3 text-info small fw-bold">{uploadStatus}</span>
                      </div>
                    </div>
                  </form>
                </div>
              </div>

              {/* New Booking Form */}
              <div className="col-12">
                <div className="card shadow-sm border-0 p-4" style={{ borderRadius: '24px' }}>
                  <h5 className="fw-bold mb-4"><i className="fas fa-plus-circle text-primary me-2"></i>Start New Application</h5>
                  <div className="row g-3">
                    <div className="col-md-6">
                      <label className="form-label small fw-bold text-muted text-uppercase">Destination</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="e.g. United Kingdom"
                        value={destination}
                        onChange={(e) => setDestination(e.target.value)}
                        style={{ borderRadius: '12px' }}
                      />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label small fw-bold text-muted text-uppercase">Expected Date</label>
                      <input
                        type="date"
                        className="form-control"
                        value={travelDate}
                        onChange={(e) => setTravelDate(e.target.value)}
                        style={{ borderRadius: '12px' }}
                      />
                    </div>
                    <div className="col-12">
                      <button
                        onClick={createBooking}
                        className="btn btn-primary px-4 py-2 rounded-pill shadow-sm"
                        disabled={bookingLoading}
                      >
                        {bookingLoading ? "Submitting..." : "Submit Application"}
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Booking List */}
              <div className="col-12">
                <div className="card shadow-sm border-0 p-4" style={{ borderRadius: '24px' }}>
                  <h5 className="fw-bold mb-4"><i className="fas fa-list text-primary me-2"></i>Your Applications</h5>
                  {bookings.length > 0 ? (
                    <div className="table-responsive">
                      <table className="table table-hover align-middle">
                        <thead className="table-light">
                          <tr>
                            <th className="border-0" style={{ borderRadius: '12px 0 0 12px' }}>Destination</th>
                            <th className="border-0">Applied Date</th>
                            <th className="border-0" style={{ borderRadius: '0 12px 12px 0' }}>Status</th>
                          </tr>
                        </thead>
                        <tbody>
                          {bookings.map(booking => (
                            <tr key={booking.id}>
                              <td className="fw-bold">{booking.destination}</td>
                              <td className="text-muted">{booking.travelDate}</td>
                              <td>
                                <span className={`badge rounded-pill px-3 py-2 ${
                                  booking.status === 'Pending' ? 'bg-warning text-dark' : 
                                  booking.status === 'Approved' ? 'bg-success' : 'bg-info'
                                }`}>
                                  {booking.status}
                                </span>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  ) : (
                    <div className="text-center py-4 text-muted">
                      <i className="fas fa-folder-open fa-3x mb-3 opacity-25"></i>
                      <p>You haven't submitted any applications yet.</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
