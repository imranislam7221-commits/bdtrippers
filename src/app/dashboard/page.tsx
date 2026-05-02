"use client";

import { useEffect, useState } from "react";
import { auth, db, storage } from "@/lib/firebase";
import { onAuthStateChanged, User } from "firebase/auth";
import { collection, addDoc, query, where, orderBy, getDocs, serverTimestamp } from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { useRouter } from "next/navigation";

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

      // Save references to Firestore
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
      alert("Documents uploaded and saved successfully!");
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

      alert("Booking submitted!");
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

  if (loading) return <div className="container mt-5 text-center">Loading...</div>;
  if (!user) return null;

  return (
    <div className="container my-5">
      <div className="row">
        <div className="col-md-4">
          <div className="card shadow-sm mb-4">
            <div className="card-body text-center">
              {user.photoURL && (
                <img src={user.photoURL} className="rounded-circle mb-3" width="100" alt={user.displayName || "User"} />
              )}
              <h3>{user.displayName}</h3>
              <p className="text-muted">{user.email}</p>
            </div>
          </div>
        </div>
        <div className="col-md-8">
          <div className="card shadow-sm mb-4">
            <div className="card-header bg-primary text-white">Upload Documents</div>
            <div className="card-body">
              <form onSubmit={handleUpload}>
                <div className="mb-3">
                  <label className="form-label">Passport Copy</label>
                  <input type="file" id="passport-file" className="form-control" accept="image/*,.pdf" />
                </div>
                <div className="mb-3">
                  <label className="form-label">Personal Photo</label>
                  <input type="file" id="photo-file" className="form-control" accept="image/*" />
                </div>
                <button type="submit" className="btn btn-primary">Upload All</button>
                <div className="mt-2">{uploadStatus}</div>
              </form>
            </div>
          </div>

          <div className="card shadow-sm mb-4">
            <div className="card-header bg-info text-white">New Booking</div>
            <div className="card-body">
              <div className="row g-3">
                <div className="col-md-6">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Destination Country"
                    value={destination}
                    onChange={(e) => setDestination(e.target.value)}
                  />
                </div>
                <div className="col-md-6">
                  <input
                    type="date"
                    className="form-control"
                    value={travelDate}
                    onChange={(e) => setTravelDate(e.target.value)}
                  />
                </div>
                <div className="col-12">
                  <button
                    onClick={createBooking}
                    className="btn btn-info text-white w-100"
                    disabled={bookingLoading}
                  >
                    {bookingLoading ? "Submitting..." : "Submit Booking"}
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="card shadow-sm">
            <div className="card-header bg-success text-white">Booking Status</div>
            <div className="card-body">
              {bookings.length > 0 ? (
                <table className="table">
                  <thead>
                    <tr>
                      <th>Destination</th>
                      <th>Date</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {bookings.map(booking => (
                      <tr key={booking.id}>
                        <td>{booking.destination}</td>
                        <td>{booking.travelDate}</td>
                        <td><span className="badge bg-warning text-dark">{booking.status}</span></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <p className="text-muted">No bookings found.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
