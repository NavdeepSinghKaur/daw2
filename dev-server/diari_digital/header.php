<?php
session_start();

?>

<header>
    <ul>
        <?php
        if (!isset($_SESSION['level'])) {
        ?>
            <li><a href="Login/Login.php">Iniciar sessió</a></li>
            <li><a href="Register.php">Registrar-se</a></li>
        <?php
        }
        ?>
        <?php
        if (isset($_SESSION['level'])) {
            if ($_SESSION['level'] >= 10) {
        ?>
                <li><a href="Logged/Shared/Logout.php">Tancar Sessió</a></li>
                <li><a href="Logged/Shared/Profile.php">El meu perfil</a></li>
                <li><a href="Logged/Shared/FavoriteArticles.php">Articles preferits</a></li>
                <li><a href="Logged/Shared/Settings.php">Configuració</a></li>
        <?php
            }
            if ($_SESSION['level'] >= 20) {
                ?>
                <li><a href="Logged/Articles/ArticleArea.php">Gestionar articles</a></li>
        <?php
            }
            if (isset($_SESSION['level'])) {
                if ($_SESSION['level'] >= 30) {
        ?>
                    <li><a href="Logged/Users/UserAdminArea.php">Gestionar usuaris</a></li>
        <?php
                }
            }
        }
        ?>
    </ul>
</header>