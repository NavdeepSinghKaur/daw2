<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Calendar</title>
</head>
<body>

    <form action="calendar.php" method="post">
        <label for="usr_name">Usuari:</label>
        <input type="text" name="usr_name" id="usr_name">
        <label for="passwd">Contrasenya:</label>
        <input type="password" name="passwd" id="passwd">
        <button type="submit">Entrar</button>
    </form>
    <?php
        if (isset($_GET['error'])) {
    ?>
      <h1 style="color:red;">WRONG CREDENTIALS</h1>      
    <?php
        }
    ?>
</body>
</html>