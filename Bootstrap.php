<?php
ini_set('display_errors', '1');
define('ROOT_DIR',__DIR__);

require_once(ROOT_DIR.'/Module/Global/ExceptionHandler.php');
require_once(ROOT_DIR.'/Module/User/UserController.php');

$moduleName = $_REQUEST['Module'];
$className = $moduleName.'Controller';
$actionName = $_REQUEST['action'];
$controllerObj = new $className();
$responseText = $controllerObj->$actionName($_REQUEST);
echo $responseText;
?>