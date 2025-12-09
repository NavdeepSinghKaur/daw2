<?php
session_start();
ini_set('display_errors', 1);
error_reporting(E_ALL);
define('APP_CODE_WPDKJDLOXHN', "7c1a52882a913a3ad0fe67ebfe220659c4621a8828432350aec45cfa7d40dbc6");

include_once __DIR__ . '/QueryController.php';

$queries = new QueryController();
$users = $queries->printAllUsers();
$articles = $queries->getArticle();

include __DIR__ . '/header.php';
?>

    <!-- <div id="articles"></div> -->
    <!-- <script src="./assets/js/main.js"></script> -->
    <div id="articles">
        <h1 class="display-3 m-3">Articles</h1>
        <hr >
        <?php
            // print_r($users);
            foreach ($articles as $article) {
                ?>
                <div class="card w-50 mx-auto my-5 shadow rounded-4">
                    <div class="card-body">
                        <h3 class="card-title display-4"><?php echo htmlspecialchars($article['title']) ?></h3>
                        <p class="card-text"><?php echo htmlspecialchars($article['article']) ?></p>
                        <small class="ms-auto">Escrit per: <?php echo htmlspecialchars($article['username']) ?> </small>
                    </div>
                </div>
                <!-- print_r($article); -->
                <?php
            }
            // print_r ($articles);
        ?>
    </div>
</body>
</html>