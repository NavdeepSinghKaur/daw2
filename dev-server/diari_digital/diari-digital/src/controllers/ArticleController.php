<?php
require __DIR__ . '/../Models/Article.php';

function getArticle() {
    $article = new Article();

    return $article->getArticle();
}