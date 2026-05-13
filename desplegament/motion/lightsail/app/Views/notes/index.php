<?= $this->extend('layout/main') ?>

<?= $this->section('content') ?>
<div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2rem;">
    <h1>My Notes</h1>
    <a href="/notes/create" class="btn btn-primary">+ New Note</a>
</div>

<div class="card" style="margin-bottom: 2rem; padding: 1rem;">
    <form action="/notes" method="get" style="display: flex; gap: 1rem; flex-wrap: wrap;">
        <div style="flex: 1; min-width: 200px;">
            <input type="text" name="search" class="form-control" placeholder="Search notes..." value="<?= esc($search) ?>">
        </div>
        <div style="width: 200px;">
            <select name="category" class="form-control">
                <option value="">All Categories</option>
                <?php foreach($categories as $category): ?>
                    <option value="<?= $category['id'] ?>" <?= $selectedCategory == $category['id'] ? 'selected' : '' ?>>
                        <?= esc($category['name']) ?>
                    </option>
                <?php endforeach; ?>
            </select>
        </div>
        <button type="submit" class="btn btn-outline">Filter</button>
        <?php if($search || $selectedCategory): ?>
            <a href="/notes" class="btn btn-outline" style="color: var(--danger);">Clear</a>
        <?php endif; ?>
    </form>
</div>

<?php if(empty($notes)): ?>
    <div style="text-align: center; padding: 4rem; color: var(--text-secondary);">
        <p>No notes found matching your criteria.</p>
        <a href="/notes/create" style="color: var(--accent); text-decoration: none;">Create a new note</a>
    </div>
<?php else: ?>
    <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 1.5rem;">
        <?php foreach($notes as $note): ?>
            <div class="card" style="padding: 1.5rem; display: flex; flex-direction: column; justify-content: space-between; position: relative; transition: transform 0.2s; cursor: pointer;" onclick="window.location='/notes/show/<?= $note['id'] ?>'">
                <?php if($note['is_locked']): ?>
                    <span style="position: absolute; top: 1rem; right: 1rem; font-size: 0.7rem; background: #fff5f5; color: var(--danger); padding: 0.2rem 0.5rem; border-radius: 4px; border: 1px solid #fed7d7;">Locked 🔒</span>
                <?php endif; ?>
                <div>
                    <?php 
                        $catName = 'Uncategorized';
                        foreach($categories as $cat) {
                            if($cat['id'] == $note['category_id']) {
                                $catName = $cat['name'];
                                break;
                            }
                        }
                    ?>
                    <span style="font-size: 0.75rem; color: var(--accent); font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em;"><?= esc($catName) ?></span>
                    <h3 style="margin: 0.5rem 0;"><?= esc($note['title']) ?></h3>
                    <p style="font-size: 0.9rem; color: var(--text-secondary); margin-bottom: 1rem;">
                        <?= mb_strimwidth(strip_tags($note['content']), 0, 80, '...') ?>
                    </p>
                </div>
                <div style="font-size: 0.8rem; color: var(--text-secondary);">
                    Updated <?= date('M d, Y', strtotime($note['updated_at'])) ?>
                </div>
            </div>
        <?php endforeach; ?>
    </div>

    <div style="margin-top: 3rem;">
        <?= $pager->links('notes', 'default_full') ?>
    </div>
<?php endif; ?>
<?= $this->endSection() ?>
