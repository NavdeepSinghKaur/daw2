<?php foreach ($replies as $reply): ?>
    <div>
        <?php
            if ($reply['user_id'] === session()->get('id') || session()->get('admin')) {
                echo '<a href="' . base_url('/post/delete/' . $reply['id']) . '">Eliminar</a>';
            }
        ?>
        <p><?= $parent['title'] ?></p>
        <p><?= $parent['text'] ?></p>
        <hr>
        <p><?= $reply['title'] ?></p>
        <p><?= $reply['text'] ?></p>
        <a href="<?= base_url('/post/reply/' . $reply['id']) ?>">Reply</a>
        <?= view_cell('PostReplyCell', ['post_id' => $reply['id']]) ?>
    </div>
<?php endforeach; ?>