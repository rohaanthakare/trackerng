<?php
require_once(ROOT_DIR.'/Module/DataMaster/Models/MasterData.php');

Class MasterDataAccessor {
    public function getDataConfigByCode($configCode) {
        try{
            $masterData = new MasterData();
            $fieldName = array('CONFIG_CODE');
            $fieldValue = array($configCode);
            $result = $masterData->readOneByCustomField($fieldName, $fieldValue);
            if (!$result['SYS_CONFIG_DATA_ID']) {
                throw new Exception('No Matching Master data found for config code - '.$configCode);
            }
            return $result;
        } catch (Exception $e) {
            Logger::writeLog('ERROR',get_called_class().' - getDataConfigByCode',$e->getMessage());
            throw new Exception($e->getMessage());
        }
    }
    
    public function getDataConfigsByParent() {

    }
}
?>