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
