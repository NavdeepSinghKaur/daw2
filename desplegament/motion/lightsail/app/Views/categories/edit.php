<?= $this->extend('layout/main') ?>

<?= $this->section('content') ?>
<div style="max-width: 400px; margin: 4rem auto;">
    <div class="card">
        <h1 style="margin-bottom: 1.5rem; text-align: center;">Edit Category</h1>
        <form action="/categories/update/<?= $category['id'] ?>" method="post">
            <?= csrf_field() ?>
            <div class="form-group">
                <label for="name">Category Name</label>
                <input type="text" name="name" id="name" class="form-control" value="<?= old('name', $category['name']) ?>" required autofocus>
            </div>
            <div style="display: flex; gap: 1rem; margin-top: 2rem;">
                <button type="submit" class="btn btn-primary" style="flex: 1;">Update</button>
                <a href="/categories" class="btn btn-outline" style="flex: 1; text-align: center;">Cancel</a>
            </div>
        </form>
    </div>
</div>
<?= $this->endSection() ?>
