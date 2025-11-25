<?php
header('Content-Type: application/json'); // บอก browser ว่าส่ง JSON กลับ

$host = "localhost";
$user = "festival_user";  
$pass = "Festival123!";   
$db   = "ourfestival";

// เชื่อม DB
$conn = new mysqli($host, $user, $pass, $db);
if ($conn->connect_error) {
    echo json_encode(["success" => false, "message" => "DB Connection Failed: " . $conn->connect_error]);
    exit();
}

// อ่าน JSON ที่ส่งมาจาก fetch
$data = json_decode(file_get_contents("php://input"), true);
$name    = $conn->real_escape_string($data['name']);
$surname = $conn->real_escape_string($data['surname']);
$gender  = $conn->real_escape_string($data['gender']);
$email   = $conn->real_escape_string($data['email']);
$phone   = $conn->real_escape_string($data['phone']);

// ใส่ข้อมูลลง DB
$sql = "INSERT INTO registration (name, surname, gender, email, phone, time)
        VALUES ('$name', '$surname', '$gender', '$email', '$phone', NOW())";

if ($conn->query($sql)) {
    echo json_encode(["success" => true]);
} else {
    echo json_encode(["success" => false, "message" => $conn->error]);
}

$conn->close();
?>
