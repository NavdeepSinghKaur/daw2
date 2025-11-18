<?php
$config = require __DIR__ . '/config.php';

$host = $config['db_host'];
$user = $config['db_user'];
$pass = $config['db_pass'];
$name = $config['db_name'];

$dsn = "mysql:host=$host;dbname=$name;charset=" . $config['db_charset'];

$pdo = new PDO($dsn, $user, $pass);
