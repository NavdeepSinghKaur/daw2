<?php

foreach ($posts as $post) {
    if ($post['user_id'] === session()->get('id') || session()->get('admin')) {
        echo '<a href="' . base_url('/post/delete/' . $post['id']) . '">Eliminar</a>';
    }
    echo "<h2>{$post['title']}</h2>";
    echo "<p>{$post['text']}</p>";
    ?>

    <?php if (!empty($post['image_url'])) { 
        foreach($post['image_url'] as $i => $media) {
            ?>
            <img src="data:<?= $post['mime_type'][$i] ?>;base64,<?= $media ?>" style="max-width: 300px; max-height: 300px;">
        <?php } ?>
    <?php } ?>

    <?php if (!$isInsideReply) {?>
        <a href="<?= base_url('/post/reply/' . $post['id']) ?>">Reply</a>
    <?php }?>
    <?php if ($post['created_at'] < date('Y-m-d H:i:s')) {?>
        <a href="<?= base_url('/post/edit/' . $post['id']) ?>">Editar</a>
    <?php }?>
    <button>Descarregar</button>
    <?php
    echo "<hr>";
    ?>
<?php 
}
?>

