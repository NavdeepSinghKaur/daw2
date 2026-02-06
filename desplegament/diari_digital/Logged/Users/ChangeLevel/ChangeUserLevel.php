<?php
session_start();

if (!isset($_SESSION['level']) || $_SERVER['REQUEST_METHOD'] !== 'GET') {
    http_response_code(403);
    echo ("FORBIDDEN");
    die;
}

if ($_SESSION['level'] != 40) {
    http_response_code(403);
    echo ("FORBIDDEN");
    die;    
}

if (!isset($_GET['id'])) {
    http_response_code(401);
    die;
}

// require_once __DIR__ . '/../../QueryController.php';


$_SESSION['selectedUserId'] = $_GET['id'];

include __DIR__ . '/../../../header.php';
?>

    <h1 class="display-3">Canviar permissos d'usuari</h1>
    <hr>
    <div class="w-100 mt-5">
        <div class="w-25 m-auto d-flex justify-content-center border rounded-4 p-3">
            <form action="ChangeUserLevelController.php" method="post" class="w-50"> 
                <p class="mx-auto d-block mb-2">Selecciona el nou nivell</p>
                
                <div class="form-check">
                    <input class="form-check-input" type="radio" name="newLevel" value="10" id="level10">
                    <label class="form-check-label" for="level10">Nivell 10</label>
                </div>

                <div class="form-check">
                    <input class="form-check-input" type="radio" name="newLevel" value="20" id="level20">
                    <label class="form-check-label" for="level20">Nivell 20</label>
                </div>

                <div class="form-check">
                    <input class="form-check-input" type="radio" name="newLevel" value="30" id="level30">
                    <label class="form-check-label" for="level30">Nivell 30</label>
                </div>

                <div class="form-check">
                    <input class="form-check-input" type="radio" name="newLevel" value="40" id="level40">
                    <label class="form-check-label" for="level40">Nivell 40</label>
                </div>

                <div class="text-center mt-4">
                    <button type="submit" class="btn btn-danger">Canviar nivell</button>
                </div>
            </form>
        </div>
    </div>
</body>
</html>