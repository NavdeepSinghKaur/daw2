<?php

$config = require_once './config.php';

$host = $config['db_host'];
$user = $config['db_user'];
$pass = $config['db_pass'];
$name = $config['db_name'];

$dsn = "mysql:host=$host;dbname=$name;charset=" . $config['db_charset'];

$pdo = new PDO($dsn, $user, $pass);

$userTable = "CREATE TABLE IF NOT EXISTS User (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL,
    email VARCHAR(100) NOT NULL,
    userPassword VARCHAR(120) NOT NULL,
    permission TINYINT NOT NULL CHECK (permission IN (10, 20, 30, 40))
);";

$pdo->exec($userTable);

$ArticleTable = "CREATE TABLE IF NOT EXISTS Article (
    id INT AUTO_INCREMENT PRIMARY KEY,
    userId INT NOT NULL,
    FOREIGN KEY (userId) REFERENCES User(id)
);";

$pdo->exec($ArticleTable);