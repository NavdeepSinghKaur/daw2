<?php
session_start();

if (!isset($_SESSION['level']) || $_SERVER['REQUEST_METHOD'] !== 'GET') {
    http_response_code(403);
    echo ("FORBIDDEN");
    die;
}

if ($_SESSION['level'] !== 40) {
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

        foreach($userList as $user) {
            print_r($user);
            if ($user['id'] !== $_SESSION['userId']) {
                echo("<br>");
                echo("<a href=\"Delete/DeleteUserController.php?id=$user[id]\">Eliminar</a>");
                echo("<a href=\"ChangeLevel/ChangeUserLevel.php?id=$user[id]\">Canviar permisos</a>");
                echo("<br>");
            } else {
                echo("<span> (Tú)</span>");
                echo("<br>");
            }

        }
    ?>

    <a href="Create/CreateUser.php">Crear nou usuari</a>
</body>
</html>