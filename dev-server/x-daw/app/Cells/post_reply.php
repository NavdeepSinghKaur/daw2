<div class="wh-100 mx-auto">
    <?= view_cell('PostCell', ['post_id' => $parent['id']]) ?>
    <div class="w-75 mx-auto">
        <?php foreach ($replies as $reply): ?>
        <div class="w-75 ms-auto border rounded rounded-4 p-3 mb-5">
            <?php
                if ($reply['user_id'] === session()->get('id') || session()->get('admin')) {
                    echo '<a href="' . base_url('/post/delete/' . $reply['id']) . '" class="btn btn-danger rounded-pill px-2 py-0 ms-auto">Eliminar</a>';
                }
            ?>
    
            <p class='fw-bold h3 my-2'><?= $reply['title'] ?></p>
            <p><?= $reply['text'] ?></p>
            <a href="<?= base_url('/post/reply/' . $reply['id']) ?>">Reply</a>
        </div>
        <?php endforeach; ?>
    </div>
</div>