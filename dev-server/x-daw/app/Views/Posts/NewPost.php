<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Crear post</title>
    <link rel="stylesheet" href="https://unpkg.com/easymde/dist/easymde.min.css">
    <link rel="stylesheet" href="<?= base_url('assets/css/bootstrap.min.css') ?>">
    <style>
        .text-container { max-width: 900px; margin: 0 auto; font-family: sans-serif; }
    </style>
</head>
<body>
    <?= $this->include('Nav') ?>
    <?php $parameters = ['route' => '/post/new', 'userId' => session()->get('id')];?>
    <?= view_cell('WriteTextCell', ['parameters' => $parameters]) ?>;
</body>
</html>