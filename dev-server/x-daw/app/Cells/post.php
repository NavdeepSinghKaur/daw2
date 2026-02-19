<?php

foreach ($posts as $post) {
    if ($post['user_id'] === session()->get('id') || session()->get('admin')) {
        echo '<a href="' . base_url('/post/delete/' . $post['id']) . '">Eliminar</a>';
    }
    echo "<h2>{$post['title']}</h2>";
    echo "<p>{$post['text']}</p>";
    echo "<hr>";
    ?>
    <a href="<?= base_url('/post/reply/' . $post['id']) ?>">Reply</a>
<?php 
}
?>

