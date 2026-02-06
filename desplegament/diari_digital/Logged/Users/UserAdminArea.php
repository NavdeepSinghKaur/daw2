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

    <div class="container my-5">
        <a class="btn btn-primary m-auto d-block mx-auto mt-4 w-25 rounded-3" href="Create/CreateUser.php">Crear nou usuari</a>
    </div>
    <?php
    $queryController = new QueryController();

    $userList = $queryController->printAllUsers();

    foreach($userList as $user) {
    ?>
    <div class="d-block m-auto border w-50 rounded-4 mt-5">
        <p class="m-3"> <strong>Nom:</strong> <?php echo htmlspecialchars($user['username']) ?></p>
        <p class="m-3"> <strong>Correu:</strong> <?php echo htmlspecialchars($user['email']) ?></p>
        <p class="m-3"> <strong>Nivell:</strong> <?php echo htmlspecialchars($user['permission']) ?></p>
        <?php
        if ($user['id'] !== $_SESSION['userId']) {
            ?>
            <br>
            <a class="btn btn-danger mb-3 mx-3" href="Delete/DeleteUserController.php?id=<?php echo htmlspecialchars($user['id'])?>">Eliminar</a>
            <a class="btn btn-secondary mb-3 mx-3" href="ChangeLevel/ChangeUserLevel.php?id=<?php echo htmlspecialchars($user['id'])?>">Canviar permisos</a>
            <br>
            <?php
        } else {
            ?>
        <p class="mb-1 mx-3"> (Tú)</p>
        <br>

        <?php
        }
        ?>
    </div>

    <?php
    }
    ?>

</body>
</html>