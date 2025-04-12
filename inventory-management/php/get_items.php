<?php
include 'config.php';

// Tambahkan header CORS
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

// Ubah query untuk mengurutkan dari terlama ke terbaru
$sql = "SELECT * FROM items ORDER BY created_at ASC";
$result = mysqli_query($conn, $sql);

$items = [];
while ($row = mysqli_fetch_assoc($result)) {
    $items[] = $row;
}

header('Content-Type: application/json');
echo json_encode($items);

mysqli_close($conn);
?>