<?php
session_start();

if ($_SERVER['REQUEST_METHOD'] !== "GET") {
    http_response_code(401);
    die;
}

if ($_SESSION['level'] < 40 || !isset($_SESSION)) {
    return http_response_code(403);
}


require_once __DIR__ . '/../../../QueryController.php';

$queryController = new QueryController();

$queryController->deleteUser($_GET['id']);

