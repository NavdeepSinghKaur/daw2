<nav class="d-flex align-items-center justify-content-center sticky-top bg-white border-bottom p-3 mb-4">
    <!-- El logo siempre estará en el centro -->
    <img src="<?=  base_url('assets/images/logo.png') ?>" alt="Logo" height="30">

    <!-- El botón se sale del flujo para no empujar al logo -->
    <form action="<?= base_url('logout') ?>" method="get" class="position-absolute end-0 me-3">
        <button type="submit" class="btn btn-danger">Tancar sessió</button>
    </form>
</nav>