<?php
session_start();


if (isset($_SESSION['level'])) {
  header('Location: /diari_digital/index.php');
}

include __DIR__ . '/../header.php';
?>

    <div class="w-25 mt-5 mx-auto border p-3 rounded-4">
        <h1 class="m-3">Iniciar sessió</h1>
        <form id="register_user" action="LoginHandler.php" method="post">
          <label class="fw-bolder form-floating" for="">Email</label>
          <input
            class="form-control mb-3"
            type="text"
            name="name"
            id="name"
            placeholder="john@doe.com"
          />

          <label class="fw-bolder form-input" for="password">Contrasenya</label>
          <input class="form-control mb-3" type="password" name="password" id="password" />

          <button class="btn btn-primary mb-3" type="submit">Iniciar sessió</button>
        </form>
        <a href="../Register/Register.php">No tens compte? Registra't</a>
    </div>
    <div id="result"></div>
  </body>
</html>
