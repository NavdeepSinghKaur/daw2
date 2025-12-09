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
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    -- FOREIGN KEY (userId) REFERENCES User(id),
    title VARCHAR(200) NOT NULL,
    article TEXT NOT NULL
);";

$pdo->exec($ArticleTable);


$dummyUsers = "INSERT INTO User (username, email, userPassword, permission) VALUES (
    'User1',
    'abc@def.com',
    '1234',
    10
);";

$pdo->exec($dummyUsers);

// article made with AI
$article1 = "INSERT INTO Article (userId, title, article) 
         VALUES 
         (1, 'The Future of Artificial Intelligence', 'Artificial intelligence (AI) is rapidly transforming various industries, from healthcare to entertainment. In the coming years, we expect to see even more advancements in AI that will enhance productivity, improve efficiency, and create new opportunities for businesses and individuals alike. Experts predict that AI will play a pivotal role in automation, data analysis, and decision-making, with implications for almost every aspect of our lives. As we look forward to a future driven by intelligent machines, the ethical implications of AI will become an even more important area of discussion.');";

$article2 = "INSERT INTO Article (userId, title, article) 
         VALUES 
         (1, 'The Importance of Cybersecurity in the Digital Age', 'In today’s increasingly connected world, cybersecurity has never been more crucial. With the rise of cloud computing, IoT devices, and digital currencies, the potential for cyberattacks has grown exponentially. Protecting sensitive information, securing networks, and preventing data breaches are critical for both individuals and businesses. As cyber threats evolve, so must the strategies and technologies used to defend against them. The future of cybersecurity will require a multi-layered approach, combining innovative tools, educated users, and proactive measures to stay one step ahead of cybercriminals.');";

$pdo->exec($article1);
$pdo->exec($article2);