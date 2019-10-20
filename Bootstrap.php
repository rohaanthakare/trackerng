<?php
ini_set('display_errors', '1');
define('ROOT_DIR',__DIR__);

require_once(ROOT_DIR.'/Module/Global/ExceptionHandler.php');
require_once(ROOT_DIR.'/Module/User/UserController.php');
require_once(ROOT_DIR.'/Module/Role/RoleController.php');
require_once(ROOT_DIR.'/Module/DataMaster/MasterDataController.php');
require_once(ROOT_DIR.'/Module/ViewMaster/MasterViewController.php');
require_once(ROOT_DIR.'/Module/Password/PasswordController.php');

$moduleName = $_REQUEST['Module'];
$className = $moduleName.'Controller';
$actionName = $_REQUEST['action'];
$controllerObj = new $className();
$responseText = $controllerObj->$actionName($_REQUEST);
echo $responseText;
?>