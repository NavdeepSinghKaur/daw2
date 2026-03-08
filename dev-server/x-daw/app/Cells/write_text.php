<div class="text-container">
    <form class="p-3 mb-5" action="<?= base_url($this->route) . '/' . $this->postId ?>" method="post" enctype="multipart/form-data">
        <?= csrf_field() ?>
        <div class="form-group">
            <label for="title">Títol</label>
            <input class="form-control mb-2" type="text" name="title" id="title" value="<?php if ($this->route == '/post/edit' && isset($this->title)): echo $this->title; endif; ?>">
        </div>
    
        <?php if ($this->route == '/post/new') { ?>
            <input class="d-block py-3" type="file" name="media[]" id="media" accept="image/*" multiple>
        <?php } ?>
    
        <label class="form-check form-switch mb-3">
            <input class="form-check-input" type="checkbox" name="checkbox" id="checkbox" checked>
            <span class="form-check-label">Públic</span>
        </label>

        <textarea id="text" type="text" name="text"><?php if ($this->route == '/post/edit' && isset($this->text)): echo $this->text; endif; ?></textarea>
        <button type="submit" class="btn btn-primary bg-black border-black rounded-pill fw-bold">Postejar</button>
    </form>
</div>
<script src="https://unpkg.com/easymde/dist/easymde.min.js"></script>
<script>

    var easyMDE = new EasyMDE({ 
        element: document.getElementById('text'),
        spellChecker: false,
        placeholder: "Contingut aquí",
    });
</script>