<?php include 'includes/header.php'; ?>

<!-- Hero Section -->
<section class="hero-section">
    <div class="container">
        <h2 class="welcome-text mb-2">Welcome Here</h2>
        <h1 class="display-4 fw-bold">Travel with Ease</h1>
        <p class="lead"><span class="hassle-text">Hassle</span>-free Visa Processing & Bank Solvency Support for Any Country.</p>
        <a href="services.php" class="btn btn-light btn-lg mt-3">Explore Services</a>
    </div>
</section>

<!-- Features Section -->
<section class="container my-5">
    <div class="row text-center">
        <div class="col-md-4 mb-4">
            <div class="card h-100 shadow-sm border-primary">
                <div class="card-body">
                    <i class="fas fa-passport fa-3x text-primary mb-3"></i>
                    <h3 class="card-title">Visa Processing</h3>
                    <p class="card-text">Work, Student, and Medical visas for any country worldwide.</p>
                    <a href="services.php" class="btn btn-outline-primary">Learn More</a>
                </div>
            </div>
        </div>
        <div class="col-md-4 mb-4">
            <div class="card h-100 shadow-sm border-primary">
                <div class="card-body">
                    <i class="fas fa-money-check-alt fa-3x text-primary mb-3"></i>
                    <h3 class="card-title">Bank Solvency</h3>
                    <p class="card-text">Bank solvency support for any required amount to secure your visa.</p>
                    <a href="solvency.php" class="btn btn-outline-primary">Learn More</a>
                </div>
            </div>
        </div>
        <div class="col-md-4 mb-4">
            <div class="card h-100 shadow-sm border-primary">
                <div class="card-body">
                    <i class="fas fa-headset fa-3x text-primary mb-3"></i>
                    <h3 class="card-title">24/7 Support</h3>
                    <p class="card-text">Live chat and dedicated support team ready to assist you anytime.</p>
                    <a href="contact.php" class="btn btn-outline-primary">Contact Us</a>
                </div>
            </div>
        </div>
    </div>
</section>

<!-- Visa Success Gallery -->
<section class="container my-5">
    <h2 class="text-center text-primary mb-4">Our Success Stories</h2>
    <div class="row" id="visa-gallery">
        <!-- Success stories will be loaded here from Firebase -->
        <div class="col-12 text-center">
            <div class="spinner-border text-primary" role="status">
                <span class="visually-hidden">Loading...</span>
            </div>
        </div>
    </div>
</section>

<script>
    async function loadSuccessStories() {
        const gallery = document.getElementById('visa-gallery');
        try {
            const querySnapshot = await db.collection('success_stories').orderBy('createdAt', 'desc').get();
            
            if (querySnapshot.empty) {
                gallery.innerHTML = '<div class="col-12 text-center"><p class="text-muted">No success stories found yet.</p></div>';
                return;
            }

            let html = '';
            querySnapshot.forEach(doc => {
                const data = doc.data();
                html += `
                <div class="col-md-4 mb-4">
                    <div class="card h-100 shadow-sm border-0" style="border-radius: 12px; overflow: hidden;">
                        <img src="${data.imageUrl}" class="card-img-top" alt="Visa Success" style="height: 250px; object-fit: cover;">
                        <div class="card-body p-2 text-center">
                            <span class="badge bg-primary px-3 py-2 rounded-pill">${data.caption}</span>
                        </div>
                    </div>
                </div>`;
            });
            gallery.innerHTML = html;
        } catch (error) {
            console.error("Error loading success stories:", error);
            gallery.innerHTML = '<div class="col-12 text-center text-danger">Failed to load success stories.</div>';
        }
    }

    // Load stories when page is ready
    window.addEventListener('load', loadSuccessStories);
</script>

<?php include 'includes/footer.php'; ?>
