<?php
$password = "siam123"; // Simple password
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Admin - Upload Visa Success</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet">
    <link rel="stylesheet" href="assets/css/style.css">
    <!-- Firebase SDKs -->
    <script src="https://www.gstatic.com/firebasejs/10.7.1/firebase-app-compat.js"></script>
    <script src="https://www.gstatic.com/firebasejs/10.7.1/firebase-auth-compat.js"></script>
    <script src="https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore-compat.js"></script>
    <script src="https://www.gstatic.com/firebasejs/10.7.1/firebase-storage-compat.js"></script>
    <script src="assets/js/firebase-config.js"></script>
    <script>
      firebase.initializeApp(firebaseConfig);
      const auth = firebase.auth();
      const db = firebase.firestore();
      const storage = firebase.storage();
    </script>
</head>
<body class="bg-light">
    <div class="container mt-5">
        <div class="row justify-content-center">
            <div class="col-md-6">
                <div class="card shadow border-0" style="border-radius: 15px;">
                    <div class="card-header bg-primary text-white text-center py-3" style="border-radius: 15px 15px 0 0;">
                        <h4 class="m-0 fw-bold">Upload Success Photo</h4>
                    </div>
                    <div class="card-body p-4">
                        <div id="status-msg"></div>

                        <!-- Password Login -->
                        <div id="login-section">
                            <div class="mb-3">
                                <label class="form-label fw-bold">Admin Password</label>
                                <input type="password" id="admin-pass" class="form-control" placeholder="Enter password">
                            </div>
                            <button onclick="checkPass()" class="btn btn-primary w-100 fw-bold py-2">Login to Admin</button>
                        </div>

                        <!-- Upload Form (Hidden by default) -->
                        <div id="upload-section" style="display: none;">
                            <div class="mb-3">
                                <label class="form-label fw-bold">Select Visa Photo</label>
                                <input type="file" id="visa-photo" class="form-control" accept="image/*">
                            </div>
                            <div class="mb-3">
                                <label class="form-label fw-bold">Caption (e.g. USA Student Visa)</label>
                                <input type="text" id="visa-caption" class="form-control" placeholder="Enter caption">
                            </div>
                            <button id="upload-btn" onclick="uploadToFirebase()" class="btn btn-success w-100 fw-bold py-2">
                                <i class="fas fa-cloud-upload-alt me-1"></i> Upload to Firebase
                            </button>
                            <div class="progress mt-3" style="display: none;" id="progress-container">
                                <div id="upload-progress" class="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" style="width: 0%"></div>
                            </div>
                        </div>

                        <div class="text-center mt-3">
                            <a href="index.php" class="btn btn-link text-decoration-none text-muted">Back to Website</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <script>
        const correctPass = "<?php echo $password; ?>";

        function checkPass() {
            const inputPass = document.getElementById('admin-pass').value;
            if (inputPass === correctPass) {
                document.getElementById('login-section').style.display = 'none';
                document.getElementById('upload-section').style.display = 'block';
                document.getElementById('status-msg').innerHTML = '<div class="alert alert-info">Welcome, Admin!</div>';
            } else {
                alert("Incorrect Password!");
            }
        }

        async function uploadToFirebase() {
            const file = document.getElementById('visa-photo').files[0];
            const caption = document.getElementById('visa-caption').value;
            const statusMsg = document.getElementById('status-msg');
            const uploadBtn = document.getElementById('upload-btn');
            const progressContainer = document.getElementById('progress-container');
            const progressBar = document.getElementById('upload-progress');

            if (!file || !caption) {
                alert("Please select a file and enter a caption.");
                return;
            }

            uploadBtn.disabled = true;
            uploadBtn.innerText = "Processing...";
            progressContainer.style.display = 'block';

            try {
                // 1. Upload Image to Firebase Storage
                const fileName = Date.now() + "_" + file.name;
                const storageRef = storage.ref('success_stories/' + fileName);
                const uploadTask = storageRef.put(file);

                uploadTask.on('state_changed', 
                    (snapshot) => {
                        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                        progressBar.style.width = progress + '%';
                        uploadBtn.innerText = `Uploading... ${Math.round(progress)}%`;
                    }, 
                    (error) => { throw error; }, 
                    async () => {
                        // 2. Get Download URL
                        const downloadURL = await uploadTask.snapshot.ref.getDownloadURL();

                        // 3. Save to Firestore
                        await db.collection('success_stories').add({
                            imageUrl: downloadURL,
                            caption: caption,
                            createdAt: firebase.firestore.FieldValue.serverTimestamp()
                        });

                        statusMsg.innerHTML = '<div class="alert alert-success">Success! Photo uploaded and saved permanently.</div>';
                        uploadBtn.disabled = false;
                        uploadBtn.innerText = "Upload to Firebase";
                        progressBar.style.width = '0%';
                        progressContainer.style.display = 'none';
                        document.getElementById('visa-photo').value = '';
                        document.getElementById('visa-caption').value = '';
                    }
                );

            } catch (error) {
                console.error("Upload failed:", error);
                statusMsg.innerHTML = `<div class="alert alert-danger">Error: ${error.message}</div>`;
                uploadBtn.disabled = false;
                uploadBtn.innerText = "Upload to Firebase";
            }
        }
    </script>
</body>
</html>
