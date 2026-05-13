<?= $this->extend('layout/main') ?>

<?= $this->section('content') ?>
<div style="max-width: 400px; margin: 4rem auto;">
    <div class="card">
        <h1 style="margin-bottom: 1.5rem; text-align: center;">Log in</h1>
        <form action="/login" method="post">
            <?= csrf_field() ?>
            <div class="form-group">
                <label for="email">Email</label>
                <input type="email" name="email" id="email" class="form-control" value="<?= old('email') ?>" required>
            </div>
            <div class="form-group">
                <label for="password">Password</label>
                <input type="password" name="password" id="password" class="form-control" required>
            </div>
            <button type="submit" class="btn btn-primary" style="width: 100%; padding: 0.75rem;">Log in</button>
        </form>
        <p style="margin-top: 1.5rem; text-align: center; font-size: 0.9rem; color: var(--text-secondary);">
            Don't have an account? <a href="/register" style="color: var(--accent); text-decoration: none;">Sign up</a>
        </p>
    </div>
</div>
<?= $this->endSection() ?>
