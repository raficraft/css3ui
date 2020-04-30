<?php

$user = 'root';
$pass = '';

$pdo_options[PDO::ATTR_ERRMODE] = PDO::ERRMODE_EXCEPTION;
$CFdesign = new PDO('mysql:host=localhost;dbname=css4ui', $user, $pass, $pdo_options);


