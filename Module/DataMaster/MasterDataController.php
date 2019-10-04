<?php
Class MasterDataController {
    public function getAllMasterData() {

    }

    public function createMasterData($request) {
        try {
            $masterData = new MasterData();
            $masterData->setConfigCode($request['configCode']);
            $masterData->setConfigName($request['configName']);
            $masterData->setConfigCode($request['configDesc']);
            $masterData->setConfigCode($request['displayOrder']);
            $masterData->setConfigCode($request['parentConfig']);
        } catch (Exception $e) {
            Logger::writeLog('ERROR',get_called_class().' - createMasterData',$e->getMessage());
            http_response_code(500);
            die($e->getMessage());
        }
    }
}
?>