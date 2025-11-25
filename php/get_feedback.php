<?php
header('Content-Type: application/json');

$host = "localhost";
$user = "festival_user";
$pass = "Festival123!";
$db   = "ourfestival";

$conn = new mysqli($host, $user, $pass, $db);
if ($conn->connect_error) {
    echo json_encode([]);
    exit();
}

$sql = "SELECT * FROM feedback ORDER BY time DESC";
$result = $conn->query($sql);

$feedbacks = [];
if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        $feedbacks[] = $row;
    }
}

echo json_encode($feedbacks);
$conn->close();
?>
