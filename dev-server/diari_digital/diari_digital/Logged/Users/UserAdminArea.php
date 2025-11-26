<?php
session_start();

if (!isset($_SESSION['level']) || $_SERVER['REQUEST_METHOD'] !== 'GET') {
    http_response_code(403);
    echo ("FORBIDDEN");
    die;
}

if ($_SESSION['level'] < 30) {
    http_response_code(403);
    echo ("FORBIDDEN");
    die;    
}

require_once __DIR__ . '/../../QueryController.php';

?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Gestionar usuaris</title>
</head>
<body>
    <?php
        $queryController = new QueryController();

        $userList = $queryController->printAllUsers();

        print_r($userList);
    ?>
</body>
</html>