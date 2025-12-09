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
    
    /**
     * Returns all users inside User table
     */
    public function printAllUsers() 
    {
        global $pdo;
        $sql = "SELECT id, username, email, permission FROM User";

        $stmt = $pdo->query($sql);

        $stmt->execute();

        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    /**
     * Returns the id, title, article and username of an article
     * 
     * @return array An array of all the articles 
     */
    function getArticle() 
    {
        global $pdo;
        $sql = "SELECT A.id, A.title, A.article, U.username FROM Article A INNER JOIN User U ON A.userId = U.id ORDER BY A.id DESC;";    

        $stmt = $pdo->prepare($sql);
        $stmt->execute();

        $results = $stmt->fetchAll(PDO::FETCH_ASSOC);
        return $results;
    }

    /**
     * Inserts a user on User table
     */
    function registerUser($name, $email, $passwd, $level = null) 
    {
        global $pdo;
        $hashedPasswd = password_hash($passwd, PASSWORD_DEFAULT);
        if ($level !== null) {
            $sql = "INSERT INTO User (username, email, userpassword, permission) VALUES (?, ?, ?, $level)";
        } else {
            $sql = "INSERT INTO User (username, email, userpassword, permission) VALUES (?, ?, ?, 10)";
        }
        
        $stmt = $pdo->prepare($sql);
        return $stmt->execute([$name, $email, $hashedPasswd]);
    
    }

    function loginUser($name, $passwd) 
    {
        global $pdo;
        $sql = "SELECT * FROM User WHERE email = ?";
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
            $_SESSION['userId'] = $storedUser['id'];
            $_SESSION['level'] = $storedUser['permission'];
            
            return true;

        } else {
            http_response_code(403);
        }

    }
    
    function getUserArticles($offset = null)
    {
        global $pdo;

        if (!is_null($offset)) {
            $sql = "SELECT * FROM Article A WHERE A.userId = ? LIMIT 10 OFFSET ?";
            $stmt = $pdo->prepare($sql);
            $stmt->execute([$_SESSION['userId'], 0]);
            return $stmt->fetchAll(PDO::FETCH_ASSOC);
        } else {
            $sql = "SELECT * FROM Article A WHERE A.userId = ?";
            $stmt = $pdo->prepare($sql);
            $stmt->execute([$_SESSION['userId']]);
            return $stmt->fetchAll(PDO::FETCH_ASSOC);
        }
    }

    function getAllArticles($offset=null)
    {
        global $pdo;

        if (!is_null($offset)) {
            $sql = "SELECT * FROM Article LIMIT 10 OFFSET ?";
            $stmt = $pdo->prepare($sql);
            $stmt->execute([$offset]);
            return $stmt->fetchAll(PDO::FETCH_ASSOC);
        } else {
            $sql = "SELECT * FROM Article;";
            $stmt = $pdo->prepare($sql);
            $stmt->execute();
            return $stmt->fetchAll(PDO::FETCH_ASSOC);
        }

    }

    function addUser($userName, $userEmail, $userPassword, $userLevel)
    {
        global $pdo;
        
        $sql = "INSERT INTO User (username, email, userPassword, persmission) VALUES (?, ?, ?, ?)";

        $stmt = $pdo->prepare($sql);
        return $stmt->execute([$userName, $userEmail, $userPassword, $userLevel]);
        
    }

    function createArticle($title, $article)
    {
        global $pdo;

        $sql = "INSERT INTO Article (userId, title, article) VALUES (?, ?, ?)";
        $stmt = $pdo->prepare($sql);
        
        return $stmt->execute([$_SESSION['userId'], $title, $article]);

    }

    function getArticleData($articleId)
    {
        global $pdo;

        $sql = "SELECT userId FROM Article WHERE id = ?";

        $stmt = $pdo->prepare($sql);

        $stmt->execute([$articleId]);

        return $stmt->fetch(PDO::FETCH_ASSOC);
    }

    function deleteArticle($articleId)
    {
        global $pdo;
        
        $sql = "DELETE FROM Article WHERE id = ?";
        
        $stmt = $pdo->prepare($sql);
        
        return $stmt->execute([$articleId]);

    }

    function deleteUser($userId)
    {
        global $pdo;

        $sql = "DELETE FROM User WHERE id = ?";

        $stmt = $pdo->prepare($sql);

        return $stmt->execute([$userId]);
    }

    function editArticle($articleId, $newTitle, $newArticle)
    {
        global $pdo;
        
        $sql = "UPDATE Article SET title = ?, article = ? WHERE id = ?";
        
        $stmt = $pdo->prepare($sql);
        
        return $stmt->execute([$newTitle, $newArticle, $articleId]);

    }

    function changeUserLevel($userId, $newLevel)
    {
        global $pdo;

        $sql = "UPDATE User SET permission = ? WHERE id = ?";
        
        $stmt = $pdo->prepare($sql);
        
        return $stmt->execute([$newLevel, $userId]);
    }
}