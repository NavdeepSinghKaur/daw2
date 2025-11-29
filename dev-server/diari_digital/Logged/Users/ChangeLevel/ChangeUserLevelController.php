<?php
session_start();
echo ("abcd");

if (!isset($_SESSION['level']) || $_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(403);
    echo ("FORBIDDEN");
    die;
}
echo ("abcd");

if ($_SESSION['level'] !== 40) {
    http_response_code(403);
    echo ("FORBIDDEN");
    die;
}
echo ("abcd");

require_once __DIR__ . '/../../../QueryController.php';
echo ("abcd");


$queryController = new QueryController();
echo ("abcd");
echo $_POST['newLevel'];
echo $_SESSION['selectedUserId'];
$queryController->changeUserLevel($_SESSION['selectedUserId'], $_POST['newLevel']);