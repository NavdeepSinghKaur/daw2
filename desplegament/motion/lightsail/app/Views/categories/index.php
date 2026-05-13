<?= $this->extend('layout/main') ?>

<?= $this->section('content') ?>
<div style="max-width: 600px; margin: 0 auto;">
    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2rem;">
        <h1>Categories</h1>
    </div>

    <div class="card" style="margin-bottom: 2rem;">
        <h3>Create New Category</h3>
        <form action="/categories/store" method="post" style="margin-top: 1rem; display: flex; gap: 0.5rem;">
            <?= csrf_field() ?>
            <input type="text" name="name" class="form-control" placeholder="Category Name" required>
            <button type="submit" class="btn btn-primary">Create</button>
        </form>
    </div>

    <div class="card">
        <h3>Your Categories</h3>
        <?php if(empty($categories)): ?>
            <p style="margin-top: 1rem; color: var(--text-secondary);">No categories found.</p>
        <?php else: ?>
            <table style="width: 100%; margin-top: 1rem; border-collapse: collapse;">
                <thead>
                    <tr style="text-align: left; border-bottom: 1px solid var(--border);">
                        <th style="padding: 0.5rem 0;">Name</th>
                        <th style="padding: 0.5rem 0; width: 120px;">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    <?php foreach($categories as $category): ?>
                        <tr style="border-bottom: 1px solid var(--border);">
                            <td style="padding: 1rem 0;"><?= esc($category['name']) ?></td>
                            <td style="padding: 1rem 0;">
                                <a href="/categories/edit/<?= $category['id'] ?>" style="color: var(--accent); text-decoration: none; font-size: 0.9rem; margin-right: 0.5rem;">Edit</a>
                                <a href="/categories/delete/<?= $category['id'] ?>" style="color: var(--danger); text-decoration: none; font-size: 0.9rem;" onclick="return confirm('Are you sure? Notes in this category will become uncategorized.')">Delete</a>
                            </td>
                        </tr>
                    <?php endforeach; ?>
                </tbody>
            </table>
        <?php endif; ?>
    </div>
</div>
<?= $this->endSection() ?>
