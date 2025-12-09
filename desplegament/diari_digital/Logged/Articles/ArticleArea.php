<?php
session_start();

if(!isset($_SESSION) || $_SERVER['REQUEST_METHOD'] !== 'GET') {
    return http_response_code(403);
}
if ($_SESSION['level'] < 20) {
    return http_response_code(403);
}

require_once __DIR__ . '/../../QueryController.php';

$queryController = new QueryController();

$_SESSION['page'] = 10;
$offset = 0;

if (isset($_GET['page'])) {
    $offset = $_GET['page'] * 10;
}

if ($_SESSION['level'] >= 30) {
    $articles = $queryController->getAllArticles($offset);
} else if ($_SESSION['level'] == 20) {
    $articles = $queryController->getUserArticles($offset);
}

include __DIR__ . '/../../header.php';

?>
    <div class="container my-5">
        <input class="form-control d-block mt-5 mx-auto w-50 border rounded-3 shadow" type="text" id="search-engine" placeholder="Filtrar article">
        <a class="btn btn-primary btn-sm d-block mx-auto mt-4 w-25 shadow rounded-3" type="button" href="Create/CreateArticle.php">Crear nou article</a>
    </div>
    <?php
    foreach($articles as $article) {
    ?>
        <div class="card w-50 mx-auto my-5 rounded-4 article-box" id="">
            <div class="card-body">
                <h3 class="card-title display-4"><?php echo htmlspecialchars($article['title']) ?></h3>
                <p class="card-text"><?php echo htmlspecialchars($article['article']) ?></p>
                <p class="ms-auto"> <?php echo htmlspecialchars($article['username']) ?> </p>
            </div>

            <br>
            <div class="d-flex ">
                <a class="btn btn-danger my-3 ms-3" href="Delete/DeleteArticle.php?id=<?php echo htmlspecialchars($article['id'])?>">Eliminar article</a>
                <a class="btn btn-secondary my-3 ms-3" href="Edit/EditArticle.php?id=<?php echo htmlspecialchars($article['id']) ?>&title=<?php echo htmlspecialchars($article['title']) ?> &article= <?php echo htmlspecialchars($article['article']) ?>">Editar article</a>
            </div>
            <br>
        </div>

        <?php
    }
    ?>
    <div class="d-flex">
        <?php
        if ($_GET['page'] > 1) { ?>
            <a class="btn btn-primary mx-5" href="./ArticleArea.php?page=<?php echo htmlspecialchars($_GET['page']-1) ?>">Pàgina anterior</a>
        <?php 
        }
        ?>
        <a class="btn btn-primary" href="./ArticleArea.php?page=<?php echo htmlspecialchars($_GET['page']+1) ?>">Següent pàgina</a>
    </div>
    <script src="editArticleScript.js"></script>
</body>
</html>