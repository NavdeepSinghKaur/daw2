<?php
session_start();
ini_set('display_errors', 1);
error_reporting(E_ALL);
define('APP_CODE_WPDKJDLOXHN', "7c1a52882a913a3ad0fe67ebfe220659c4621a8828432350aec45cfa7d40dbc6");
print_r ($_SESSION);
include_once __DIR__ . '/QueryController.php';

$queries = new QueryController();
$users = $queries->printAllUsers();
$articles = $queries->getArticle();

?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-sRIl4kxILFvY47J16cr9ZwB07vP4J8+LH7qKQnuqkuIAvNWLzeN8tE5YBujZqJLB" crossorigin="anonymous">
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/js/bootstrap.bundle.min.js" integrity="sha384-FKyoEForCGlyvwx9Hj09JcYn3nv7wiPVlz7YYwJrWVcXK/BmnVDxM+D2scQbITxI" crossorigin="anonymous"></script>
    <title>Diari digital</title>
</head>
<body>
    <?php
    include __DIR__ . '/header.php';
    ?>

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