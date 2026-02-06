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

include __DIR__ . '/../../../header.php';

?>

<div class="d-flex justify-content-center align-items-center mt-5">
    <form class="p-4 rounded-4 border w-50 mt-5 shadow" action="CreateUserController.php" method="post">
        <label class="form-label fw-bold" for="username">Nom d'usuari</label>
        <input class="form-control form-control-sm mb-2" type="text" name="username" id="username" required>

        <label class="form-label fw-bold" for="email">Email</label>
        <input class="form-control form-control-sm mb-2" type="email" name="email" id="email" required>

        <label class="form-label fw-bold" for="password">Contrasenya</label>
        <input class="form-control form-control-sm mb-2" type="password" name="password" id="password" required>

        <label class="form-label fw-bold" for="level">Nivell</label>
        <select class="form-select mb-4" name="level" id="level" required>
            <option value="10">10</option>
            <option value="20">20</option>
            <option value="30">30</option>
            <option value="40">40</option>
        </select>

        <button class="btn btn-primary rounded-3">Crear usuari</button>
    </form>
</div>
</body>
</html>