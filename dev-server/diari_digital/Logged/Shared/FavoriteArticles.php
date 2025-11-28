<?php
session_start();

if ($_SERVER['REQUEST_METHOD'] === 'GET' && $_SESSION['level'] >= 10) {

    echo ("Hello world");
} else {
    return http_response_code(403);
}