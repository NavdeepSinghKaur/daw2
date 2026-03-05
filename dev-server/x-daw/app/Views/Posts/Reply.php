<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <link rel="stylesheet" href="<?= base_url('assets/css/bootstrap.min.css') ?>">
</head>
<body>
    <?= $this->include('Nav') ?>
    
    <form action="<?= base_url('/post/reply') ?>" method="post">
        <input type="text" name="parent_id" id="parent_id" value="<?= $parent_id ?>">
        <input type="text" name="title" id="title">
        <input type="text" name="text" id="text">
        <button type="submit">Post</button>
    </form>
    <?= view_cell('PostReplyCell', ['post_id' => $parent_id]) ?>
</body>
</html>