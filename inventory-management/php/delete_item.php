<?php
include 'config.php';

// Tambahkan header CORS
header("Access-Control-Allow-Origin: http://localhost");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $id = $_POST['id'];

    // Sanitasi input untuk keamanan
    $id = mysqli_real_escape_string($conn, $id);

    $sql = "DELETE FROM items WHERE id = '$id'";
    if (mysqli_query($conn, $sql)) {
        echo "Item deleted successfully!";
    } else {
        echo "Error: " . mysqli_error($conn);
    }
}

mysqli_close($conn);
?>