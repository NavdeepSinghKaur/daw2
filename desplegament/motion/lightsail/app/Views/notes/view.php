<?= $this->extend('layout/main') ?>

<?= $this->section('content') ?>
<div style="max-width: 800px; margin: 0 auto;">
    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2rem;">
        <a href="/notes" style="color: var(--text-secondary); text-decoration: none; font-size: 0.9rem;">&larr; Back to notes</a>
        <div style="display: flex; gap: 0.5rem; align-items: center;">
            <div style="position: relative; display: inline-block;" class="dropdown">
                <button class="btn btn-outline">Export &darr;</button>
                <div class="dropdown-content" style="display: none; position: absolute; right: 0; background-color: white; min-width: 120px; box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.1); z-index: 1; border-radius: 4px; border: 1px solid var(--border);">
                    <a href="/notes/export/<?= $note['id'] ?>/txt" style="color: var(--text); padding: 12px 16px; text-decoration: none; display: block; font-size: 0.9rem;">as TXT</a>
                    <a href="/notes/export/<?= $note['id'] ?>/md" style="color: var(--text); padding: 12px 16px; text-decoration: none; display: block; font-size: 0.9rem; border-top: 1px solid var(--border);">as Markdown</a>
                </div>
            </div>

            <?php if(!$note['is_locked']): ?>
                <a href="/notes/lock/<?= $note['id'] ?>" class="btn btn-outline">Lock 🔓</a>
                <a href="/notes/edit/<?= $note['id'] ?>" class="btn btn-outline">Edit</a>
            <?php else: ?>
                <a href="/notes/unlock/<?= $note['id'] ?>" class="btn btn-outline" style="background: #f7f6f3;">Unlock 🔒</a>
                <span class="btn btn-outline" style="opacity: 0.5; cursor: not-allowed; display: none;">Locked</span>
            <?php endif; ?>
            <a href="/notes/delete/<?= $note['id'] ?>" class="btn btn-outline" style="color: var(--danger);" onclick="return confirm('Are you sure you want to delete this note?')">Delete</a>
        </div>
    </div>

    <h1 style="font-size: 2.5rem; font-weight: 700; margin-bottom: 1rem;"><?= esc($note['title']) ?></h1>
    
    <div style="font-size: 0.8rem; color: var(--text-secondary); margin-bottom: 2rem; display: flex; gap: 1.5rem;">
        <span>Created: <?= date('M d, Y H:i', strtotime($note['created_at'])) ?></span>
        <span>Last updated: <?= date('M d, Y H:i', strtotime($note['updated_at'])) ?></span>
    </div>

    <div style="font-size: 1.1rem; line-height: 1.6; white-space: pre-wrap;"><?= esc($note['content']) ?></div>
</div>
<?= $this->endSection() ?>
