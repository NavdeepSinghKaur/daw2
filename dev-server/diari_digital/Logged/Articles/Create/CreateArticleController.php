<?php
session_start();
$title = $_POST['title'];
$article = $_POST['article'];

require_once __DIR__ . '/../../QueryController.php';

$queryController = new QueryController();

$queryController->createArticle($title, $article);