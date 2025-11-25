<!DOCTYPE html>
<html lang="ca">
<head>
    <meta charset="UTF-8">
    <title><?= getenv('APP_NAME') ?></title>
    <style>
        body { font-family: Arial, sans-serif; margin: 40px; }
        .info { background: #f0f0f0; padding: 20px; border-radius: 8px; }
    </style>
</head>
<body>
    <h1><?= getenv('APP_NAME') ?></h1>
    <div class="info">
        <p><strong>Entorn:</strong> <?= getenv('APP_ENV') ?></p>
        <p><strong>Hostname del contenidor:</strong> <?= gethostname() ?></p>
        <p><strong>Data i hora:</strong> <?= date('d/m/Y H:i:s') ?></p>
    </div>
    <p><a href="info.php">Veure phpinfo()</a></p>
</body>
</html>
