<?php
session_start();

$_GET['id'];
echo ($_GET['id']);
$_SESSION['selectedUserId'] = $_GET['id'];
echo $_SESSION['selectedUserId'];
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Canviar nivell d'usuari</title>
</head>
<body>
    <form action="ChangeUserLevelController.php" method="post">
        <label><input type="radio" name="newLevel" value="10" id="level10"> Nivell 10</label><br>
        <label><input type="radio" name="newLevel" value="20" id="level20"> Nivell 20</label><br>
        <label><input type="radio" name="newLevel" value="30" id="level30"> Nivell 30</label><br>
        <label><input type="radio" name="newLevel" value="40" id="level40"> Nivell 40</label><br>

        <input type="submit" value="submit">
    </form>
</body>
</html>