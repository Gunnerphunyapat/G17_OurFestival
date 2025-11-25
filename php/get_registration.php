<?php
header('Content-Type: application/json');

$host = "localhost";
$user = "festival_user";  // ใช้ user เดียวกับ save_registration.php
$pass = "Festival123!";   
$db   = "ourfestival";

// เชื่อม DB
$conn = new mysqli($host, $user, $pass, $db);
if ($conn->connect_error) {
    echo json_encode([]);
    exit();
}

// เลือกข้อมูลผู้ลงทะเบียนล่าสุดก่อน
$sql = "SELECT id, name, surname, gender, email, phone, time FROM registration ORDER BY time DESC";
$result = $conn->query($sql);

$users = [];
if ($result && $result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        $users[] = $row;
    }
}

echo json_encode($users);

$conn->close();
?>