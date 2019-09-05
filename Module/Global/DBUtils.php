<?php
require_once(ROOT_DIR.'Module/Global/ExceptionHandler.php');
require_once(ROOT_DIR.'Module/Global/Logger.php');

Class DBUtils{
	public $stmt;
	public $paramFieldList;
	public $resultFieldList;
	public $resultCount;
	public $returnResult = array();
	
	public function statementBindResult($inputStmt,$fieldArray){
		$this->stmt = $inputStmt;		
		for($i = 0;$i<count($fieldArray);$i++){
			$tmpField = $fieldArray[$i];
			$$tmpField = null;
			$this->resultFieldList[$tmpField] = &$$tmpField;
		}

		try{
			if(call_user_func_array(array($this->stmt,'bind_result'),$this->resultFieldList)){
				$arrPtr = 0;
				while($this->stmt->fetch()){
					foreach($this->resultFieldList as $key=>$val){
						$this->returnResult[$arrPtr][$key] = $val;
					}
					$arrPtr++;
				}
				
				return $this->returnResult;
			} else {
				throw new Exception("Error Processing Request");
			}
		} catch (Exception $e) {
			$logFuncName = get_called_class().' - statementBindResult';
			Logger::writeLog('ERROR',$logFuncName,$e->getMessage());
			throw new Exception($e->getMessage());
		}
	}
	
	public function statementBindParams($inputStmt,$fieldArray){
		$this->stmt = $inputStmt;
		$fieldType = '';
		
		for($i=0;$i<count($fieldArray);$i++){
			$tmpField1 = $fieldArray[$i];
			if($tmpField1 == null){
				$fieldType .= 's';
			} else {
				if(is_int($tmpField1)) {
					$fieldType .= 'i';              //integer
				} elseif (is_float($tmpField1)) {
					$fieldType .= 'd';              //double
				} elseif (is_string($tmpField1)) {
					$fieldType .= 's';              //string
				} else {
					$fieldType .= 'b';              //blob and unknown
				}
			}			
		}
		
		$this->paramFieldList[] = $fieldType;
		for($i=0;$i<count($fieldArray);$i++){
			$tmpField = 'bind'.$i;
			$$tmpField = $fieldArray[$i];
			$this->paramFieldList[$tmpField] = &$$tmpField;
		}
		try{
			if(call_user_func_array(array($this->stmt,'bind_param'),$this->paramFieldList)){
			} else {
				throw new Exception('Error while binding params');
			}
		} catch(Exception $e) {
			Logger::writeLog('ERROR','DBUtils - statementBindParams',$e->getMessage());
			throw new Exception($e->getMessage());
		}
		

		return $this->stmt;
	}
}
?>