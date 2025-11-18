<?php
ini_set('display_errors', 1);
echo (__DIR__ . '/../src/controllers/ArticleController.php') . '<br>';
echo (file_exists(__DIR__ . '/../src/controllers/ArticleController.php') ? 'YES' : 'NO') . '<br>';
require_once __DIR__ . '/../src/controllers/ArticleController.php';

$articles = getArticle();
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Diari digital</title>
</head>
<body>
    <header>
        <ul>
            <li><a href="login.php">Iniciar sessió</a></li>
            <li><a href="http://"></a></li>
            <li></li>
        </ul>
    </header>
    <h1>DIARI DIGITAL</h1>
    <div id="articles"></div>
    <script src="./assets/js/main.js"></script>

    <div id="articles">
        <h1>Articles</h1>
        <?php

        ?>
    </div>
</body>
</html>