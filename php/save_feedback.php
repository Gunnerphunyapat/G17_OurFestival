<?php
header('Content-Type: application/json');

$host = "localhost";
$user = "festival_user";
$pass = "Festival123!";
$db   = "ourfestival";

$conn = new mysqli($host, $user, $pass, $db);
if ($conn->connect_error) {
    echo json_encode(["success" => false, "message" => "DB Connection Failed"]);
    exit();
}

// อ่าน JSON จาก JS
$data = json_decode(file_get_contents('php://input'), true);
$name = $conn->real_escape_string($data['name']);
$message = $conn->real_escape_string($data['message']);
$rating = intval($data['rating']);

$sql = "INSERT INTO feedback (name, message, rating, time) 
        VALUES ('$name', '$message', $rating, NOW())";

if ($conn->query($sql)) {
    echo json_encode(["success" => true]);
} else {
    echo json_encode(["success" => false, "message" => $conn->error]);
}

$conn->close();
?>
