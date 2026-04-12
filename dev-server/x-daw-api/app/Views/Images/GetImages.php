<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Visualitzar totes les imatges</title>
    <link rel="stylesheet" href="<?= base_url('assets/css/bootstrap.min.css') ?>">
    <style>
        .image-gallery {
            display: flex;
            flex-wrap: wrap;
            gap: 10px;
        }
        .image-gallery img {
            max-width: 300px;
            max-height: 300px;
            object-fit: cover;
        }
    </style>
</head>
<body>
    <?= $this->include('Nav') ?>
    <div class="d-flex">
        <h1 class="mx-auto fw-bold m-2">Imatges pujades</h1>
    </div>
    <div class="image-gallery">
        <?php
            // if (!empty($base64List['image_url'])) { 
                foreach($images['image_url'] as $i => $media) {
                    ?>
                    <img src="data:<?= $images['mime_type'][$i] ?>;base64,<?= $media ?>" style="max-width: 300px; max-height: 300px;">
            <?php }
            // }
        ?>
    </div>
</body>
</html>