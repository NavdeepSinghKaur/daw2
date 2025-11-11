<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Formulari registre</title>
    <link rel="stylesheet" href="assets/css/login.css">
  </head>
  <body>
    <div class="app">
      <div class="form">
        <h1>Pagina registre</h1>
        <form id="register_user">
          <label for="">Usuari</label>
          <input
            type="text"
            name="email"
            id="email"
            placeholder="john@doe.com"
          />

          <label for="password1">Password 1</label>
          <input type="password" name="password1" id="password1" />

          <label for="password2">Password 2</label>
          <input type="password" name="password2" id="password2" />

          <button type="submit">Registrar</button>
        </form>
        <a href="login.php">Tens compte? Inicia sessió</a>
      </div>
    </div>
    <div id="result"></div>
  </body>
</html>
