<?php
define('ROOT_DIR',$_SERVER['DOCUMENT_ROOT'].'/');

require_once(ROOT_DIR.'Module/Global/ExceptionHandler.php');
require_once(ROOT_DIR.'Module/User/UserController.php');
require_once(ROOT_DIR.'Module/GlobalView/GlobalViewController.php');
require_once(ROOT_DIR.'Module/GlobalData/GlobalDataController.php');
require_once(ROOT_DIR.'Module/Chart/ChartController.php');
require_once(ROOT_DIR.'Module/Password/PasswordController.php');
require_once(ROOT_DIR.'Module/Contact/ContactController.php');
require_once(ROOT_DIR.'Module/Bank/BankController.php');
require_once(ROOT_DIR.'Module/Event/EventController.php');

$moduleName = $_REQUEST['ModuleName'];
$className = $moduleName.'Controller';
$actionName = $_REQUEST['action'];
$controllerObj = new $className();
$responseText = $controllerObj->$actionName($_REQUEST);
echo $responseText;
?>