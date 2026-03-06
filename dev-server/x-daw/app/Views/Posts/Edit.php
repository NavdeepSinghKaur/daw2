<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Crear post</title>
    <link rel="stylesheet" href="https://unpkg.com/easymde/dist/easymde.min.css">
    <style>
        /* Opcional: Ajustos pel contenidor */
        .text-container { max-width: 900px; margin: 0 auto; font-family: sans-serif; }
    </style>
</head>
<body>
    <?php
    // print_r($post);
    // die;
    ?>
    <?= view_cell('WriteTextCell', 
    [
        'userId' => session()->get('id'), 
        'route' => '/post/edit',
        'postId' => $post['id'],
        'title' => $post['title'], 
        'text' => $post['text']
    ]) ?>;
</body>
</html>