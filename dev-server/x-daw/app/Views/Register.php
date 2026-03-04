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
        
        <!-- Display validation errors -->
        <?php if (session()->getFlashdata('errors')): ?>
            <div class="error-message">
                <strong>Fixa't els errors següents:</strong>
                <ul>
                    <?php foreach (session()->getFlashdata('errors') as $error): ?>
                        <li><?= esc($error) ?></li>
                    <?php endforeach; ?>
                </ul>
            </div>
        <?php endif; ?>
        
        <!-- Display success message -->
        <?php if (session()->getFlashdata('success')): ?>
            <div class="success-message">
                <?= esc(session()->getFlashdata('success')) ?>
            </div>
        <?php endif; ?>
        
        <!-- Registration Form -->
        <form action="<?= base_url('register') ?>" method="post" class="d-flex flex-column w-25 m-auto mt-5 border p-5 rounded rounded-4">
            <h1 class="fw-bold mb-5" style="letter-spacing: -2px;">Crea el teu compte</h1>
            <?= csrf_field() ?> <!-- CSRF Protection - Important for security! -->
            
            <div class="form-group">
                <label for="name">Nom</label>
                <input 
                    type="text" 
                    id="name" 
                    name="name" 
                    value="<?= old('name') ?>"
                    placeholder="Enter your full name"
                    class="form-control <?= session()->getFlashdata('errors') && isset(session()->getFlashdata('errors')['name']) ? 'input-error' : '' ?>"
                >
                <div class="field-hint">minim 3 caracters</div>
            </div>
            
            <div class="form-group">
                <label for="email">Email</label>
                <input 
                    type="email" 
                    id="email" 
                    name="email" 
                    value="<?= old('email') ?>"
                    placeholder="email@email.com"
                    class="form-control <?= session()->getFlashdata('errors') && isset(session()->getFlashdata('errors')['email']) ? 'input-error' : '' ?>"
                >
                <div class="field-hint">No compartiràs el teu email</div>
            </div>
            
            <div class="form-group">
                <label for="password">Contrasenya</label>
                <input 
                    type="password" 
                    id="password" 
                    name="password" 
                    placeholder="Create a strong password"
                    class="form-control <?= session()->getFlashdata('errors') && isset(session()->getFlashdata('errors')['password']) ? 'input-error' : '' ?>"
                >
                <div class="field-hint">Mínim 8 caràcters</div>
            </div>
            
            <div class="form-group">
                <label for="password_confirm">Confirmar contrasenya</label>
                <input 
                    type="password" 
                    id="password_confirm" 
                    name="password_confirm" 
                    placeholder="Re-enter your password"
                    class="form-control"
                >
            </div>
            

            <img src="<?= base_url('captcha') ?>" alt="" srcset="">
            <label for="captcha-answer">Resol el captcha</label>
            <input type="text" name="captcha-answer" id="captcha-answer" class="form-control mb-3">

            <button type="submit" class="btn btn-primary bg-black rounded-pill">Crear compte</button>
        </form>
        
        <div class="login-link btn btn-primary bg-black rounded-pill">
            Ja tens un compte? <a href="<?= base_url('login') ?>">Inicia sessió</a>
        </div>
    </div>
</body>
</html>
