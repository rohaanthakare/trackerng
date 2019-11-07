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

    public function getViewConfigsByParentView($parentViewCode) {
        try{
            $parentView = $this->getViewConfigByViewCode($parentViewCode);
            $masterView = new MasterConfigView();
            $fieldName = array('PARENT_VIEW');
            $fieldValue = array($parentView['SYS_CONFIG_VIEW_ID']);
            $result = $masterView->readMultipleByCustomFields($fieldName, $fieldValue);
            if (count($result) == 0) {
                throw new Exception('No View configs found for Parent View - '.$parentViewCode);
            }
            return $result;
        } catch (Exception $e) {
            Logger::writeLog('ERROR',get_called_class().' - getViewConfigsByParentView',$e->getMessage());
            throw new Exception($e->getMessage());
        }
    }

    public function getNavigationMenu($userId) {
        try{
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
            $finalResult = array();
            for($i = 0; $i < count($result); $i++) {
                if($result[$i]['IS_MENU_ACTION'] == 1) {
                    if($result[$i]['PARENT_VIEW'] != null) {
                        $finalResult = $this->findAndUpdateNavigation($finalResult, $result[$i]);
                    } else {
                        array_push($finalResult, $result[$i]);
                    }
                }
            }
            return $finalResult;
        } catch (Exception $e) {
            Logger::writeLog('ERROR',get_called_class().' - getViewConfigByViewCode',$e->getMessage());
            throw new Exception($e->getMessage());
        }
    }

    public function findAndUpdateNavigation($inputArray, $currentView) {
        $k = 0;
        while (count($inputArray) > $k) {
            if ($inputArray[$k]['SYS_CONFIG_VIEW_ID'] == $currentView['PARENT_VIEW']) {
                if(array_key_exists('items', $inputArray[$k])) {
                    array_push($inputArray[$k]['items'], $currentView);                    
                } else {
                    $inputArray[$k]['items'] = array();
                    array_push($inputArray[$k]['items'], $currentView);
                }
                break;
            } else if (array_key_exists('items', $inputArray[$k])){
                $inputArray[$k]['items'] = $this->findAndUpdateNavigation($inputArray[$k]['items'], $currentView);
            }
            $k++;
        }
        return $inputArray;
    }
}
?>