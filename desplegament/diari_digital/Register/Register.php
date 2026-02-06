<?php
session_start();
ini_set('display_errors', 1);
define('APP_CODE_WPDKJDLOXHN', "7c1a52882a913a3ad0fe67ebfe220659c4621a8828432350aec45cfa7d40dbc6");

if (isset($_SESSION['level'])) {
  header('Location: /diari_digital/index.php');
}

include __DIR__ . '/../header.php';
?>
    <div class="app">
      <div class="w-25 mt-5 mx-auto border p-3 rounded-4">
        <h1 class="m-3">Registrar-se</h1>
        <form id="register-user" method="post" action="RegisterHandler.php">
          <label class="fw-bolder form-label" for="">Usuari</label>
          <input class="form-control mb-2"
            type="text"
            name="name"
            id="name"
            placeholder="Nom d'usuari"
          />

          <label class="fw-bolder form-label" for="email">Email</label>
          <input class="form-control mb-2" type="email" name="email" id="email" />

          <label class="fw-bolder form-label" for="password1">Contrasenya</label>
          <input class="form-control mb-2" type="password" name="password1" id="password1" />

          <label class="fw-bolder form-label" for="password2">Repeteix contrasenya</label>
          <input class="form-control mb-3" type="password" name="password2" id="password2" />

          <button class="btn btn-primary  mb-3" type="submit">Registrar</button>
        </form>        
        <a href="../Login/Login.php">Tens compte? Inicia sessió</a>

        <!-- <script src="assets/js/registerUser.js"></script> -->
      </div>
    </div>
    <div id="result"></div>
  </body>
</html>
