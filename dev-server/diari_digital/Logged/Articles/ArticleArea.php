<?php
session_start();

if(!isset($_SESSION) || $_SERVER['REQUEST_METHOD'] !== 'GET') {
    return http_response_code(403);
}
if ($_SESSION['level'] < 20) {
    return http_response_code(403);
}

require_once __DIR__ . '/../../QueryController.php';

include __DIR__ . '/../../header.php';
?>
    <?php
    $queryController = new QueryController();

    if ($_SESSION['level'] >= 30) {
        $articles = $queryController->getAllArticles();
    } else if ($_SESSION['level'] == 20) {
        $articles = $queryController->getUserArticles();
    }

    foreach($articles as $article) {
        print_r($article);
    ?>
        <br>
        <a class="btn btn-danger" href="Delete/DeleteArticle.php?id=<?php echo $article['id']?>">Eliminar article</a>
        <a class="btn btn-secondary" href="Edit/EditArticle.php?id=<?php echo $article['id'] ?>&title=<?php echo $article['title'] ?> &article= <?php echo $article['article'] ?>">Editar article</a>
        <br>
        <?php
    }
    ?>
    <a class="btn btn-primary" type="button" href="Create/CreateArticle.php">Crear nou article</a>
</body>
</html>