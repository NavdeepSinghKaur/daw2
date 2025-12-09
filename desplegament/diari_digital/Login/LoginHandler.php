<?php
session_start();
if (isset($_SESSION['level'])) {
    header('/diari_digital/index.php');
}

if (!isset($_POST['name']) || !isset($_POST['password']) || $_SERVER['REQUEST_METHOD'] !== 'POST') {
    return http_response_code(401);
    die;
}

$userEmail = $_POST['name'];
$passwd = $_POST['password'];

require_once __DIR__ . '/../QueryController.php';

$controller = new QueryController();

$logged = $controller->loginUser($userEmail, $passwd);
if ($logged === true) {
    header('Location: /diari_digital/index.php');
}

?>

<!-- <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Login</title>
</head>
<body>
    <h1>Iniciant sessió</h1>
</body>
</html> -->