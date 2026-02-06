<?php
session_start();

if ($_SERVER['REQUEST_METHOD'] === 'GET' && $_SESSION['level'] >= 10) {
    session_destroy();
    header('Location: /diari_digital/index.php');
} else {
    return http_response_code(403);
}