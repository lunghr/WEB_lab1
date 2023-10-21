<?php


$result = "";
$tmpResult="you lose.";
if (isset($_GET["input_data"])) {
    $input_data = explode(",", (string)$_GET["input_data"]);
    $x = $input_data[0];
    $y = $input_data[1];
    $r = $input_data[2];
    if (circleCheck($x,$y,$r) || rectangleCheck($x, $y, $r)||triangleCheck($x, $y, $r)){
        $tmpResult = "The point fell into the area!!!";
    }
    $time =date("d.m.Y H:i");
    $script_time=round(microtime(true)-$_SERVER["REQUEST_TIME"], 4);
    $result =$tmpResult.",".$time.",".$script_time.",".$x.",".$y.",".$r;
    echo $result;
}




function circleCheck($x, $y, $r){
    if ($x<=0 && $y>=0){
        return ($x*$x + $y*$y <= $r*$r);
    }else{
        return false;
    }

}
function triangleCheck($x, $y, $r){
    return $x >= 0 && $x <= ($r/2) && $y <= 0 && $y >= (-$r/2) && ($x + -$y) <=($r/2);
}

function rectangleCheck($x, $y, $r){
    return $x>=0 && $x<=$r && $y>=0 && $y<=$r/2;
}


