<?php


CREATE TABLE User (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL,
    email VARCHAR(100) NOT NULL,
    userPassword VARCHAR(120) NOT NULL,
    permission TINYINT NOT NULL CHECK (permission IN (10, 20, 30, 40))
);

CREATE TABLE Article (
    id INT AUTO_INCREMENT PRIMARY KEY,
    userId INT NOT NULL,
    FOREIGN KEY (userId) REFERENCES User(id)
);