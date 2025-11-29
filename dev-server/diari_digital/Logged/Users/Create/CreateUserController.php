<?php
session_start();

if (!isset($_SESSION['level'])) {
    http_response_code(403);
    exit;
}

if ($_SESSION['level'] !== 40) {
    http_response_code(403);
    exit;
}

if (
    !(
    isset($_POST['username'])
    || isset($_POST['email'])
    || isset($_POST['password'])
    || isset($_POST['level'])
    )
) {
    http_response_code(401);
    exit;
}

require_once __DIR__ . '/../../../QueryController.php';

$queryController = new QueryController();

$queryController->registerUser(
    $_POST['username'],
    $_POST['email'],
    $_POST['password'],
    $_POST['level']
);