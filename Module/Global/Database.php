<?php
require_once('Logger.php');


Class Database{
	private static $APP_MODE;
	private static $DB_USERNAME;
	private static $DB_PASSWORD;
	private static $DB_HOST;
	private static $DB_INSTANCE;
	
	private static $conn;
	
	function __construct(){
		die("Init function is not allowed here");
	}
	
	public static function setConnectParams(){
		$app_conf = parse_ini_file('Configuration.ini',TRUE);
		self::$APP_MODE = $app_conf['APP_MODE']['APP_MODE'];
		self::$DB_USERNAME = $app_conf[self::$APP_MODE]['DB_USERNAME'];
		self::$DB_PASSWORD = $app_conf[self::$APP_MODE]['DB_PASSWORD'];
		self::$DB_INSTANCE = $app_conf[self::$APP_MODE]['DB_INSTANCE'];
		self::$DB_HOST = $app_conf[self::$APP_MODE]['DB_HOST'];
	}
	public static function getConnection(){
		//If connection instance is null
		try{
			if(self::$conn == null){
				self::setConnectParams();
				self::$conn = new mysqli(self::$DB_HOST,self::$DB_USERNAME,self::$DB_PASSWORD,self::$DB_INSTANCE);
				
				if(self::$conn->connect_error){
					throw new Exception('Error while connecting to Database');
				}
			}		
			return self::$conn;
		} catch (Exception $e) {
			Logger::writeLog('ERROR','Database - getConnection',$e->getMessage());
			throw new Exception($e->getMessage());
		}
	}
	
	public static function closeConnection(){
		self::$conn = null;
	}
}
?>