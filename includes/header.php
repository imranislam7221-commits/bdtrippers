<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>BD TRIPPER - Visa & Travel Services</title>
    <!-- Bootstrap CSS -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet">
    <!-- Google Fonts for elevated typography -->
    <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,600;1,600&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap" rel="stylesheet">
    <!-- FontAwesome for Icons -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css">
    <!-- Custom CSS -->
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
    <script src="assets/js/auth.js"></script>
</head>
<body>
    <nav class="navbar navbar-expand-lg custom-navbar sticky-top shadow-sm">
        <div class="container d-flex justify-content-between">
            <a class="navbar-brand brand-logo" href="index.php">
                BD <span class="fw-light">TRIPPER</span>
            </a>

            <!-- Custom 3-dot Mobile Menu Button (Only shows on mobile) -->
            <button class="navbar-toggler border-0 shadow-none px-2 d-lg-none" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <i class="fa-solid fa-ellipsis-vertical fs-2"></i>
            </button>

            <!-- Navigation Links -->
            <div class="collapse navbar-collapse flex-grow-0" id="navbarNav">
                <ul class="navbar-nav align-items-center">
                    <li class="nav-item">
                        <a class="nav-link custom-link" href="index.php">Home</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link custom-link" href="services.php">Visa Services</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link custom-link" href="solvency.php">Bank Solvency</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link custom-link" href="admin_upload.php">Admin Panel</a>
                    </li>
                    <li class="nav-item ms-lg-2" id="auth-btn-container">
                        <button onclick="loginWithGoogle()" class="btn btn-primary rounded-pill px-4">
                            <i class="fab fa-google me-2"></i> Login
                        </button>
                    </li>
                    <li class="nav-item ms-lg-3 mt-3 mt-lg-0 w-100 w-lg-auto text-center">
                        <a class="btn custom-btn-white rounded-pill px-4" href="contact.php">Contact Us</a>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
    <script>
        auth.onAuthStateChanged(user => {
            const container = document.getElementById('auth-btn-container');
            if (user) {
                container.innerHTML = `
                    <div class="dropdown">
                        <button class="btn btn-outline-primary dropdown-toggle rounded-pill" type="button" data-bs-toggle="dropdown">
                            <img src="${user.photoURL}" width="25" class="rounded-circle me-1"> ${user.displayName.split(' ')[0]}
                        </button>
                        <ul class="dropdown-menu">
                            <li><a class="dropdown-item" href="dashboard.php">Dashboard</a></li>
                            <li><hr class="dropdown-divider"></li>
                            <li><a class="dropdown-item" href="#" onclick="logout()">Logout</a></li>
                        </ul>
                    </div>`;
            }
        });
    </script>