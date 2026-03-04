<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <link rel="stylesheet" href="<?= base_url('assets/css/bootstrap.min.css') ?>">
</head>
<body>
    <nav class="d-flex align-items-center justify-content-center sticky-top bg-white border-bottom p-3 mb-4">
        <!-- El logo siempre estará en el centro -->
        <img src="assets/images/logo/logo-black.png" alt="Logo" height="30">

        <!-- El botón se sale del flujo para no empujar al logo -->
        <form action="<?= base_url('logout') ?>" method="get" class="position-absolute end-0 me-3">
            <button type="submit" class="btn btn-danger">Tancar sessió</button>
        </form>
    </nav>

    
    
    <a href="<?= base_url('post/new') ?>" class="btn btn-primary">Crear post</a>
    
    <?=  view_cell('PostCell') ?>
</body>
</html>