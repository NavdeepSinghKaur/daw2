<?php
// index.php
$config = require '../Config/config.php'; // Carrega l'array de configuració

// Utilitzar les variables per a la connexió PDO
$host = $config['db_host'];
$user = $config['db_user'];
$pass = $config['db_pass'];
$name = $config['db_name'];

$dsn = "mysql:host=$host;dbname=$name;charset=" . $config['db_charset'];

try {
    $pdo = new PDO($dsn, $user, $pass);
    echo "Connexió establerta sense phpdotenv. ✅";
} catch (PDOException $e) {
    die("Error de connexió: " . $e->getMessage());
}