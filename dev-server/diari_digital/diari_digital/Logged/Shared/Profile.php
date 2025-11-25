<?php
session_start();

if ($_SERVER['REQUEST_METHOD'] === 'GET' && $_SESSION['level'] >= 10) {
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Configuració</title>
</head>
<body>
    <h1>Configuració</h1>
    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia repellendus saepe exercitationem vero unde eum et quas modi neque! Voluptas autem accusamus eos dolorem hic, rem nobis magnam nihil odio.</p>
</body>
</html>
<?php
} else {
    return http_response_code(403);
}