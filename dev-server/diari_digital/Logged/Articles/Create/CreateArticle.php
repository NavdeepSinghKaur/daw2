<?php
session_start();

if (!isset($_SESSION) || $_SERVER['REQUEST_METHOD'] !== 'GET') {
    http_response_code(403);
    die;
}

if ($_SESSION['level'] < 20) {
    http_response_code(403);
    die;
}


?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Crear article</title>
</head>
<body>
    <form action="CreateArticleController.php" method="post">
        
        <label for="title">Títol</label>
        <input type="text" name="title" id="title">

        <label for="article">Article</label>
        <textarea name="article" id="article"></textarea>

        <button type="submit">Guardar</button>
    </form>
</body>
</html>