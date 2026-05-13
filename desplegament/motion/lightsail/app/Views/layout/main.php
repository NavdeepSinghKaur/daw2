<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title><?= $title ?? 'Motion' ?></title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
    <style>
        :root {
            --primary: #2f3437;
            --primary-light: #37352f;
            --bg: #ffffff;
            --bg-secondary: #f7f6f3;
            --text: #37352f;
            --text-secondary: #73726e;
            --border: #e9e9e7;
            --accent: #2383e2;
            --danger: #eb5757;
            --success: #0f7b6c;
        }

        * {
            box-sizing: border-box;
            margin: 0;
            padding: 0;
        }

        body {
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif;
            background-color: var(--bg);
            color: var(--text);
            line-height: 1.5;
        }

        .container {
            max-width: 1000px;
            margin: 0 auto;
            padding: 2rem;
        }

        nav {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 1rem 2rem;
            border-bottom: 1px solid var(--border);
            background: var(--bg);
            position: sticky;
            top: 0;
            z-index: 100;
        }

        .logo {
            font-weight: 700;
            font-size: 1.25rem;
            color: var(--primary);
            text-decoration: none;
            display: flex;
            align-items: center;
            gap: 0.5rem;
        }

        .logo::before {
            content: 'M';
            background: var(--primary);
            color: white;
            padding: 0.2rem 0.6rem;
            border-radius: 4px;
        }

        .nav-links {
            display: flex;
            gap: 1.5rem;
            align-items: center;
        }

        .nav-links a {
            text-decoration: none;
            color: var(--text-secondary);
            font-weight: 500;
            font-size: 0.9rem;
            transition: color 0.2s;
        }

        .nav-links a:hover {
            color: var(--text);
        }

        .btn {
            display: inline-block;
            padding: 0.5rem 1rem;
            border-radius: 4px;
            font-weight: 500;
            font-size: 0.9rem;
            text-decoration: none;
            cursor: pointer;
            transition: all 0.2s;
            border: 1px solid transparent;
        }

        .btn-primary {
            background: var(--accent);
            color: white;
        }

        .btn-primary:hover {
            background: #1a6ab3;
        }

        .btn-outline {
            border-color: var(--border);
            color: var(--text);
        }

        .btn-outline:hover {
            background: var(--bg-secondary);
        }

        .alert {
            padding: 1rem;
            border-radius: 4px;
            margin-bottom: 1.5rem;
            font-size: 0.9rem;
        }

        .alert-success {
            background: #edf7f6;
            color: var(--success);
            border: 1px solid #d1e9e5;
        }

        .alert-danger {
            background: #fbeaea;
            color: var(--danger);
            border: 1px solid #f5d3d3;
        }

        .form-group {
            margin-bottom: 1.25rem;
        }

        .form-group label {
            display: block;
            margin-bottom: 0.5rem;
            font-weight: 500;
            font-size: 0.9rem;
        }

        .form-control {
            width: 100%;
            padding: 0.6rem;
            border: 1px solid var(--border);
            border-radius: 4px;
            font-family: inherit;
            font-size: 1rem;
            outline: none;
            transition: border-color 0.2s;
        }

        .form-control:focus {
            border-color: var(--accent);
        }

        .card {
            background: white;
            border: 1px solid var(--border);
            border-radius: 8px;
            padding: 2rem;
            box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
        }

        footer {
            margin-top: 4rem;
            padding: 2rem;
            text-align: center;
            color: var(--text-secondary);
            font-size: 0.8rem;
            border-top: 1px solid var(--border);
        }

        .dropdown:hover .dropdown-content {
            display: block !important;
        }

        .dropdown-content a:hover {
            background-color: var(--bg-secondary);
        }
    </style>
</head>

<body>
    <nav>
        <a href="/" class="logo">Motion</a>
        <div class="nav-links">
            <?php if (session()->get('logged_in')): ?>
                <a href="/notes">My Notes</a>
                <a href="/categories">Categories</a>
                <a href="/logout" class="btn btn-outline">Logout</a>
            <?php else: ?>
                <a href="/login">Login</a>
                <a href="/register" class="btn btn-primary">Sign Up</a>
            <?php endif; ?>
        </div>
    </nav>

    <main class="container">
        <?php if (session()->getFlashdata('success')): ?>
            <div class="alert alert-success">
                <?= session()->getFlashdata('success') ?>
            </div>
        <?php endif; ?>

        <?php if (session()->getFlashdata('error')): ?>
            <div class="alert alert-danger">
                <?= session()->getFlashdata('error') ?>
            </div>
        <?php endif; ?>

        <?php if (session()->getFlashdata('errors')): ?>
            <div class="alert alert-danger">
                <ul>
                    <?php foreach (session()->getFlashdata('errors') as $error): ?>
                        <li><?= $error ?></li>
                    <?php endforeach; ?>
                </ul>
            </div>
        <?php endif; ?>

        <?= $this->renderSection('content') ?>
    </main>

    <footer>
        &copy; <?= date('Y') ?> Motion Labs.
    </footer>
</body>

</html>