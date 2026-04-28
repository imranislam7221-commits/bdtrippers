<?php
$password = "siam123"; // Simple password
$status = "";
$is_logged_in = isset($_POST['pass']) && $_POST['pass'] === $password;

if ($_SERVER["REQUEST_METHOD"] == "POST" && isset($_FILES['visa_photo']) && $is_logged_in) {
    $caption = htmlspecialchars($_POST['caption'] ?? '');
    $target_dir = "assets/images/visas/";
    $file_name = time() . "_" . basename($_FILES["visa_photo"]["name"]);
    $target_file = $target_dir . $file_name;

    if (move_uploaded_file($_FILES["visa_photo"]["tmp_name"], $target_file)) {
        // Update JSON
        $json_file = 'includes/visas.json';
        $current_data = json_decode(file_get_contents($json_file), true) ?? [];
        $current_data[] = ["file" => $file_name, "caption" => $caption];
        file_put_contents($json_file, json_encode($current_data));
        $status = '<div class="alert alert-success">Photo uploaded successfully!</div>';
    } else {
        $error = $_FILES["visa_photo"]["error"];
        $error_msg = "Upload failed. Error code: $error. ";
        if ($error == 1 || $error == 2) $error_msg .= "File is too large.";
        if ($error == 3) $error_msg .= "Partial upload.";
        if ($error == 4) $error_msg .= "No file selected.";
        $status = '<div class="alert alert-danger">' . $error_msg . '</div>';
    }
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Admin - Upload Visa Success</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet">
</head>
<body class="bg-light">
    <div class="container mt-5">
        <div class="row justify-content-center">
            <div class="col-md-6">
                <div class="card shadow">
                    <div class="card-header bg-primary text-white">Upload Success Photo</div>
                    <div class="card-body">
                        <?php echo $status; ?>
                        <?php if (!$is_logged_in): ?>
                        <form method="POST">
                            <div class="mb-3">
                                <label>Password</label>
                                <input type="password" name="pass" class="form-control" required>
                            </div>
                            <button type="submit" class="btn btn-primary w-100">Login</button>
                        </form>
                        <?php else: ?>
                        <form method="POST" enctype="multipart/form-data">
                            <input type="hidden" name="pass" value="<?php echo $password; ?>">
                            <div class="mb-3">
                                <label>Photo</label>
                                <input type="file" name="visa_photo" class="form-control" accept="image/*" required>
                            </div>
                            <div class="mb-3">
                                <label>Caption (Text on photo)</label>
                                <input type="text" name="caption" class="form-control" placeholder="e.g. USA Student Visa" required>
                            </div>
                            <button type="submit" class="btn btn-success w-100">Upload</button>
                        </form>
                        <?php endif; ?>
                        <a href="index.php" class="btn btn-link mt-3">Back to Home</a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</body>
</html>
