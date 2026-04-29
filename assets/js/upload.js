async function uploadDocuments() {
    const user = auth.currentUser;
    if (!user) return;

    const passportFile = document.getElementById('passport-file').files[0];
    const photoFile = document.getElementById('photo-file').files[0];
    const statusDiv = document.getElementById('upload-status');
    const MAX_SIZE = 5 * 1024 * 1024; // 5MB

    if (!passportFile && !photoFile) {
        alert("Please select at least one file.");
        return;
    }

    // Check file sizes
    if (passportFile && passportFile.size > MAX_SIZE) {
        alert("Passport file is too big! Max limit 5MB.");
        return;
    }
    if (photoFile && photoFile.size > MAX_SIZE) {
        alert("Photo file is too big! Max limit 5MB.");
        return;
    }

    statusDiv.innerHTML = "Uploading...";

    const uploadFile = (file, type) => {
        return new Promise((resolve, reject) => {
            const ref = storage.ref(`documents/${user.uid}/${type}_${Date.now()}_${file.name}`);
            const uploadTask = ref.put(file);

            uploadTask.on('state_changed',
                (snapshot) => {
                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    statusDiv.innerHTML = `Uploading ${type}: ${Math.round(progress)}%`;
                },
                (error) => reject(error),
                () => resolve()
            );
        });
    };

    try {
        if (passportFile) {
            await uploadFile(passportFile, 'passport');
        }
        if (photoFile) {
            await uploadFile(photoFile, 'photo');
        }
        statusDiv.innerHTML = '<span class="text-success">Upload successful!</span>';
        alert("Documents uploaded successfully!");
    } catch (error) {
        let errorMsg = "Upload failed.";
        if (error.code === 'storage/unauthorized') {
            errorMsg = "No permission to upload.";
        } else if (error.code === 'storage/retry-limit-exceeded') {
            errorMsg = "Upload took too long, try again.";
        }
        statusDiv.innerHTML = `<span class="text-danger">${errorMsg}</span>`;
        console.error(error);
    }
}

async function createBooking() {
    const user = auth.currentUser;
    const dest = document.getElementById('destination').value;
    const date = document.getElementById('travel-date').value;
    const submitBtn = document.getElementById('booking-submit-btn');

    if (!dest || !date) {
        alert("Please fill in all fields.");
        return;
    }

    // Disable button and show loading state
    if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerText = "Submitting...";
    }

    try {
        await db.collection('bookings').add({
            uid: user.uid,
            destination: dest,
            travelDate: date,
            status: 'Pending',
            createdAt: firebase.firestore.FieldValue.serverTimestamp()
        });

        alert("Booking submitted!");
        loadBookings();

        // Clear fields
        document.getElementById('destination').value = '';
        document.getElementById('travel-date').value = '';
    } catch (error) {
        console.error("Error creating booking:", error);
        alert("Failed to submit booking. Please try again.");
    } finally {
        // Restore button state
        if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.innerText = "Submit Booking";
        }
    }
}

async function loadBookings() {
    const user = auth.currentUser;
    if (!user) return;

    // Note: A composite index (uid ASC, createdAt DESC) is required for this query
    const querySnapshot = await db.collection('bookings').where('uid', '==', user.uid).orderBy('createdAt', 'desc').get();
    const list = document.getElementById('booking-list');

    if (querySnapshot.empty) {
        list.innerHTML = '<p class="text-muted">No bookings found.</p>';
        return;
    }

    let html = '<table class="table"><thead><tr><th>Destination</th><th>Date</th><th>Status</th></tr></thead><tbody>';
    querySnapshot.forEach(doc => {
        const data = doc.data();
        html += `<tr><td>${data.destination}</td><td>${data.travelDate}</td><td><span class="badge bg-warning text-dark">${data.status}</span></td></tr>`;
    });
    html += '</tbody></table>';
    list.innerHTML = html;
}
