
<?= view_cell('PostCell', ['post_id' => $parent['id']]) ?>
<?php foreach ($replies as $reply): ?>
    <div>
        <?php
            if ($reply['user_id'] === session()->get('id') || session()->get('admin')) {
                echo '<a href="' . base_url('/post/delete/' . $reply['id']) . '">Eliminar</a>';
            }
        ?>
        <hr>
        <p><?= $reply['title'] ?></p>
        <p><?= $reply['text'] ?></p>
        <a href="<?= base_url('/post/reply/' . $reply['id']) ?>">Reply</a>
    </div>
<?php endforeach; ?>