<?php
require_once(ROOT_DIR.'/Module/ViewMaster/Models/MasterConfigView.php');

Class MasterViewController {
    public function getUserViews() {

    }

    public function createMasterViewConfig($request) {
        try {
            $masterView = new MasterConfigView();
            $masterView->setViewCode($request['viewCode']);
            $masterView->setViewTitle($request['viewTitle']);
            $masterView->setViewName($request['viewName']);
            $masterView->setIconClass($request['icon']);
            $masterView->setViewRoute($request['route']);
            $masterView->setViewType($request['viewType']);
            if ($request['parentView']) {
                $masterDao = new MasterViewDataAccessor();
                $parentConfig = $masterDao->getDataConfigByCode($request['parentView']);
                $masterView->setParentView($parentConfig['SYS_CONFIG_VIEW_ID']);
            }
            $masterView->setDisplayOrder($request['displayOrder']);
            $masterViewId = $masterView->save();
            if($masterViewId) {
                http_response_code(200);
                $responseArr = array();
                $responseArr['success'] = true;
                $responseArr['message'] = 'Master view created for - '.$request['viewCode'];                
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