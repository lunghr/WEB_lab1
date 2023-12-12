<?php

$result = "";
$tmpResult="you lose.";
$printingRes="miss";
if (isset($_GET["input_data"])) {
    $input_data = explode(",", (string)$_GET["input_data"]);
    $x = (int)$input_data[0];
    $y = round((float)$input_data[1], 2);
    $r = round((float)$input_data[2], 2);

    if ((!is_numeric($x) || !is_numeric($y) || !is_numeric($r)) && (!($x >= -5 && $x <= 3 && $y >= -5 && $y <= 3 && $r >= 1 && $r <= 4))){
        $result = "Invalid input";
        echo $result;
        exit;
    }




    if (circleCheck($x,$y,$r) || rectangleCheck($x, $y, $r)||triangleCheck($x, $y, $r)){
        $tmpResult = "The point fell into the area!!!";
        $printingRes = "hit";
    }
    date_default_timezone_set('Europe/Moscow');
    $time =date("d.m.Y H:i");

    $script_time=round(microtime(true)-$_SERVER["REQUEST_TIME"], 4);
    $result =$tmpResult.",".$time.",".$script_time.",".$x.",".$y.",".$r.",".$printingRes;
    echo $result;
}




function circleCheck($x, $y, $r)
{
    if ($x <= 0 && $y >= 0) {
        return ($x * $x + $y * $y <= $r * $r);
    } else {
        return false;
    }
}
function triangleCheck($x, $y, $r){
    return $x >= 0 && $x <= ($r/2) && $y <= 0 && $y >= (-$r/2) && ($x + -$y) <=($r/2);
}

function rectangleCheck($x, $y, $r){
    return $x>=0 && $x<=$r && $y>=0 && $y<=$r/2;
}


