<?php
require("common.php");
if(!empty($_SESSION['user'])){
	echo("&nbsp;<small>as " . $_SESSION["user"]["username"] . "</small>");
}
else{
	echo("&nbsp;<small>as guest</small>");
}