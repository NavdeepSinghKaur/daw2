<?php
    $user = $_POST['usr_name'];
    $passwd = $_POST['passwd'];

    $credentials = ['daw', '2025'];

    if (!($user === "daw" && $passwd === "2025")) {
        header("Location: index.php?error=1");
        exit();
    }

    $days = [
        "Monday" => 0,
        "Tuesday" => 1,
        "Wednesday" => 2,
        "Thursday" => 3,
        "Friday" => 4,
        "Saturday" => 5,
        "Sunday" => 6,
    ]
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Calendar</title>
    <style>
        th {
            border: 1px solid black;
        }
        td {
            margin: 0;
            border: 1px solid black;
        }
    </style>
</head>
<body>
    <?php
        $today = date('Y-m-d');
        $lastDate = date('Y-m-d', mktime(0, 0, 0, date('m')+1, 0, date('Y')));
        $lastDateDayNum = date('d', mktime(0, 0, 0, date('m')+1, 0, date('Y')));
        $lastDay = date('l', mktime(0, 0, 0, date('m')+1, 1, date('Y')));
        $firstDate = date('Y-m-d', mktime(0, 0, 0, date('m'), 1, date('Y')));
        $firstDay = date('l', mktime(0, 0, 0, date('m'), 1, date('Y')));
        echo($firstDate);
        echo($firstDay);
        echo($lastDate);
        echo($lastDay);
        echo($today);
    ?>

    <table>
        <thead>
            <tr>
                <th>Dl</th>
                <th>Dm</th>
                <th>Dc</th>
                <th>Dj</th>
                <th>Dv</th>
                <th>Ds</th>
                <th>Dg</th>
            </tr>
        </thead>
        <tbody>
            <?php
            $i = 1;
            echo "<tr>";
            while ($i<=$lastDateDayNum) {
                $iteratingDay = date('d', mktime(0, 0, 0, date('m'), $i, date('Y')));
                $iteratingDayName = date('l', mktime(0, 0, 0, date('m'), $i, date('Y')));
                if($i==1) {
                    for ($j=0; $j < $days[$iteratingDayName]; $j++) { 
                        echo "<td> </td>";
                    }
                }
                if ($i == date('d')) {
                    echo "<td style='background: #d2d2ff;'> $i </td>";
                }
                else if ($iteratingDayName == "Saturday") {
                    echo "<td style='background: #fbe6c0;'> $i </td>";
                }
                else if ($iteratingDayName == "Sunday") {
                    echo "<td style='background: red;'> $i </td>";
                }
                else {
                    echo "<td> $i </td>";
                }
                if ($iteratingDayName == "Sunday" || $iteratingDay == $lastDateDayNum) {
                    echo "</tr> <tr>";
                }
                $i++;
            }
            ?>
        </tbody>

    </table>
</body>
</html>