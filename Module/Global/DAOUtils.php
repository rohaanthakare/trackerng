<?php
require_once(ROOT_DIR.'/Module/Global/Database.php');
require_once(ROOT_DIR.'/Module/Global/DBUtils.php');
require_once(ROOT_DIR.'/Module/Global/ExceptionHandler.php');
/*
	Name : readAll()
	Description : To fetch all records from the table and return in Array
*/
Class DAOUtils{
	public $start;
	public $limit;
	public function readAll(){
		$logFuncName = get_called_class()." - readAll";
		try{
			$this->conn = Database::getConnection();
			$query = "select ";
			for($i = 0;$i<count($this->fieldList);$i++){
				$query = $query.$this->fieldList[$i].",";
			}
			$query = rtrim($query,',');
			$query = $query." from ".$this->model;
			if($this->limit != 0){
				$query = $query." limit ".$this->start.",".$this->limit;
			}
			if($stmt = $this->conn->prepare($query)){
				if($stmt->execute()){
					$DBUtil = new DBUtils();
					$resultArray = $DBUtil->statementBindResult($stmt,$this->fieldList);
					$logFuncMsg = get_called_class()." all records read";
					Logger::writeLog('INFO',$logFuncName,$logFuncMsg);
					return $resultArray;
				} else {
					throw new Exception("Error while executing staemement");
				}				
			} else {
				throw new Exception("Error in prepare staemement");				
			}
		} catch (Exception $e) {
			Logger::writeLog('ERROR',$logFuncName,$e->getMessage());
			throw new Exception($e->getMessage());
		}
	}

/*
	Name : Save()
	Description : To save record in DB Table
*/
	public function save(){
		$logFuncName = get_called_class()." - save";
		try{
			$date = new DateTime();
			$dateStr = $date->format('Y-m-d h:i:s');
			$this->setSysCreationDate($dateStr);
			$userId = 0;
			if(isset($_SESSION['userid'])){
				$userId = $_SESSION['userid'];
			}
			$this->setSysCreationUser($userId);
			$this->conn = Database::getConnection();		
			$query = "insert into ".$this->model." set ";
			for($i = 0;$i<count($this->fieldList);$i++){
				$query = $query.$this->fieldList[$i]." = ?,";
			}
			$query = rtrim($query,',');
			if($stmt = $this->conn->prepare($query)){
				$bindParamArray = array();
				$bindParamArray = $this->allFieldsGetter();
				$DBUtil = new DBUtils();
				$stmt1 = $DBUtil->statementBindParams($stmt,$bindParamArray);
				if($stmt->execute()){
					$logFuncMsg = get_called_class()." entry created successfully";
					Logger::writeLog('INFO',$logFuncName,$logFuncMsg);
				} else {
					throw new Exception($stmt->error);
				}
			} else {
				throw new Exception('Error while preparing statement');
			}
			
			return $stmt->insert_id;
		} catch(Exception $e){
			Logger::writeLog('ERROR',$logFuncName,$e->getMessage());
			throw new Exception($e->getMessage());
		}
	}

/*
	Name : Update()
	Description : Function To save record in DB Table
*/

	public function update(){
		$logFuncName = get_called_class()." - update";
		try {
			$date = new DateTime();
			$dateStr = $date->format('Y-m-d h:i:s');
			$this->setSysUpdateDate($dateStr);
			
			$this->conn = Database::getConnection();
			$query = "update ".$this->model." set ";
			for($i = 0;$i<count($this->fieldList);$i++){
				$query = $query.$this->fieldList[$i]." = ?,";
			}
			$query = rtrim($query,',');
			$query = $query." where ".$this->keyField." = ?";
			if($stmt = $this->conn->prepare($query)){
				$paramFields = $this->allFieldsGetter();
				$keyIdx = count($paramFields);
				// $paramFields[$keyIdx] = $this->getSysUserId();
				$paramFields[$keyIdx] = $this->getKeyFieldValue();
				$DBUtil = new DBUtils();
				$stmt = $DBUtil->statementBindParams($stmt,$paramFields);

				if($stmt->execute()){
					Logger::writeLog('INFO',$logFuncName,'record updated successfully');
					return true;
				} else {
					throw new Exception('Error while executing query');
				}				
			} else {
				throw new Exception('Error while preparing statement');
			}
		} catch(Exception $e) {
			Logger::writeLog('ERROR',$logFuncName,$e->getMessage());
			throw new Exception($e->getMessage());
		}
	}

/*
	Name : readOne()
	Description : Function To read record from DB Table based on sysId for table
*/

	public function readOneBySysId(){
		$logFuncName = get_called_class()." - readOneBySysId";
		try{
			$this->conn = Database::getConnection();
			$query = "select ";
			for($i = 0;$i<count($this->fieldList);$i++){
				$query = $query.$this->fieldList[$i].",";
			}
			$query = rtrim($query,',');
			$query = $query." from ".$this->model." where ".$this->keyField." = ?";
			if($stmt = $this->conn->prepare($query)){
				$KeyFieldValue = $this->getKeyFieldValue();
				$stmt->bind_param('i',$KeyFieldValue);
				if($stmt->execute()){
					$DBUtil = new DBUtils();
					$resultArray = $DBUtil->statementBindResult($stmt,$this->fieldList);
					if(count($resultArray)){
						$fetchedRow = $resultArray[0];
						$this->allFieldsSetter($fetchedRow);
						return $fetchedRow;
					}
					
					Logger::writeLog('INFO',$logFuncName,'Table record fetched');
				} else {
					throw new Exception('Error while executing a query');
				}
			} else {
				throw new Exception('Error while preparing statement');
			}
		} catch (Exception $e) {
			Logger::writeLog('ERROR',$logFuncName,$e->getMessage());
			throw new Exception($e->getMessage());
		}
	}

/*
	Name : delete()
	Description : Function To delete record from DB Table based on sysId for table
*/

	public function delete(){
		$logFuncName = get_called_class()." - delete";
		try{
			$this->conn = Database::getConnection();
			$query = "delete";
			$query = $query." from ".$this->model." where ".$this->keyField." = ?";
			if($stmt = $this->conn->prepare($query)){
				$KeyFieldValue = $this->getKeyFieldValue();
				$stmt->bind_param('i',$KeyFieldValue);
				if($stmt->execute()){
					Logger::writeLog('INFO',$logFuncName,'record deleted successfully');
					return true;
				} else {
					throw new Exception('Error while executing query');
				}
			} else {
				throw new Exception('Error while preparing statement');
			}
		} catch (Exception $e) {
			Logger::writeLog('ERROR',$logFuncName,$e->getMessage());
			throw new Exception($e->getMessage());
		}
	}

/*
	Name : deleteByCustomField()
	Description : Function To delete record from DB Table based on sysId for table
*/

	public function deleteByCustomField($fieldNameArray,$fieldValueArray){
		$logFuncName = get_called_class()." - delete";
		try{
			$this->conn = Database::getConnection();
			$query = "delete";
			$query = $query." from ".$this->model;
			
			if(count($fieldNameArray) != count($fieldValueArray)){
				throw new Exception("Number of Params in where cluse does not match with values");
			} else {
				$query = $query." where ".$fieldNameArray[0]." = ?";
				if(count($fieldNameArray) > 1){
					for ($i=1; $i < count($fieldNameArray); $i++) { 
						$query = $query." and ".$fieldNameArray[$i]." = ?";
					}	
				}
				if($stmt = $this->conn->prepare($query)){
					$DBUtilParam = new DBUtils();
					$stmt = $DBUtilParam->statementBindParams($stmt,$fieldValueArray);
					if($stmt->execute()){						
						Logger::writeLog('INFO',$logFuncName,'Records deleted successfully');
						return true;
					} else {
						throw new Exception('Error while executing a query');
					}
				} else {
					throw new Exception('Error while preparing statement');
				}
			}
		} catch (Exception $e) {
			Logger::writeLog('ERROR',$logFuncName,$e->getMessage());
			throw new Exception($e->getMessage());
		}
	}

/*
	Name : readTotalCount()
	Description : Function To read total number of records from DB Table
*/

	public function readTotalCount(){
		$logFuncName = get_called_class()." - readTotalCount";
		try {
			$this->conn = Database::getConnection();
			$query = "select count(*) as total_count from ".$this->model;
			if($stmt = $this->conn->prepare($query)){
				if($stmt->execute()){
					$stmt->bind_result($totalCount);
					if($stmt->fetch()){
						Logger::writeLog('INFO',$logFuncName,'Total Count fetch successfully');
						return $totalCount;
						
					} else {
						Logger::writeLog('INFO',$logFuncName,'Error while fetching Total Count.');
						return 0;
					}
				} else {
					throw new Exception('Error while executing a query');
				}
			} else {
				throw new Exception('Error while preparing statement');
			}
		} catch (Exception $e) {
			Logger::writeLog('ERROR',$logFuncName,$e->getMessage());
			throw new Exception($e->getMessage());
		}
	}

/*
	Name : readOneByCustomField()
	Description : Function To read record from DB Table based on custom fields for table
*/

	public function readOneByCustomField($fieldNameArray,$fieldValueArray){
		$logFuncName = get_called_class()." - readOneByCustomField";
		try{			
			$this->conn = Database::getConnection();
			$query = "select ";
			for($i = 0;$i<count($this->fieldList);$i++){
				$query = $query.$this->fieldList[$i].",";
			}
			$query = rtrim($query,',');
			$query = $query." from ".$this->model;
			if(count($fieldNameArray) != count($fieldValueArray)){
				throw new Exception("Number of Params in where cluse does not match with values");
			} else {
				$query = $query." where ".$fieldNameArray[0]." = ?";
				if(count($fieldNameArray) > 1){
					for ($i=1; $i < count($fieldNameArray); $i++) { 
						$query = $query." and ".$fieldNameArray[$i]." = ?";
					}	
				}
				if($stmt = $this->conn->prepare($query)){
					$DBUtilParam = new DBUtils();					
					$stmt = $DBUtilParam->statementBindParams($stmt,$fieldValueArray);					
					if($stmt->execute()){						
						$DBUtil = new DBUtils();
						$resultArray = $DBUtil->statementBindResult($stmt,$this->fieldList);
						if(count($resultArray)){							
							Logger::writeLog('INFO',$logFuncName,'Table record fetched');							
							$fetchedRow = $resultArray[0];
							$this->allFieldsSetter($fetchedRow);
							return $fetchedRow;
						}
					} else {
						throw new Exception('Error while executing a query');
					}
				} else {
					throw new Exception('Error while preparing statement');
				}
			}
		} catch (Exception $e) {
			Logger::writeLog('ERROR',$logFuncName,$e->getMessage());
			throw new Exception($e->getMessage());
		}
	}

	public function readMultipleByCustomFields($fieldNameArray,$fieldValueArray){
		$logFuncName = get_called_class()." - readMultipleByCustomFields";
		try{
			$this->conn = Database::getConnection();
			$query = "select ";
			for($i = 0;$i<count($this->fieldList);$i++){
				$query = $query.$this->fieldList[$i].",";
			}
			$query = rtrim($query,',');
			$query = $query." from ".$this->model;
			if(count($fieldNameArray) != count($fieldValueArray)){
				throw new Exception("Number of Params in where cluse does not match with values");
			} else {
				$query = $query." where ".$fieldNameArray[0]." = ?";
				if(count($fieldNameArray) > 1){
					for ($i=1; $i < count($fieldNameArray); $i++) { 
						$query = $query." and ".$fieldNameArray[$i]." = ?";
					}	
				}
					
				if($stmt = $this->conn->prepare($query)){
					$DBUtilParam = new DBUtils();
					$stmt = $DBUtilParam->statementBindParams($stmt,$fieldValueArray);
					if($stmt->execute()){
						$DBUtil = new DBUtils();
						$resultArray = $DBUtil->statementBindResult($stmt,$this->fieldList);
						$logFuncMsg = get_called_class()." all records read";
						Logger::writeLog('INFO',$logFuncName,$logFuncMsg);
						return $resultArray;
					} else {
						print_r($query);
						throw new Exception("Error while executing staemement");
					}				
				} else {
					throw new Exception("Error in prepare staemement");				
				}
			}
		} catch (Exception $e) {
			Logger::writeLog('ERROR',$logFuncName,$e->getMessage());
			throw new Exception($e->getMessage());
		}
	}

	public function readDataByQuery($query,$outputArray){
		$logFuncName = get_called_class()." - readDataByQuery";
		try{
			$this->conn = Database::getConnection();
			if($stmt = $this->conn->prepare($query)){
				// $DBUtilParam = new DBUtils();
				// $stmt = $DBUtilParam->statementBindParams($stmt,$fieldValueArray);
				if($stmt->execute()){
					$DBUtil = new DBUtils();
					$resultArray = $DBUtil->statementBindResult($stmt,$outputArray);
					$logFuncMsg = get_called_class()." all records read";
					Logger::writeLog('INFO',$logFuncName,$logFuncMsg);
					return $resultArray;
				} else {
					print_r($query);
					throw new Exception("Error while executing staemement");
				}				
			} else {
				throw new Exception("Error in prepare staemement");				
			}			
		} catch (Exception $e) {
			Logger::writeLog('ERROR',$logFuncName,$e->getMessage());
			throw new Exception($e->getMessage());
		}
	}

	public function readCountByQueryForGrid($query,$inputFields){
		$logFuncName = get_called_class()." - readCountByQueryForGrid";
		try{
			$this->conn = Database::getConnection();
			$query = "SELECT COUNT(*) AS TOTAL_COUNT FROM (".$query.") AS INNERTABLE";
			if($stmt = $this->conn->prepare($query)){
				if(count($inputFields) > 0){
					$DBUtilParam = new DBUtils();
					$stmt = $DBUtilParam->statementBindParams($stmt,$inputFields);
				}
				
				if($stmt->execute()){
					$stmt->bind_result($totalCount);
					if($stmt->fetch()){
						Logger::writeLog('INFO',$logFuncName,'Total Count fetch successfully');
						return $totalCount;
						
					} else {
						Logger::writeLog('INFO',$logFuncName,'Error while fetching Total Count.');
						return 0;
					}
				} else {
					print_r($query);
					throw new Exception("Error while executing staemement");
				}				
			} else {
				throw new Exception("Error in prepare staemement");				
			}			
		} catch (Exception $e) {
			Logger::writeLog('ERROR',$logFuncName,$e->getMessage());
			throw new Exception($e->getMessage());
		}
	}

	
	public function readDataByQueryForGrid($query,$inputFields,$outputFields,$orderFields,$start,$limit){
		$logFuncName = get_called_class()." - readDataByQueryForGrid";
		try{
			$this->conn = Database::getConnection();
			$totalCount = $this->readCountByQueryForGrid($query,$inputFields);
			if($limit > 0){
				$query = $query." limit ?,?";	
				array_push($inputFields,$start,$limit);
			}

			if($stmt = $this->conn->prepare($query)){
				if(count($inputFields) > 0){
					$DBUtilParam = new DBUtils();
					$stmt = $DBUtilParam->statementBindParams($stmt,$inputFields);
				}				
				if($stmt->execute()){
					$DBUtil = new DBUtils();
					$resultArray = $DBUtil->statementBindResult($stmt,$outputFields);
					$logFuncMsg = get_called_class()." all records read";
					Logger::writeLog('INFO',$logFuncName,$logFuncMsg);
					$jsonToReturn = array();
					$jsonToReturn['count'] = $totalCount;
					$jsonToReturn['data'] = $resultArray;
					return $jsonToReturn;
				} else {
					print_r($query);
					throw new Exception("Error while executing staemement");
				}				
			} else {
				throw new Exception("Error in prepare staemement");				
			}			
		} catch (Exception $e) {
			Logger::writeLog('ERROR',$logFuncName,$e->getMessage());
			throw new Exception($e->getMessage());
		}
	}

	public function readForGrid(){
		$logFuncName = get_called_class()." - readForGrid";
		try{
			$this->conn = Database::getConnection();
			$query = "select ";
			for($i = 0;$i<count($this->fieldList);$i++){
				$query = $query.$this->fieldList[$i].",";
			}
			$query = rtrim($query,',');
			$query = $query." from ".$this->model;
			if($this->limit != 0){
				$query = $query." limit ".$this->start.",".$this->limit;
			}
			if($stmt = $this->conn->prepare($query)){
				if($stmt->execute()){
					$DBUtil = new DBUtils();
					$resultArray = $DBUtil->statementBindResult($stmt,$this->fieldList);
					$logFuncMsg = get_called_class()." all records read";
					Logger::writeLog('INFO',$logFuncName,$logFuncMsg);
					return $resultArray;
				} else {
					throw new Exception("Error while executing staemement");
				}				
			} else {
				throw new Exception("Error in prepare staemement");				
			}
		} catch (Exception $e) {
			Logger::writeLog('ERROR',$logFuncName,$e->getMessage());
			throw new Exception($e->getMessage());
		}
	}

/*
	Name : readTotalCount()
	Description : Function To read total number of records from DB Table
*/

	public function readTotalCountByCustomFields($fieldNameArray,$fieldValueArray){
		$logFuncName = get_called_class()." - readTotalCountByCustomFields";
		try {
			$this->conn = Database::getConnection();
			$query = "select count(*) as total_count from ".$this->model;
			if(count($fieldNameArray) != count($fieldValueArray)){
				throw new Exception("Number of Params in where cluse does not match with values");
			} else {
				$query = $query." where ".$fieldNameArray[0]." = ?";
				if(count($fieldNameArray) > 1){
					for ($i=1; $i < count($fieldNameArray); $i++) { 
						$query = $query." and ".$fieldNameArray[$i]." = ?";
					}	
				}

				if($stmt = $this->conn->prepare($query)){
					$DBUtilParam = new DBUtils();
					$stmt = $DBUtilParam->statementBindParams($stmt,$fieldValueArray);
					if($stmt->execute()){
						$stmt->bind_result($totalCount);
						if($stmt->fetch()){
							Logger::writeLog('INFO',$logFuncName,'Total Count fetch successfully');
							return $totalCount;
							
						} else {
							Logger::writeLog('INFO',$logFuncName,'Error while fetching Total Count.');
							return 0;
						}
					} else {
						throw new Exception('Error while executing a query');
					}
				} else {
					throw new Exception('Error while preparing statement');
				}
			}			
		} catch (Exception $e) {
			Logger::writeLog('ERROR',$logFuncName,$e->getMessage());
			throw new Exception($e->getMessage());
		}
	}


	public function readMultipleByCustomFieldsForGrid($fieldNameArray,$fieldValueArray,$start,$limit,$searchText){
		$logFuncName = get_called_class()." - readMultipleByCustomFields";
		try{
			$this->conn = Database::getConnection();
			$query = "select ";
			for($i = 0;$i<count($this->fieldList);$i++){
				$query = $query.$this->fieldList[$i].",";
			}
			$query = rtrim($query,',');
			$query = $query." from ".$this->model;
			if(count($fieldNameArray) != count($fieldValueArray)){
				throw new Exception("Number of Params in where cluse does not match with values");
			} else {
				$query = $query." where ".$fieldNameArray[0]." = ?";
				if(count($fieldNameArray) > 1){
					for ($i=1; $i < count($fieldNameArray); $i++) { 
						$query = $query." and ".$fieldNameArray[$i]." = ?";
					}	
				}
				
				if(isset($this->orderFieldList)){
					if(count($this->orderFieldList) == 1){
						$query = $query." order by ".$orderFieldList[0];
					} else if (count($this->orderFieldList) > 1) {
						$query = $query." order by";
						for ($i=0; $i < count($this->orderFieldList); $i++) { 
							$query = $query." ".$this->orderFieldList[$i].",";
						}
						$query = rtrim($query,',');
					}
				}

				if(isset($start)){
					$query = $query." limit ".$start.",".$limit;					
				}
					
				if($stmt = $this->conn->prepare($query)){
					$DBUtilParam = new DBUtils();
					$stmt = $DBUtilParam->statementBindParams($stmt,$fieldValueArray);
					if($stmt->execute()){
						$DBUtil = new DBUtils();
						$resultArray = $DBUtil->statementBindResult($stmt,$this->fieldList);
						$logFuncMsg = get_called_class()." all records read";
						Logger::writeLog('INFO',$logFuncName,$logFuncMsg);						
						return $resultArray;						
					} else {
						print_r($query);
						throw new Exception("Error while executing staemement");
					}				
				} else {
					throw new Exception("Error in prepare staemement");				
				}
			}
		} catch (Exception $e) {
			Logger::writeLog('ERROR',$logFuncName,$e->getMessage());
			throw new Exception($e->getMessage());
		}
	}
}
?>