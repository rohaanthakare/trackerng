<?php
Class MasterViewDataAccessor {
    public function getViewConfigByViewCode($viewCode) {
        try{
            $masterView = new MasterConfigView();
            $fieldName = array('VIEW_CODE');
            $fieldValue = array($viewCode);
            $result = $masterView->readOneByCustomField($fieldName, $fieldValue);
            if (!$result['SYS_CONFIG_DATA_ID']) {
                throw new Exception('No Matching Master data found for config code - '.$viewCode);
            }
            return $result;
        } catch (Exception $e) {
            Logger::writeLog('ERROR',get_called_class().' - getViewConfigByViewCode',$e->getMessage());
            throw new Exception($e->getMessage());
        }
    }
}
?>