<?php

$userEmail = $_POST['name'];
$passwd = $_POST['password'];

echo $name;
require_once __DIR__ . '/../QueryController.php';
$controller = new QueryController();

print_r($controller->loginUser($userEmail, $passwd));

?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Login</title>
</head>
<body>
    <h1>Iniciant sessió</h1>
</body>
</html>