<form action="<?= base_url('/post/new') ?>" method="post" enctype="multipart/form-data">

    <input type="text" name="title" id="title">
    <input type="text" name="text" id="text">

    <input type="file" name="media[]" id="media" accept="image/*" multiple>

    <label class="switch-visibility">
        <input type="checkbox" name="checkbox" id="checkbox">
        <span class="slider-round"></span>
    </label>

    <button type="submit">Postejar</button>
</form>