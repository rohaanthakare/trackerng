<?php
require_once(ROOT_DIR.'/Module/DataMaster/Models/MasterData.php');
require_once(ROOT_DIR.'/Module/DataMaster/MasterDataAccessor.php');

Class MasterDataController {
    public function getAllMasterData() {

    }

    public function createMasterData($request) {
        try {
            $masterData = new MasterData();
            $masterData->setConfigCode($request['configCode']);
            $masterData->setConfigName($request['configName']);
            $masterData->setConfigDesc($request['configDesc']);
            $masterData->setDisplayOrder($request['displayOrder']);
            if ($request['parentConfig']) {
                $masterDao = new MasterDataAccessor();
                $parentConfig = $masterDao->getDataConfigByCode($request['parentConfig']);
                $masterData->setParentConfig($parentConfig['SYS_CONFIG_DATA_ID']);
            }
            $masterDataId = $masterData->save();
            if($masterDataId) {
                http_response_code(200);
                $responseArr = array();
                $responseArr['success'] = true;
                $responseArr['message'] = 'Master data created for - '.$request['configCode'];                
                $response = json_encode($responseArr);
                echo $response;
            }
        } catch (Exception $e) {
            Logger::writeLog('ERROR',get_called_class().' - createMasterData',$e->getMessage());
            http_response_code(500);
            die($e->getMessage());
        }
    }
}
?>