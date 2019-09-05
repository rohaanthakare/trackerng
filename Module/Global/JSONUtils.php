<?php
Class JSONUtils{
	public static function getJSONFromMysqlResult($result){
		$responseArray = array();
		$responseArray['count'] = $result->num_rows;
		$fieldsArray = array();
		while($resultRow = $result->fetch_assoc()){
			array_push($fieldsArray,$resultRow);
		}
		$responseArray['data'] = $fieldsArray;
		$responseStr = json_encode($responseArray);
		return $responseStr;
	}
	
	public static function getDataJSONFromResultArray($resultArray,$resultCount){
		$dataArray = array();
		$responseStr;
		$dataArray['count'] = $resultCount;
		$dataArray['data'] = $resultArray;
		$responseStr = json_encode($dataArray);
		
		return $responseStr;
	}
}

?>