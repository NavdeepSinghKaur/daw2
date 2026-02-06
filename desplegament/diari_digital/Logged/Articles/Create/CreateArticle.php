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
    <div class="w-100">
        <form class="w-50 p-4 border rounded-4 m-auto mt-5 shadow" action="CreateArticleController.php" method="post">
            <label class="form-label" for="title">Títol</label>
            <input class="form-control form-control-sm" type="text" name="title" id="title" required>
            
            <label class="form-label mt-3" for="article">Article</label>
            <textarea class="form-control" name="article" id="article" rows="8" required></textarea>

            
            <button class="btn btn-primary rounded-3 mt-3" type="submit">Guardar</button>
        </form>
    </div>
</body>
</html>