<?php
    $name = $_REQUEST['name'];
    $phone = $_REQUEST['phone'];
    $d = $_REQUEST['d'];
    $file_path="data.txt";
    $con="$name,$phone,$d|";
    file_put_contents($file_path,$con,FILE_APPEND);
    echo 'ok';
?>