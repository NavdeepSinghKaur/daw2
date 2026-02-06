<?php
session_start();
ini_set('display_errors', 1);
define('APP_CODE_WPDKJDLOXHN', "7c1a52882a913a3ad0fe67ebfe220659c4621a8828432350aec45cfa7d40dbc6");

if (isset($_SESSION['level'])) {
  header('Location: /diari_digital/index.php');
}

include __DIR__ . '/../header.php';
?>
<!-- <!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Formulari registre</title>
    <link rel="stylesheet" href="assets/css/login.css">
  </head>
  <body> -->
    <div class="app">
      <div class="form">
        <h1>Pagina registre</h1>
        <form id="register-user" method="post" action="RegisterHandler.php">
          <label class="form-label" for="">Usuari</label>
          <input class="form-control"
            type="text"
            name="name"
            id="name"
            placeholder="Nom d'usuari"
          />

          <label class="form-label" for="email">Email</label>
          <input class="form-control" type="email" name="email" id="email" />

          <label class="form-label" for="password1">Password 1</label>
          <input class="form-control" type="password" name="password1" id="password1" />

          <label class="form-label" for="password2">Password 2</label>
          <input class="form-control" type="password" name="password2" id="password2" />

          <button class="btn btn-primary" type="submit">Registrar</button>
        </form>        
        <a href="../Login/Login.php">Tens compte? Inicia sessió</a>

        <!-- <script src="assets/js/registerUser.js"></script> -->
      </div>
    </div>
    <div id="result"></div>
  </body>
</html>
