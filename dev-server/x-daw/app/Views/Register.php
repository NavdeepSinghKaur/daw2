<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Registrar-se</title>
    <link rel="stylesheet" href="<?= base_url('assets/css/bootstrap.min.css') ?>">
</head>
<body>
    <div class="register-container">
        
        <?php if (session()->getFlashdata('errors')): ?>
            <div class="error-message">
                <strong>No s'ha pogut generar l'usuari:</strong>
                <ul>
                    <?php foreach (session()->getFlashdata('errors') as $error): ?>
                        <li><?= esc($error) ?></li>
                    <?php endforeach; ?>
                </ul>
            </div>
        <?php endif; ?>
        
        <?php if (session()->getFlashdata('success')): ?>
            <div class="success-message">
                <?= esc(session()->getFlashdata('success')) ?>
            </div>
        <?php endif; ?>
        
        <form action="<?= base_url('register') ?>" method="post" class="d-flex flex-column w-25 m-auto mt-5 border p-5 rounded rounded-4">
            <h1 class="fw-bold mb-5" style="letter-spacing: -2px;">Crea el teu compte</h1>
            <?= csrf_field() ?>
            
            <div class="form-group">
                <label for="name">Nom - minim 3 caracters</label>
                <input 
                    type="text" 
                    id="name" 
                    name="name" 
                    value="<?= old('name') ?>"
                    class="form-control <?= session()->getFlashdata('errors') && isset(session()->getFlashdata('errors')['name']) ? 'input-error' : '' ?>"
                >
            </div>
            
            <div class="form-group">
                <label for="email">Email</label>
                <input 
                    type="email" 
                    id="email" 
                    name="email" 
                    value="<?= old('email') ?>"
                    class="form-control <?= session()->getFlashdata('errors') && isset(session()->getFlashdata('errors')['email']) ? 'input-error' : '' ?>"
                >
            </div>
            
            <div class="form-group">
                <label for="password">Contrasenya - Mínim 8 caràcters</label>
                <input 
                    type="password" 
                    id="password" 
                    name="password" 
                    class="form-control <?= session()->getFlashdata('errors') && isset(session()->getFlashdata('errors')['password']) ? 'input-error' : '' ?>"
                >
            </div>
            
            <div class="form-group">
                <label for="password_confirm">Confirmar contrasenya</label>
                <input 
                    type="password" 
                    id="password_confirm" 
                    name="password_confirm" 
                    class="form-control"
                >
            </div>
            

            <img src="<?= base_url('captcha') ?>" alt="" srcset="">
            <label for="captcha-answer">Resol el captcha</label>
            <input type="text" name="captcha-answer" id="captcha-answer" class="form-control mb-3">

            <button type="submit" class="btn btn-primary bg-black rounded-pill">Crear compte</button>
        </form>
        
        <div class="d-flex">
            <span class="mx-auto">
                Ja tens un compte? <a href="<?= base_url('login') ?>">Inicia sessió</a>
            </span>
        </div>
    </div>
</body>
</html>
