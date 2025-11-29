
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Your Site</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-sRIl4kxILFvY47J16cr9ZwB07vP4J8+LH7qKQnuqkuIAvNWLzeN8tE5YBujZqJLB" crossorigin="anonymous">
</head>
<body>

<nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <div class="container-fluid">
        <a class="navbar-brand" href="/diari_digital/">Diari Digital</a>

        <div class="collapse navbar-collapse" id="navbarContent">
            <ul class="navbar-nav ms-auto">

                <?php
                if (!isset($_SESSION['level'])) {
                ?>
                    <li class="nav-item"><a class="nav-link" href="Login/Login.php">Iniciar sessió</a></li>
                    <li class="nav-item"><a class="nav-link" href="Register/Register.php">Registrar-se</a></li>
                <?php
                } else {
                    if ($_SESSION['level'] >= 10) {
                ?>
                    <li class="nav-item"><a class="nav-link" href="Logged/Shared/Logout.php">Tancar Sessió</a></li>
                    <li class="nav-item"><a class="nav-link" href="Logged/Shared/Profile.php">El meu perfil</a></li>
                    <li class="nav-item"><a class="nav-link" href="Logged/Shared/FavoriteArticles.php">Articles preferits</a></li>
                    <li class="nav-item"><a class="nav-link" href="Logged/Shared/Settings.php">Configuració</a></li>
                <?php
                    }
                    if ($_SESSION['level'] >= 20) {
                ?>
                    <li class="nav-item"><a class="nav-link" href="Logged/Articles/ArticleArea.php">Gestionar articles</a></li>
                <?php
                    }
                    if ($_SESSION['level'] >= 30) {
                ?>
                    <li class="nav-item"><a class="nav-link" href="Logged/Users/UserAdminArea.php">Gestionar usuaris</a></li>
                <?php
                    }
                }
                ?>

            </ul>
        </div>
    </div>
</nav>