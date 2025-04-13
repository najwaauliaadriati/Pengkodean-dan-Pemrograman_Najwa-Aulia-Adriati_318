<?php
include 'db.php';

$name = $_POST['name'];
$qty = $_POST['qty'];
$price = $_POST['price'];

$sql = "INSERT INTO items (name, qty, price) VALUES ('$name', $qty, $price)";
$conn->query($sql);
?>
