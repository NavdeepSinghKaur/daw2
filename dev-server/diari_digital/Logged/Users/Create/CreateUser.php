<?php
session_start();

if (!isset($_SESSION['level']) || $_SERVER['REQUEST_METHOD'] !== 'GET') {
    http_response_code(403);
    exit;
}

if ($_SESSION['level'] !== 40) {
    http_response_code(403);
    exit;
}

include __DIR__ . '/../../header.php';

?>

    <form action="CreateUserController.php" method="post">
        <label for="username">Nom d'usuari</label>
        <input type="text" name="username" id="username">

        <label for="email">Email</label>
        <input type="text" name="email" id="email">

        <label for="password">Contrasenya</label>
        <input type="password" name="password" id="password">

        <label for="level">Nivell</label>
        <input type="text" name="level" id="level">

        <button type="submit">Crear usuari</button>
    </form>
</body>
</html>