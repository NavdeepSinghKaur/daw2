<?php
session_start();

$_SESSION['editedArticle'] = $_GET['id'];

include __DIR__ . '/../../header.php';

?>

    <form action="EditArticleController.php" method="post">
        <label for="title">Títol</label>
        <input type="text" id="title" name="title" value="<?php echo htmlspecialchars($_GET['title']) ?>">
        
        <label for="article">Article</label>
        <textarea id="article" name="article" ><?php echo htmlspecialchars($_GET['article']) ?></textarea>

        <button type="submit">Guardar canvi</button>
    </form>
</body>
</html>