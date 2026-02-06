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

include __DIR__ . '/../../header.php';
?>

    <?php
    $queryController = new QueryController();

    $userList = $queryController->printAllUsers();

    foreach($userList as $user) {
        print_r($user);
        if ($user['id'] !== $_SESSION['userId']) {
    ?>
            <br>
            <a class="btn btn-danger" href="Delete/DeleteUserController.php?id=<?php echo $user['id']?>">Eliminar</a>
            <a class="btn btn-secondary" href="ChangeLevel/ChangeUserLevel.php?id=<?php echo $user['id']?>">Canviar permisos</a>
            <br>
    <?php
        } else {
    ?>
        <span> (Tú)</span>
        <br>
    <?php
        }

    }
    ?>

    <a class="btn btn-primary" href="Create/CreateUser.php">Crear nou usuari</a>
</body>
</html>