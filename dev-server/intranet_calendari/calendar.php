<?php
    $user = $_POST['usr_name'];
    $passwd = $_POST['passwd'];

    $credentials = ['daw', '2025'];

    if (!($user === "daw" && $passwd === "2025")) {
        header("Location: index.php?error=1");
        exit();
    }
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Calendar</title>
</head>
<body>
    <?php
        $monthStart = date('Y-m-d');
        echo($monthStart);
    ?>
</body>
</html>