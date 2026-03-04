<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Iniciar sessió</title>
    <link rel="stylesheet" href="<?= base_url('assets/css/bootstrap.min.css') ?>">
</head>
<body>
    <form action="<?= base_url('login') ?>" method="post" class="d-flex flex-column w-25 m-auto mt-5 border p-5 rounded rounded-4">
        <?= csrf_field() ?>

        <label for="email">Correu</label>
        <input 
        type="email"
        name="email"
        id="email"
        class="form-control mb-3"
        value="<?= old('email') ?>"

        >
        <label for="password">Contrasenya</label>
        <input type="password" name="password" id="password" class="form-control mb-3">

        <img src="<?= base_url('captcha') ?>" alt="" srcset="">
        <label for="captcha-answer">Resol el captcha</label>
        <input type="text" name="captcha-answer" id="captcha-answer" class="form-control mb-3">

        <button type="submit" class="btn btn-primary bg-black rounded-pill">Iniciar sessió</button>
    </form>
</body>
</html>