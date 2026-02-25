<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Registrar-se</title>
</head>
<body>
    <div class="register-container">
        <h1>Registrar-se</h1>
        <p class="subtitle">Join us today! Fill in your details below.</p>
        
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
        <form action="<?= base_url('register') ?>" method="post">
            <?= csrf_field() ?> <!-- CSRF Protection - Important for security! -->
            
            <div class="form-group">
                <label for="name">Nom</label>
                <input 
                    type="text" 
                    id="name" 
                    name="name" 
                    value="<?= old('name') ?>"
                    placeholder="Enter your full name"
                    class="<?= session()->getFlashdata('errors') && isset(session()->getFlashdata('errors')['name']) ? 'input-error' : '' ?>"
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
                    class="<?= session()->getFlashdata('errors') && isset(session()->getFlashdata('errors')['email']) ? 'input-error' : '' ?>"
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
                    class="<?= session()->getFlashdata('errors') && isset(session()->getFlashdata('errors')['password']) ? 'input-error' : '' ?>"
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
                >
            </div>
            
            <img src="<?= base_url('captcha') ?>" alt="" srcset="">
            <input type="text" name="captcha-answer" id="captcha-answer">

            <button type="submit">Crear compte</button>
        </form>
        
        <div class="login-link">
            Ja tens un compte? <a href="<?= base_url('login') ?>">Login here</a>
        </div>
    </div>
</body>
</html>
