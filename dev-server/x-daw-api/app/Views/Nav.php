<nav class="navbar sticky-top bg-white border-bottom p-3 mb-4 position-relative">
    <div class="container-fluid d-flex align-items-center justify-content-end">
        
        <div class="position-absolute start-50 translate-middle-x">
            <a href="<?= base_url('/') ?>">
                <img src="<?= base_url('/assets/images/logo/logo-black.png') ?>" alt="Logo" height="30">
            </a>
        </div>

        <div class="d-flex align-items-center gap-2">
            <a href="<?= base_url('/media') ?>" class="btn btn-primary bg-black fw-bold btn-sm rounded-pill">
                Imatges pujades
            </a>
            <form action="<?= base_url('logout') ?>" method="get" class="m-0">
                <button type="submit" class="btn btn-danger btn-sm fw-bold rounded-pill">Tancar sessió</button>
            </form>
        </div>
        
    </div>
</nav>
