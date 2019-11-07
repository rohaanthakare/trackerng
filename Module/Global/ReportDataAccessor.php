<?php
require_once(ROOT_DIR.'/Module/Global/ExceptionHandler.php');
require_once(ROOT_DIR.'/Module/Global/Configuration.php');
Class ReportDataAccessor{
	public static function getQueryFromReportXML($moduleName,$queryName){
		$logFuncName = get_called_class()." - getQueryFromReportXML";
		try{
			$fileToParse = ROOT_DIR.Configuration::getConfigParamValue('REF_DATA_PATH_SEPARATOR').'Module/'.$moduleName.'/'.$moduleName.'Queries.xml';
			if(file_exists($fileToParse)){
				$parsedXML = simplexml_load_file($fileToParse);
				$query = "";
				foreach ($parsedXML->children() as $queryNode) {
					$currentQueryName = $queryNode->name->__toString();
					$currentQueryName = trim($currentQueryName);
					if($currentQueryName == $queryName){
						$query = $queryNode->queryDef->__toString();
						return trim($query);
					}
				}
				if($query == ""){
					throw new Exception("Query not found in Query XML for Query Name : ".$queryName);
				}
			} else {
				throw new Exception("Query File ".$fileToParse." does not exist.");
			}
		} catch (Exception $e) {
			Logger::writeLog('ERROR',$logFuncName,$e->getMessage());
			throw new Exception($e->getMessage());
		}
	}
}
?>