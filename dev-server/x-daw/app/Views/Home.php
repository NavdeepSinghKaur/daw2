<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <link rel="stylesheet" href="<?= base_url('assets/css/bootstrap.min.css') ?>">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/github-markdown-css/5.2.0/github-markdown.min.css">
    <style>
        .markdown-body {
            box-sizing: border-box;
            min-width: 200px;
            max-width: 980px;
            margin: 0 auto;
            padding: 45px;
        }
    </style>
</head>
<body>

    <?= $this->include('Nav') ?>
    
    <div class="d-flex">
        <a href="<?= base_url('post/new') ?>" class="btn btn-primary mx-auto w-75 rounded-3 fw-bold mb-5">Crear post</a>
    </div>
    
    <?=  view_cell('PostCell') ?>
</body>
</html>