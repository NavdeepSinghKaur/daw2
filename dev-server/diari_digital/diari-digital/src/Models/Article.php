<?php
require __DIR__ . '/../Config/pdoStarter.php';

class Article {
    function getArticle() {
        global $pdo;
        $sql = "SELECT A.id, A.title, A.article, U.username FROM Article A INNER JOIN User U ON A.userId = U.id ORDER BY A.id DESC LIMIT 3;";    

        $stmt = $pdo->prepare($sql);
        $stmt->execute();

        $results = $stmt->fetchAll(PDO::FETCH_ASSOC);
        print_r($results);
    }
}
