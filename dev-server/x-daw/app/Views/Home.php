<img src="assets/images/logo/logo-black.png" alt="" height="100">
<h1>X-Daw</h1>

<form action="<?= base_url('logout') ?>" method="get">
    <button type="submit">Tancar sessió</button>
</form>

<a href="<?= base_url('post/new') ?>">Crear post</a>

<?=  view_cell('PostCell') ?>