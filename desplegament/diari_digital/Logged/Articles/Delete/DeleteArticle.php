<?php
session_start();

if ($_SERVER['REQUEST_METHOD'] !== 'GET' || !isset($_SESSION['level'])) {
    http_response_code(403);
    die;
}

if ($_SESSION['level'] == 10) {
    http_response_code(403);
    die;
}

if (!isset($_GET['id'])) {
    http_response_code(401);
    die;
}
// Check if id is a number or not

require_once __DIR__ . '/../../QueryController.php';

$queryController = new QueryController();

$articleUserId = $queryController->getArticleData($_GET['id']);
if ($_SESSION['level'] == 20) {
    if ($articleUserId === $_SESSION['userId']) {
        $queryController->deleteArticle($_GET['id']);
    }
} else if ($_SESSION['level'] >= 30) {
    $queryController->deleteArticle($_GET['id']);
}

header('Location: /diari_digital/Logged/Articles/ArticleArea.php');
