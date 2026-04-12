<div class="w-75 mx-auto">
    <?php
    foreach ($posts as $post) {
    ?>
        <div class="border rounded rounded-4 p-3 mb-5">
            <?php
            if ($post['user_id'] === session()->get('id') || session()->get('admin')) {
                echo '<a href="' . base_url('/post/delete/' . $post['id']) . '" class="btn btn-danger rounded-pill px-2 py-0 ms-auto">Eliminar</a>';
            }
            echo "<p class='fw-bold h3 my-2' >{$post['title']}</p>";
            echo "<p>{$converter->convert($post['text'])}</p>";

            if (!empty($post['image_url'])) { 
                foreach($post['image_url'] as $i => $media) {
                    ?>
                    <img class="mb-3" src="data:<?= $post['mime_type'][$i] ?>;base64,<?= $media ?>" style="max-width: 300px; max-height: 300px;">
            <?php }
            }
        
            if (!$isInsideReply) {?>
                <a href="<?= base_url('/post/reply/' . $post['id']) ?>">
                    <img src="<?= base_url('/assets/images/reply.png') ?>" height="20" alt="" class="d-block" srcset="">
                </a>
            <?php 
            }
            $now = new DateTime();
            $created = new DateTime($post['created_at']);
            $created->modify('+30 minutes');
        
            if ( $now < $created && $post['user_id'] === session()->get('id')) {?>
                <a href="<?= base_url('/post/edit/' . $post['id']) ?>">Editar</a>
            <?php }?>
            
            <img src="<?= base_url('/assets/images/download.png') ?>" height="20" alt="" srcset="">
        
            <small>Creat: <?= $post['created_at'] ?></small>

        </div>
    <?php 
    }
    ?>
    <?php if(!$isInsideReply) { echo($pager->links()); } ?>
</div>    
