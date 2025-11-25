<?php
// $code = "7c1a52882a913a3ad0fe67ebfe220659c4621a8828432350aec45cfa7d40dbc6";
// if (!defined('APP_CODE_WPDKJDLOXHN') || APP_CODE_WPDKJDLOXHN !== $code) {
//     return http_response_code(403);
// }

require_once 'pdoStarter.php';

class QueryController 
{

    public function __construct()
    {
    }
    
    public function printEverything() 
    {
        global $pdo;
        $sql = "SELECT * FROM User";

        $stmt = $pdo->query($sql);

        return $stmt->fetchAll();
    }

    function getArticle() 
    {
        global $pdo;
        $sql = "SELECT A.id, A.title, A.article, U.username FROM Article A INNER JOIN User U ON A.userId = U.id ORDER BY A.id DESC;";    

        $stmt = $pdo->prepare($sql);
        $stmt->execute();

        $results = $stmt->fetchAll(PDO::FETCH_ASSOC);
        return $results;
    }

    function registerUser($name, $email, $passwd) 
    {
        global $pdo;
        $hashedPasswd = password_hash($passwd, PASSWORD_DEFAULT);

        $sql = "INSERT INTO User (username, email, userpassword, permission) VALUES (?, ?, ?, 10)";
        
        $stmt = $pdo->prepare($sql);
        $stmt->execute([$name, $email, $hashedPasswd]);
    
    }

    function loginUser($name, $passwd) 
    {
        global $pdo;
        $sql = "SELECT email, userPassword FROM User WHERE email = ?";
        $stmt = $pdo->prepare($sql);
        echo $sql;
        $stmt->execute([$name]);
        echo "abcd";
        $storedUser = $stmt->fetch(PDO::FETCH_ASSOC);
        echo "acbd";
        print_r ($storedUser);
        
        if (!$storedUser) {
            return http_response_code(404);
        }

        if (password_verify($passwd, $storedUser['userPassword'])) {
            http_response_code(404);
        } else {
            http_response_code(403);
        }

    }
    
    function getArticles($level)
    {
        global $pdo;

        if ($level === 20) {
            $sql = "SELECT A.id, A.title, A.article, U.username FROM Article A INNER JOIN User U ON A.userId = U.id ORDER BY A.id DESC;";

            $stmt = $pdo->prepare($sql);
        }
    }
}