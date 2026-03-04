<div class="w-75 mx-auto">
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
            <a href="<?= base_url('/post/reply/' . $post['id']) ?>">
                <img src="<?= base_url('/assets/images/reply.png') ?>" height="20" alt="" srcset="">
            </a>
        <?php }?>
        <?php
        $now = new DateTime();
        $created = new DateTime($post['created_at']);
        $created->modify('+30 minutes');
    
        if ( $now < $created ) {?>
            <a href="<?= base_url('/post/edit/' . $post['id']) ?>">Editar</a>
        <?php }?>
        
        <img src="<?= base_url('/assets/images/download.png') ?>" height="20" alt="" srcset="">
    
        <small>Creat: <?= $post['created_at'] ?></small>
        <?php
        echo "<hr>";
        ?>
    <?php 
    }
    ?>
</div>    
