<?php
session_start();


if (isset($_SESSION['level'])) {
  header('Location: /diari_digital/index.php');
}
?>

<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Formulari login</title>
    <link rel="stylesheet" href="assets/css/login.css">
  </head>
  <body>
    <div class="app">
      <div class="form">
        <h1>Pagina login</h1>
        <form id="register_user" action="LoginHandler.php" method="post">
          <label for="">Usuari</label>
          <input
            type="text"
            name="name"
            id="name"
            placeholder="john@doe.com"
          />

          <label for="password">Contrasenya</label>
          <input type="password" name="password" id="password" />

          <button type="submit">Registrar</button>
        </form>
        <a href="../Register.php">No tens compte? Registra't</a>
      </div>
    </div>
    <div id="result"></div>
  </body>
</html>
