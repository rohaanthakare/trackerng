<?php
require_once('Logger.php');


Class Configuration{
	private static $appMode;
	private static $projectName;
	private static $dbUsername;
	private static $dbPassword;
	private static $dbInstance;
	private static $dbHost;
	private static $logFileName;
	private static $logFilePath;
	private static $logFilePathSeparator;
	private static $refDataFilePath;
	private static $refDataPathSeparator;
	private static $siteURL;

	
	function __construct(){
		die("Init function is not allowed here");
	}
	
	private static function setConfigParams(){
		$app_conf = parse_ini_file('Configuration.ini',TRUE);
		self::$appMode = $app_conf['APP_MODE']['APP_MODE'];
		self::$projectName = $app_conf[self::$appMode]['PROJECT_NAME'];
		self::$dbUsername = $app_conf[self::$appMode]['DB_USERNAME'];
		self::$dbPassword = $app_conf[self::$appMode]['DB_PASSWORD'];
		self::$dbInstance = $app_conf[self::$appMode]['DB_INSTANCE'];
		self::$dbHost = $app_conf[self::$appMode]['DB_HOST'];
		self::$logFileName = $app_conf[self::$appMode]['LOG_FILE_NAME'];
		self::$logFilePath = $app_conf[self::$appMode]['LOG_FILE_PATH'];
		self::$logFilePathSeparator = $app_conf[self::$appMode]['LOG_FILE_PATH_SEPARATOR'];
		self::$refDataFilePath = $app_conf[self::$appMode]['REF_DATA_FILE_PATH'];
		self::$refDataPathSeparator = $app_conf[self::$appMode]['REF_DATA_PATH_SEPARATOR'];
		self::$siteURL = $app_conf[self::$appMode]['SITE_URL'];
	}
	public static function getConfigParamValue($paramName){
		//If connection instance is null
		$returnConfigValue;

		try{
			if(self::$appMode == null){
				self::setConfigParams();				
			} 
			$returnConfigValue = self::getConfigValue($paramName);
			return $returnConfigValue;
		} catch (Exception $e) {
			Logger::writeLog('ERROR',get_called_class().' - getConfigParamValue',$e->getMessage());
			throw new Exception($e->getMessage());
		}
	}
	
	private static function getConfigValue($paramName){
		//If connection instance is null
		try{
			switch ($paramName) {
			 	case 'PROJECT_NAME':
			 		return self::$projectName;
			 		break;
			 	case 'DB_USERNAME':
			 		return self::$dbUsername;
			 		break;
			 	case 'DB_PASSWORD':
			 		return self::$dbPassword;
			 		break;
			 	case 'DB_INSTANCE':
			 		return self::$dbInstance;
			 		break;
			 	case 'DB_HOST':
			 		return self::$dbHost;
			 		break;
			 	case 'LOG_FILE_NAME':
			 		return self::$logFileName;
			 		break;
			 	case 'LOG_FILE_PATH':
			 		return self::$logFilePath;
			 		break;
			 	case 'LOG_FILE_PATH_SEPARATOR':
			 		return self::$logFilePathSeparator;
			 		break;
			 	case 'REF_DATA_FILE_PATH':
			 		return self::$refDataFilePath;
			 		break;
			 	case 'REF_DATA_PATH_SEPARATOR':
			 		return self::$refDataPathSeparator;
			 		break;
			 	case 'SITE_URL':
			 		return self::$siteURL;
			 		break;
			 } 
		} catch (Exception $e) {
			Logger::writeLog('ERROR',get_called_class().' - getConfigValue',$e->getMessage());
			throw new Exception($e->getMessage());
		}
	}

	public static function closeConnection(){
		self::$conn = null;
	}
}
?>