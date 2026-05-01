<?php include 'includes/header.php'; ?>

<!-- Hero Section -->
<section class="hero-section">
    <div class="container animate-fade-up">
        <span class="welcome-text">Your Trusted Travel Partner</span>
        <h1 class="display-3 fw-bold">Simplifying Your Global <br class="d-none d-lg-block"> Journey Today</h1>
        <p class="lead">Premium Visa Processing & Bank Solvency Support tailored for your dreams. Fast, reliable, and transparent.</p>
        <div class="d-flex gap-3 justify-content-center mt-4">
            <a href="services.php" class="btn btn-light btn-lg rounded-pill px-4 fw-600">Explore Services</a>
            <a href="contact.php" class="btn btn-outline-light btn-lg rounded-pill px-4">Contact Us</a>
        </div>
    </div>
</section>

<!-- Features/Services Section -->
<section class="bg-light">
    <div class="container">
        <div class="text-center mb-5 animate-fade-up">
            <h2 class="display-5 fw-bold text-primary">Our Core Expertise</h2>
            <p class="text-muted">High-quality support for all your immigration and travel needs.</p>
        </div>
        <div class="row g-4">
            <div class="col-md-4 animate-fade-up" style="animation-delay: 0.1s;">
                <div class="modern-card text-center">
                    <i class="fas fa-passport fa-3x text-primary"></i>
                    <h3 class="fw-bold h4">Visa Processing</h3>
                    <p class="text-muted">Expert assistance for Work, Student, and Medical visas globally.</p>
                    <a href="services.php" class="text-primary text-decoration-none fw-bold">Learn More <i class="fas fa-arrow-right ms-1"></i></a>
                </div>
            </div>
            <div class="col-md-4 animate-fade-up" style="animation-delay: 0.2s;">
                <div class="modern-card text-center">
                    <i class="fas fa-money-check-alt fa-3x text-primary"></i>
                    <h3 class="fw-bold h4">Bank Solvency</h3>
                    <p class="text-muted">Reliable financial documentation support to secure your visa approval.</p>
                    <a href="solvency.php" class="text-primary text-decoration-none fw-bold">Learn More <i class="fas fa-arrow-right ms-1"></i></a>
                </div>
            </div>
            <div class="col-md-4 animate-fade-up" style="animation-delay: 0.3s;">
                <div class="modern-card text-center">
                    <i class="fas fa-headset fa-3x text-primary"></i>
                    <h3 class="fw-bold h4">Consultancy</h3>
                    <p class="text-muted">Dedicated 24/7 expert guidance for all your travel-related queries.</p>
                    <a href="contact.php" class="text-primary text-decoration-none fw-bold">Get in Touch <i class="fas fa-arrow-right ms-1"></i></a>
                </div>
            </div>
        </div>
    </div>
</section>

<!-- Visa Success Gallery -->
<section class="container">
    <div class="text-center mb-5">
        <h2 class="display-5 fw-bold text-primary">Our Success Stories</h2>
        <p class="text-muted">Join hundreds of satisfied travelers who achieved their dreams with us.</p>
    </div>
    <div class="row g-4">
        <?php
        $json_file = 'includes/visas.json';
        if (file_exists($json_file)) {
            $visas = json_decode(file_get_contents($json_file), true) ?? [];
            foreach (array_reverse($visas) as $visa) {
                echo '
                <div class="col-md-4">
                    <div class="gallery-card">
                        <img src="assets/images/visas/' . $visa['file'] . '" class="w-100" alt="Visa Success">
                        <div class="p-3 text-center bg-white">
                            <h5 class="fw-bold m-0">' . $visa['caption'] . '</h5>
                        </div>
                    </div>
                </div>';
            }
        }
        ?>
    </div>
</section>

<?php include 'includes/footer.php'; ?>
