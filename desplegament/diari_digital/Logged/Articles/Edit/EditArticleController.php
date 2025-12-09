<?php
session_start();

if ($_SERVER['REQUEST_METHOD'] !== 'POST' || !isset($_SESSION['level'])) {
    http_response_code(403);
    die;
}

if ($_SESSION['level'] == 10) {
    http_response_code(403);
    die;
}

// if (!isset($_GET['id'])) {
//     http_response_code(401);
//     die;
// }

require_once __DIR__ . '/../../../QueryController.php';

$queryController = new QueryController();

$queryController->editArticle($_SESSION['editedArticle'], $_POST['title'], $_POST['article']);

header('Location: /diari_digital/Logged/Articles/ArticleArea.php');
?>
