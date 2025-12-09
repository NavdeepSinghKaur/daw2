<?php
session_start();

if ($_SERVER['REQUEST_METHOD'] !== 'GET' || !isset($_SESSION['level'])) {
    return http_response_code(403);
}

include __DIR__ . '/../../header.php';
?>
    <h1 class="display-3 m-3">Configuració</h1>
    <hr>
    <div class="m-3">
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia repellendus saepe exercitationem vero unde eum et quas modi neque! Voluptas autem accusamus eos dolorem hic, rem nobis magnam nihil odio.</p>
    </div>
</body>
</html>