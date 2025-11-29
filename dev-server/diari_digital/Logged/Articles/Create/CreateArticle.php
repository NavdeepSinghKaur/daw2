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

include __DIR__ . '/../../../header.php';

?>

    <form class="" action="CreateArticleController.php" method="post">
        
        <label class="form-label" for="title">Títol</label>
        <input class="form-control" type="text" name="title" id="title">

        <label class="form-label" for="article">Article</label>
        <textarea class="form-control" name="article" id="article"></textarea>

        <button class="btn btn-primary" type="submit">Guardar</button>
    </form>
</body>
</html>