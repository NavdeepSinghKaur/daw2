<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <link rel="stylesheet" href="<?= base_url('assets/css/bootstrap.min.css') ?>">
    <style>
        /* Opcional: Ajustos pel contenidor */
        .text-container { max-width: 900px; margin: 0 auto; font-family: sans-serif; }
    </style>
</head>
<body>
    <?= $this->include('Nav') ?>
    
    <?php $parameters = [
        'userId' => session()->get('id'), 
        'route' => '/post/reply',
        'parentId' => $parent_id
    ]; ?>
    <?= view_cell('WriteTextCell', ['parameters' => $parameters]) ?>

    <?= view_cell('PostReplyCell', ['post_id' => $parent_id]) ?>
</body>
</html>