<?php
require_once('Logger.php');

set_error_handler("ExceptionHandler");
error_reporting(E_ALL);
function ExceptionHandler($errorType,$errorStr,$errorFile,$errorLine){
	switch ($errorType) {
		//E_NOTICE
		case 8:
			Logger::writeLog('ERROR',$errorFile,$errorStr.' at line '.$errorLine);
			throw new Exception('Internal Server Error');
			# code...
			break;
		//E_WARNING
		case 2:
			Logger::writeLog('ERROR',$errorFile,$errorStr.' at line '.$errorLine);
			throw new Exception('Internal Server Error');
			# code...
			break;
		//E_USER_ERROR	
		case 256:
			Logger::writeLog('ERROR',$errorFile,$errorStr.' at line '.$errorLine);
			throw new Exception('Internal Server Error');
		# code...
			break;
		case 512:
			Logger::writeLog('ERROR',$errorFile,$errorStr.' at line '.$errorLine);
			throw new Exception('Internal Server Error');
		# code...
		break;
		case 1024:
			Logger::writeLog('ERROR',$errorFile,$errorStr.' at line '.$errorLine);
			throw new Exception('Internal Server Error');
		# code...
		break;
		case 4096:
			Logger::writeLog('ERROR',$errorFile,$errorStr.' at line '.$errorLine);
			throw new Exception('Internal Server Error');
		# code...
		break;
	}
}

?>