<?php
session_start();

$_SESSION['editedArticle'] = $_GET['id'];

?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Edit Article</title>
    <!-- <script src="editArticleScript.js"></script> -->
</head>
<body>
    <form action="EditArticleController.php" method="post">
        <label for="title">Títol</label>
        <input type="text" id="title" name="title" value="<?php echo htmlspecialchars($_GET['title']) ?>">
        
        <label for="article">Article</label>
        <textarea id="article" name="article" ><?php echo htmlspecialchars($_GET['article']) ?></textarea>

        <button type="submit">Guardar canvi</button>
    </form>
</body>
</html>