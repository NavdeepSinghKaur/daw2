<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Crear post</title>
    <link rel="stylesheet" href="https://unpkg.com/easymde/dist/easymde.min.css">
    <style>
        /* Opcional: Ajustos pel contenidor */
        .container { max-width: 900px; margin: 0 auto; font-family: sans-serif; }
    </style>
</head>
<body>
    <div class="container">
        <form action="<?= base_url('/post/new') ?>" method="post" enctype="multipart/form-data">
        
            <input type="text" name="title" id="title">
            <!-- <input type="text" name="text" id="text"> -->
        
            <input type="file" name="media[]" id="media" accept="image/*" multiple>
        
            <label class="switch-visibility">
                <input type="checkbox" name="checkbox" id="checkbox">
                <span class="slider-round"></span>
            </label>
        
            <label>Contingut:</label>
            <textarea id="text" type="text" name="text"></textarea>
            <button type="submit">Postejar</button>
        </form>
    </div>
    <script src="https://unpkg.com/easymde/dist/easymde.min.js"></script>
    <script>

    var easyMDE = new EasyMDE({ 
        element: document.getElementById('text'),
        spellChecker: false,
        placeholder: "Escriu aquí fent servir Markdown (## Títol, **negreta**...)",
    });
</script>
</body>
</html>