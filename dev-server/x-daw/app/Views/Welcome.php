<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>X daw</title>
    <link rel="stylesheet" href="<?= base_url('assets/css/bootstrap.min.css') ?>">

</head>
<body class="bg-white">
    <div class="container vh-100 d-flex align-items-center justify-content-center">
        <div class="row w-100 align-items-center">
            
            <div class="col-6 d-flex justify-content-center">
                <img src="assets/images/logo/logo-black.png" alt="X Logo" style="height: 300px; width: auto;">
            </div>

            <div class="col-5">
                <h1 class="fw-bold mb-5" style="font-size: 4rem; letter-spacing: -2px;">Uneix-te avui</h1>
                <!-- <h2 class="fw-bold mb-4">Únete hoy.</h2> -->
                
                <div class="d-grid gap-2 w-75">
                    <a href="/register" class="btn btn-dark rounded-pill fw-bold py-2 mb-2">
                        Crear compte
                    </a>
                    
                    <div class="d-flex align-items-center my-2">
                        <hr class="flex-grow-1"> <span class="mx-2 text-secondary">o</span> <hr class="flex-grow-1">
                    </div>

                    <!-- <h5 class="fw-bold mt-4 mb-3">¿Ya tienes cuenta?</h5> -->
                    <a href="/login" class="btn btn-outline-primary rounded-pill fw-bold py-2">
                        Iniciar sesió
                    </a>
                </div>
            </div>

        </div>
    </div>
</body>

</html>