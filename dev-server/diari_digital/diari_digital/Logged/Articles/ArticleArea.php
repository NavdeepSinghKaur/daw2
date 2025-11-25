<?php
session_start();

if(!isset($_SESSION) || $_SERVER['REQUEST_METHOD'] !== 'GET') {
    return http_response_code(403);
}
if ($_SESSION['level'] < 20) {
    return http_response_code(403);
}

?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=A">
    <title>Àrea d'articles</title>
</head>
<body>
    Hacer un select de la tabla de articulos si el usuairo es de 20 de sólo él.
    Si el usuario es de 30 pues él y todos los del 20 (haciendo un inner join simple)
    Si es de 40 pues todos

    Para mostrar los articulos, guardarlos todos en un array, y hacer un bucle for
    que itere sobre cada posición que guarda el articulo.
    Con eso, tener un botón para editar, que junto al id del articulo te dará la
    oportunidad de editar el text o el titulo y guardar los cambios.

    La opción de borrar será la más sencilla ya que es un botón y una comprobación
    (el id del articulo)
    
    <button type="button">Crear article</button>
</body>
</html>