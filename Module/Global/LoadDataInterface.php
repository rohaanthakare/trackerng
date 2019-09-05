<?php
/*
	Name : readAll()
	Description : To fetch all records from the table and return in Array
*/
Class LoadDataInterface{
	public $fileName;
	public $filePath;
	public $rowsToInsert;

	public function getAllCsvRows(){
		$allCsvRows = array();
		$app_conf = parse_ini_file('../Module/Global/Configuration.ini',TRUE);
		$app_mode = $app_conf['APP_MODE']['APP_MODE'];
		$REF_DATA_PATH_SEPARATOR = $app_conf[$app_mode]['REF_DATA_PATH_SEPARATOR'];
		$REF_DATA_FILE_PATH = $app_conf[$app_mode]['REF_DATA_FILE_PATH'];
		$PROJECT_NAME = $app_conf[$app_mode]['PROJECT_NAME'];

		$currentWorkingDir = $_SERVER['DOCUMENT_ROOT'].$PROJECT_NAME;
		$this->filePath = $currentWorkingDir.$REF_DATA_PATH_SEPARATOR.$REF_DATA_FILE_PATH;

		$fullFilePath = $this->filePath.$REF_DATA_PATH_SEPARATOR.$this->fileName;
		$filePtr = fopen($fullFilePath, 'r');
		if($filePtr){
			$i=0;
			while (($line = fgets($filePtr)) !== false) {
				$fieldArray = explode(",",$line);
				$allCsvRows[$i] = $fieldArray;
				$i++;
			}
			$this->rowsToInsert = $allCsvRows;
		} else {
			echo "File not found";
		}		
	}

	public function loadDataFromFile(){
		$this->getAllCsvRows();
		return $this->rowsToInsert;
	}
}
?>