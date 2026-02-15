<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <form action="<?= base_url('login') ?>" method="post">
        <?= csrf_field() ?>

        <input 
        type="email"
        name="email"
        id="email"
        value="<?= old('email') ?>"

        >
        <input type="password" name="password" id="password">
        <button type="submit">Iniciar sessió</button>
    </form>
</body>
</html>