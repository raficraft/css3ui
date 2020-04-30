<?php 

define("myWebROOT","/release/");


if(!isset($_GET['p'])){$_GET['p']="index";}
if(!file_exists("content/".$_GET['p'].'.php')){$_GET['p']="404";}
ob_start();
include "content/".$_GET['p'].'.php';
$content = ob_get_contents();
ob_end_clean();
?>
    <?php
include"template.php";




  

    

