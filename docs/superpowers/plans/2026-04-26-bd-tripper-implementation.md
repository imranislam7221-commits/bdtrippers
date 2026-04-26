# BD TRIPPER Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a simple, beginner-friendly visa processing and travel agency website using HTML, CSS (Bootstrap 5), and PHP includes.

**Architecture:** A multi-page site utilizing `header.php` and `footer.php` to share common UI elements (navigation, live chat, social media links). Forms will submit via basic PHP.

**Tech Stack:** HTML5, CSS3, Bootstrap 5 (CDN), PHP, Tawk.to/Tidio Live Chat snippet.

---

### Task 1: Setup Directory Structure and Assets

**Files:**
- Create: `assets/css/style.css`
- Create: `assets/js/script.js`
- Create: `assets/images/placeholder.txt`

- [ ] **Step 1: Create directories**
```bash
mkdir -p /data/data/com.termux/files/home/bdtrippers/assets/css
mkdir -p /data/data/com.termux/files/home/bdtrippers/assets/js
mkdir -p /data/data/com.termux/files/home/bdtrippers/assets/images
mkdir -p /data/data/com.termux/files/home/bdtrippers/includes
```

- [ ] **Step 2: Create empty asset files**
```bash
touch /data/data/com.termux/files/home/bdtrippers/assets/css/style.css
touch /data/data/com.termux/files/home/bdtrippers/assets/js/script.js
echo "Images will go here" > /data/data/com.termux/files/home/bdtrippers/assets/images/placeholder.txt
```

- [ ] **Step 3: Add basic CSS to style.css**
```css
/* Custom styles overriding Bootstrap where necessary */
body {
    font-family: 'Open Sans', sans-serif;
    color: #333;
}
.hero-section {
    background-color: #0056b3;
    color: white;
    padding: 100px 0;
    text-align: center;
}
.footer {
    background-color: #f8f9fa;
    padding: 30px 0;
    margin-top: 50px;
}
.social-icons a {
    color: #0056b3;
    font-size: 24px;
    margin: 0 10px;
}
```

- [ ] **Step 4: Commit**
```bash
git init
git add assets/
git commit -m "chore: setup directory structure and basic css"
```

---

### Task 2: Implement Header and Footer

**Files:**
- Create: `includes/header.php`
- Create: `includes/footer.php`

- [ ] **Step 1: Write `header.php`**
```php
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>BD TRIPPER - Visa & Travel Services</title>
    <!-- Bootstrap CSS -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet">
    <!-- FontAwesome for Icons -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css">
    <!-- Custom CSS -->
    <link rel="stylesheet" href="assets/css/style.css">
</head>
<body>
    <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
        <div class="container">
            <a class="navbar-brand" href="index.php">BD TRIPPER</a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNav">
                <ul class="navbar-nav ms-auto">
                    <li class="nav-item"><a class="nav-link" href="index.php">Home</a></li>
                    <li class="nav-item"><a class="nav-link" href="services.php">Visa Services</a></li>
                    <li class="nav-item"><a class="nav-link" href="solvency.php">Bank Solvency</a></li>
                    <li class="nav-item"><a class="nav-link" href="contact.php">Contact Us</a></li>
                </ul>
            </div>
        </div>
    </nav>
```

- [ ] **Step 2: Write `footer.php`**
```php
    <footer class="footer text-center">
        <div class="container">
            <div class="row">
                <div class="col-md-4 mb-3">
                    <h5>BD TRIPPER</h5>
                    <p>Your trusted visa processing partner.</p>
                </div>
                <div class="col-md-4 mb-3">
                    <h5>Quick Links</h5>
                    <ul class="list-unstyled">
                        <li><a href="services.php" class="text-decoration-none">Visa Services</a></li>
                        <li><a href="solvency.php" class="text-decoration-none">Bank Solvency</a></li>
                    </ul>
                </div>
                <div class="col-md-4 mb-3">
                    <h5>Follow Us</h5>
                    <div class="social-icons">
                        <a href="#"><i class="fab fa-facebook"></i></a>
                        <a href="#"><i class="fab fa-instagram"></i></a>
                        <a href="#"><i class="fab fa-whatsapp"></i></a>
                    </div>
                </div>
            </div>
            <hr>
            <p class="mb-0">&copy; <?php echo date('Y'); ?> BD TRIPPER. All Rights Reserved.</p>
        </div>
    </footer>

    <!-- Bootstrap JS -->
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"></script>
    
    <!-- Tawk.to Live Chat Snippet -->
    <script type="text/javascript">
    var Tawk_API=Tawk_API||{}, Tawk_LoadStart=new Date();
    (function(){
    var s1=document.createElement("script"),s0=document.getElementsByTagName("script")[0];
    s1.async=true;
    s1.src='https://embed.tawk.to/65abcdef1234567890abcdef/1abcd2efg'; /* Placeholder ID */
    s1.charset='UTF-8';
    s1.setAttribute('crossorigin','*');
    s0.parentNode.insertBefore(s1,s0);
    })();
    </script>
</body>
</html>
```

- [ ] **Step 3: Commit**
```bash
git add includes/
git commit -m "feat: add shared header and footer components with live chat"
```

---

### Task 3: Build Home Page

**Files:**
- Create/Overwrite: `index.php`

- [ ] **Step 1: Write `index.php`**
```php
<?php include 'includes/header.php'; ?>

<!-- Hero Section -->
<section class="hero-section">
    <div class="container">
        <h1 class="display-4 fw-bold">Travel with Ease</h1>
        <p class="lead">Hassle-free Visa Processing & Bank Solvency Support for Any Country.</p>
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

<?php include 'includes/footer.php'; ?>
```

- [ ] **Step 2: Commit**
```bash
git add index.php
git commit -m "feat: implement home page with hero and features"
```

---

### Task 4: Build Visa Services Page

**Files:**
- Create/Overwrite: `services.php`

- [ ] **Step 1: Write `services.php`**
```php
<?php include 'includes/header.php'; ?>

<div class="container my-5">
    <h1 class="text-center text-primary mb-5">Our Visa Services</h1>
    
    <!-- Work Visa -->
    <div class="row mb-5 align-items-center">
        <div class="col-md-6">
            <h2><i class="fas fa-briefcase text-primary"></i> Work Visa</h2>
            <p>We provide comprehensive support for work visas to any country. Our experts help you navigate the documentation, employment contracts, and application procedures to ensure a smooth transition to your new career abroad.</p>
            <ul class="list-group list-group-flush mb-3">
                <li class="list-group-item"><i class="fas fa-check text-success"></i> Document Verification</li>
                <li class="list-group-item"><i class="fas fa-check text-success"></i> Application Processing</li>
                <li class="list-group-item"><i class="fas fa-check text-success"></i> Interview Preparation</li>
            </ul>
        </div>
        <div class="col-md-6 text-center">
            <div class="p-5 bg-light rounded border border-primary">
                <h4>Supported Countries</h4>
                <p>USA, Canada, UK, Australia, Europe (Schengen), Middle East, and more.</p>
            </div>
        </div>
    </div>
    
    <hr>
    
    <!-- Student Visa -->
    <div class="row my-5 align-items-center">
        <div class="col-md-6 order-md-2">
            <h2><i class="fas fa-user-graduate text-primary"></i> Student Visa</h2>
            <p>Achieve your educational dreams with our hassle-free student visa processing. We assist with university admissions, offer letters, and the entire visa application process for students aiming to study anywhere in the world.</p>
            <ul class="list-group list-group-flush mb-3">
                <li class="list-group-item"><i class="fas fa-check text-success"></i> Admission Assistance</li>
                <li class="list-group-item"><i class="fas fa-check text-success"></i> Financial Document Guidance</li>
            </ul>
        </div>
        <div class="col-md-6 order-md-1 text-center">
            <div class="p-5 bg-light rounded border border-primary">
                <h4>Study Destinations</h4>
                <p>Top universities in USA, UK, Canada, Australia, Germany, and more.</p>
            </div>
        </div>
    </div>
    
    <hr>
    
    <!-- Medical Visa -->
    <div class="row mt-5 align-items-center">
        <div class="col-md-6">
            <h2><i class="fas fa-hospital text-primary"></i> Medical Visa</h2>
            <p>When health is a priority, we ensure fast-tracked medical visa processing. We coordinate with hospitals abroad and handle the paperwork so you can focus on treatment and recovery.</p>
        </div>
        <div class="col-md-6 text-center">
             <div class="p-5 bg-light rounded border border-primary">
                <h4>Medical Hubs</h4>
                <p>India, Singapore, Thailand, USA, UK, and more.</p>
            </div>
        </div>
    </div>
</div>

<?php include 'includes/footer.php'; ?>
```

- [ ] **Step 2: Commit**
```bash
git add services.php
git commit -m "feat: implement visa services page"
```

---

### Task 5: Build Bank Solvency Page

**Files:**
- Create: `solvency.php`

- [ ] **Step 1: Write `solvency.php`**
```php
<?php include 'includes/header.php'; ?>

<div class="container my-5">
    <div class="row justify-content-center">
        <div class="col-md-8 text-center">
            <h1 class="text-primary mb-4"><i class="fas fa-money-check"></i> Bank Solvency Support</h1>
            <p class="lead">Need to show proof of funds for your visa application? We've got you covered.</p>
            
            <div class="card shadow-lg border-primary mt-5">
                <div class="card-header bg-primary text-white">
                    <h3 class="mb-0">Any Amount. Any Country.</h3>
                </div>
                <div class="card-body p-5">
                    <p class="card-text fs-5">We provide legally compliant and verified bank solvency documents to meet the financial requirements of embassies worldwide.</p>
                    
                    <div class="row text-start mt-4">
                        <div class="col-md-6 mb-3">
                            <h5><i class="fas fa-shield-alt text-primary"></i> 100% Genuine</h5>
                            <p>Verified documents directly from reputed financial institutions.</p>
                        </div>
                        <div class="col-md-6 mb-3">
                            <h5><i class="fas fa-bolt text-primary"></i> Fast Processing</h5>
                            <p>Get your documents ready within 24-48 hours of requirement submission.</p>
                        </div>
                    </div>
                    
                    <a href="contact.php" class="btn btn-primary btn-lg mt-3 w-100">Contact Us for a Quote</a>
                </div>
            </div>
        </div>
    </div>
</div>

<?php include 'includes/footer.php'; ?>
```

- [ ] **Step 2: Commit**
```bash
git add solvency.php
git commit -m "feat: implement bank solvency page"
```

---

### Task 6: Build Contact Page with PHP Form Handling

**Files:**
- Create/Overwrite: `contact.php`

- [ ] **Step 1: Write `contact.php`**
```php
<?php
$message_status = '';
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = htmlspecialchars($_POST['name'] ?? '');
    $email = htmlspecialchars($_POST['email'] ?? '');
    $message = htmlspecialchars($_POST['message'] ?? '');
    
    // In a real scenario, use mail() or PHPMailer here.
    // For this simple setup, we will save to a text file for verification.
    $log_data = date('Y-m-d H:i:s') . " | Name: $name | Email: $email | Message: $message\n";
    file_put_contents('inquiries.log', $log_data, FILE_APPEND);
    
    $message_status = '<div class="alert alert-success">Thank you, ' . $name . '! Your message has been sent successfully. We will contact you soon.</div>';
}
?>
<?php include 'includes/header.php'; ?>

<div class="container my-5">
    <h1 class="text-center text-primary mb-5">Contact BD TRIPPER</h1>
    
    <div class="row">
        <!-- Contact Information -->
        <div class="col-md-5 mb-4">
            <div class="card h-100 border-0 shadow-sm">
                <div class="card-body bg-light p-4 rounded">
                    <h3>Get in Touch</h3>
                    <p>Have questions about visas or bank solvency? Reach out to us!</p>
                    
                    <ul class="list-unstyled mt-4">
                        <li class="mb-3"><i class="fas fa-map-marker-alt text-primary me-2"></i> 123 Travel Avenue, Dhaka, Bangladesh</li>
                        <li class="mb-3"><i class="fas fa-phone text-primary me-2"></i> +880 1711-000000</li>
                        <li class="mb-3"><i class="fas fa-envelope text-primary me-2"></i> info@bdtrippers.com</li>
                        <li class="mb-3"><i class="fab fa-whatsapp text-success me-2"></i> WhatsApp Available</li>
                    </ul>
                </div>
            </div>
        </div>
        
        <!-- Contact Form -->
        <div class="col-md-7">
            <div class="card shadow-sm border-primary">
                <div class="card-header bg-primary text-white">
                    <h4 class="mb-0">Send us a Message</h4>
                </div>
                <div class="card-body p-4">
                    <?php echo $message_status; ?>
                    
                    <form method="POST" action="contact.php">
                        <div class="mb-3">
                            <label for="name" class="form-label">Full Name</label>
                            <input type="text" class="form-control" id="name" name="name" required>
                        </div>
                        <div class="mb-3">
                            <label for="email" class="form-label">Email Address</label>
                            <input type="email" class="form-control" id="email" name="email" required>
                        </div>
                        <div class="mb-3">
                            <label for="message" class="form-label">Your Message / Requirement</label>
                            <textarea class="form-control" id="message" name="message" rows="4" required></textarea>
                        </div>
                        <button type="submit" class="btn btn-primary w-100">Send Message <i class="fas fa-paper-plane"></i></button>
                    </form>
                </div>
            </div>
        </div>
    </div>
</div>

<?php include 'includes/footer.php'; ?>
```

- [ ] **Step 2: Commit**
```bash
git add contact.php
git commit -m "feat: implement contact page with form handling"
```
