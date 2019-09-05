<?php
Class Logger{
	private static $APP_MODE;
	private static $LOG_FILE_NAME;
	private static $LOG_FILE_PATH;
	private static $LOG_FILE_PATH_SEPARATOR;
	private static $PROJECT_NAME;
	
	private static $conn;
	
	function __construct(){
		die("Init function is not allowed here");
	}
	
	public static function setLogParams(){
		$app_conf = parse_ini_file('Configuration.ini',TRUE);
		self::$APP_MODE = $app_conf['APP_MODE']['APP_MODE'];
		self::$LOG_FILE_NAME = $app_conf[self::$APP_MODE]['LOG_FILE_NAME'];
		self::$LOG_FILE_PATH = $app_conf[self::$APP_MODE]['LOG_FILE_PATH'];
		self::$LOG_FILE_PATH_SEPARATOR = $app_conf[self::$APP_MODE]['LOG_FILE_PATH_SEPARATOR'];
		self::$PROJECT_NAME = $app_conf[self::$APP_MODE]['PROJECT_NAME'];
	}
	
	public static function writeLog($logLevel,$logFunction,$logMessage){

		self::setLogParams();
		if(self::$APP_MODE == 'DEVELOPMENT'){
			$currentWorkingDir = $_SERVER['DOCUMENT_ROOT'].self::$PROJECT_NAME;
			
			$logFileName = $currentWorkingDir.self::$LOG_FILE_PATH_SEPARATOR.self::$LOG_FILE_PATH.self::$LOG_FILE_PATH_SEPARATOR.self::$LOG_FILE_NAME;
			if(!file_exists($logFileName)){
				$logFile = fopen($logFileName, "w") or die("Unable to open file!");
				fclose($logFile);
			} 
			$logFile = fopen($logFileName, "a") or die("Unable to open file!");
			if($logFile != false){
				$logContent = "[".date('d-m-Y h:i:s')."] - [".$logLevel."] - [".$logFunction."] - ".$logMessage."\n";
				fwrite($logFile,$logContent);
				fclose($logFile);
			}
		} else if (self::$APP_MODE == 'PRODUCTION' && $logLevel == 'ERROR'){
			$currentWorkingDir = $_SERVER['DOCUMENT_ROOT'].self::$LOG_FILE_PATH_SEPARATOR.self::$PROJECT_NAME;
			
			$logFileName = $currentWorkingDir.self::$LOG_FILE_PATH_SEPARATOR.self::$LOG_FILE_PATH.self::$LOG_FILE_PATH_SEPARATOR.self::$LOG_FILE_NAME;
			if(!file_exists($logFileName)){
				$logFile = fopen($logFileName, "w") or die("Unable to open file!");
				fclose($logFile);
			} 
			$logFile = fopen($logFileName, "a") or die("Unable to open file!");
			if($logFile != false){
				$logContent = "[".date('d-m-Y h:i:s')."] - [".$logLevel."] - [".$logFunction."] - ".$logMessage."\n";
				fwrite($logFile,$logContent);
				fclose($logFile);
			}
		}
	}
}
?>