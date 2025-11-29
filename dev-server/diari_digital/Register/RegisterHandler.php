<?php
error_reporting(E_ALL);
if ($_SERVER['REQUEST_METHOD'] !== "POST") {
    die("<h1>FORBIDDEN</h1>");
}

if (!(isset($_POST['name']) && isset($_POST['password1']))
    || ($_POST['name'] === '' && $_POST['password1'] === '')) 
{
    return http_response_code(403);
}

require_once __DIR__ . '/QueryController.php';

$controller = new QueryController();

$username = $_POST['name'];
$email = $_POST['email'];
$password = $_POST['password1'];

$result = $controller->registerUser($username, $email, $password);

if ($result) {
    header('Location: index.php');
} else {
    http_response_code(500);
    echo "ERROR AL CREAR USUARI";
    die;
}
?>