<?php
include_once __DIR__ . '/pdoStarter.php';

$userTable = "CREATE TABLE IF NOT EXISTS User (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL,
    email VARCHAR(100) NOT NULL,
    userPassword VARCHAR(512) NOT NULL,
    permission TINYINT NOT NULL CHECK (permission IN (10, 20, 30, 40))
);";

$pdo->exec($userTable);

$ArticleTable = "CREATE TABLE IF NOT EXISTS Article (
    id INT AUTO_INCREMENT PRIMARY KEY,
    userId INT NOT NULL,
    FOREIGN KEY (userId) REFERENCES User(id),
    title VARCHAR(200),
    article TEXT NOT NULL
);";

$pdo->exec($ArticleTable);
