<?php
session_start();
ini_set('display_errors', 1);
// error_reporting(E_ALL);
define('APP_CODE_WPDKJDLOXHN', "7c1a52882a913a3ad0fe67ebfe220659c4621a8828432350aec45cfa7d40dbc6");
print_r ($_SESSION);
include_once __DIR__ . '/QueryController.php';

$queries = new QueryController();
$users = $queries->printEverything();
$articles = $queries->getArticle();

// print_r($_SESSION);
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
            <li><a href="Login/Login.php">Iniciar sessió</a></li>
            <li><a href="Register.php">Registrar-se</a></li>
            <?php
            if (isset($_SESSION['level'])) {
                if ($_SESSION['level'] >= 10) {
                    echo ("<li><a href=\"Logged/Shared/Logout.php\">Tancar Sessió</a></li>");
                    echo ("<li><a href=\"Logged/Shared/Profile.php\">El meu perfil</a></li>");
                    echo ("<li><a href=\"Logged/Shared/FavoriteArticles.php\">Articles preferits</a></li>");
                    echo ("<li><a href=\"Logged/Shared/Settings.php\">Configuració</a></li>");
                }
            }
            ?>
            <li></li>
        </ul>
    </header>
    <h1>DIARI DIGITAL</h1>
    <div id="articles"></div>
    <script src="./assets/js/main.js"></script>

    <div id="articles">
        <h1>Articles</h1>
        <?php
            print_r($users);
            print_r ($articles);
        ?>
    </div>
</body>
</html>