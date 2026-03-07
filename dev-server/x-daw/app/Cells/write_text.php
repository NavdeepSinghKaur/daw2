<div class="text-container">
    <form action="<?= base_url($this->route) . '/' . $this->postId ?>" method="post" enctype="multipart/form-data">
    
        <label for="title">Títol</label>
        <input type="text" name="title" id="title" value="<?php if ($this->route == '/post/edit' && isset($this->title)): echo $this->title; endif; ?>">
    
        <input type="file" name="media[]" id="media" accept="image/*" multiple>
    
        <label class="switch-visibility">
            <span class="slider-round">Visibilitat</span>
            <input type="checkbox" name="checkbox" id="checkbox" checked>
        </label>

        <label>Contingut</label>
        <textarea id="text" type="text" name="text"><?php if ($this->route == '/post/edit' && isset($this->text)): echo $this->text; endif; ?></textarea>
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