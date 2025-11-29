<?php

$config = [
    'db_host' => 'localhost',
    'db_user' => 'root',
    'db_pass' => '',
    'db_name' => 'diari_digital',
    'db_charset' => 'utf8mb4'
];

$host = $config['db_host'];
$user = $config['db_user'];
$pass = $config['db_pass'];
$name = $config['db_name'];

$dsn = "mysql:host=$host;dbname=$name;charset=" . $config['db_charset'];

$pdo = new PDO($dsn, $user, $pass);
