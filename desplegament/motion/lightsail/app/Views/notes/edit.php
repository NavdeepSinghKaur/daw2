<?= $this->extend('layout/main') ?>

<?= $this->section('content') ?>
<div style="max-width: 800px; margin: 0 auto;">
    <a href="/notes/show/<?= $note['id'] ?>" style="color: var(--text-secondary); text-decoration: none; font-size: 0.9rem; display: block; margin-bottom: 1rem;">&larr; Back to note</a>
    <h1>Edit Note</h1>
    
    <form action="/notes/update/<?= $note['id'] ?>" method="post" style="margin-top: 2rem;">
        <?= csrf_field() ?>
        <div class="form-group">
            <input type="text" name="title" id="title" class="form-control" placeholder="Note Title" style="font-size: 2rem; font-weight: 700; border: none; padding: 0.5rem 0;" value="<?= old('title', $note['title']) ?>" required>
        </div>
        <div class="form-group">
            <select name="category_id" id="category_id" class="form-control" style="width: auto; border: 1px solid var(--border); padding: 0.3rem 0.6rem; font-size: 0.9rem;">
                <option value="">Uncategorized</option>
                <?php foreach($categories as $category): ?>
                    <option value="<?= $category['id'] ?>" <?= old('category_id', $note['category_id']) == $category['id'] ? 'selected' : '' ?>>
                        <?= esc($category['name']) ?>
                    </option>
                <?php endforeach; ?>
            </select>
        </div>
        <div class="form-group">
            <textarea name="content" id="content" class="form-control" rows="15" placeholder="Start writing..." style="border: none; padding: 0.5rem 0; resize: none; font-size: 1.1rem;"><?= old('content', $note['content']) ?></textarea>
        </div>
        <div style="display: flex; gap: 1rem; margin-top: 2rem; border-top: 1px solid var(--border); padding-top: 1.5rem;">
            <button type="submit" class="btn btn-primary">Update Note</button>
            <a href="/notes/show/<?= $note['id'] ?>" class="btn btn-outline">Cancel</a>
        </div>
    </form>
</div>
<?= $this->endSection() ?>
