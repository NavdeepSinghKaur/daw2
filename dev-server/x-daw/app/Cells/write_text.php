<div class="text-container">
    <form action="<?= base_url('/post/new') ?>" method="post" enctype="multipart/form-data">
    
        <label for="title">Títol</label>
        <input type="text" name="title" id="title">
    
        <input type="file" name="media[]" id="media" accept="image/*" multiple>
    
        <label class="switch-visibility">
            <span class="slider-round">Visibilitat</span>
            <input type="checkbox" name="checkbox" id="checkbox" checked>
        </label>

        llevar todo esto después en una cell, y cargar la info allí directamente, así simplificamos y cumplimos DRY
        <label>Contingut</label>
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