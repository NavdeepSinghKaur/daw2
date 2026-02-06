<?php
session_start();

if (!isset($_SESSION['level']) || $_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(403);
    die;
}

if ($_SESSION['level'] !== 40) {
    http_response_code(403);
    die;
}
require_once __DIR__ . '/../../../QueryController.php';


$queryController = new QueryController();

$queryController->changeUserLevel($_SESSION['selectedUserId'], $_POST['newLevel']);