<?php include 'includes/header.php'; ?>

<div class="container my-5" id="dashboard-content" style="display: none;">
    <div class="row">
        <div class="col-md-4">
            <div class="card shadow-sm mb-4">
                <div class="card-body text-center">
                    <img id="user-photo" src="" class="rounded-circle mb-3" width="100">
                    <h3 id="user-name"></h3>
                    <p id="user-email" class="text-muted"></p>
                </div>
            </div>
        </div>
        <div class="col-md-8">
            <div class="card shadow-sm mb-4">
                <div class="card-header bg-primary text-white">Upload Documents</div>
                <div class="card-body">
                    <div id="upload-form">
                        <div class="mb-3">
                            <label class="form-label">Passport Copy</label>
                            <input type="file" id="passport-file" class="form-control" accept="image/*,.pdf">
                        </div>
                        <div class="mb-3">
                            <label class="form-label">Personal Photo</label>
                            <input type="file" id="photo-file" class="form-control" accept="image/*">
                        </div>
                        <button onclick="uploadDocuments()" class="btn btn-primary">Upload All</button>
                        <div id="upload-status" class="mt-2"></div>
                    </div>
                </div>
            </div>

            <div class="card shadow-sm mb-4">
                <div class="card-header bg-info text-white">New Booking</div>
                <div class="card-body">
                    <div class="row g-3">
                        <div class="col-md-6">
                            <input type="text" id="destination" class="form-control" placeholder="Destination Country">
                        </div>
                        <div class="col-md-6">
                            <input type="date" id="travel-date" class="form-control">
                        </div>
                        <div class="col-12">
                            <button onclick="createBooking()" class="btn btn-info text-white w-100">Submit Booking</button>
                        </div>
                    </div>
                </div>
            </div>

            <div class="card shadow-sm">
                <div class="card-header bg-success text-white">Booking Status</div>
                <div class="card-body" id="booking-list">
                    <p class="text-muted">No bookings found.</p>
                </div>
            </div>
        </div>
    </div>
</div>

<script src="assets/js/upload.js"></script>
<script>
    auth.onAuthStateChanged(user => {
        if (!user) {
            window.location.href = 'index.php';
        } else {
            document.getElementById('dashboard-content').style.display = 'block';
            document.getElementById('user-photo').src = user.photoURL;
            document.getElementById('user-name').innerText = user.displayName;
            document.getElementById('user-email').innerText = user.email;
            loadBookings();
        }
    });
</script>

<?php include 'includes/footer.php'; ?>
