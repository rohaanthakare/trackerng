<?php
Class MasterViewDataAccessor {
    public function getViewConfigByViewCode($viewCode) {
        try{
            $masterView = new MasterConfigView();
            $fieldName = array('VIEW_CODE');
            $fieldValue = array($viewCode);
            $result = $masterView->readOneByCustomField($fieldName, $fieldValue);
            if (!$result['SYS_CONFIG_VIEW_ID']) {
                throw new Exception('No Matching Master data found for config code - '.$viewCode);
            }
            return $result;
        } catch (Exception $e) {
            Logger::writeLog('ERROR',get_called_class().' - getViewConfigByViewCode',$e->getMessage());
            throw new Exception($e->getMessage());
        }
    }

    public function getNavigationMenu($userId) {
        try{
            Logger::writeLog('DEBUG',get_called_class().' - getNavigationMenu','User Id - '.$userId);
            $userRoleDao = new UserDataAccessor();
            $role = $userRoleDao->getUserRole($userId);
            $roleDao = new RoleDataAccessor();
            $views = $roleDao->getRolePermissions($role['SYS_ROLE_ID']);
            $result = array();
            for($i = 0; $i < count($views); $i++) {
                $masterView = new MasterConfigView();
                $masterView->setSysConfigViewId($views[$i]['SYS_CONFIG_VIEW_ID']);
                $result[$i] = $masterView->readOneBySysId();
            }
            return $result;
        } catch (Exception $e) {
            Logger::writeLog('ERROR',get_called_class().' - getViewConfigByViewCode',$e->getMessage());
            throw new Exception($e->getMessage());
        }
    }
}
?>