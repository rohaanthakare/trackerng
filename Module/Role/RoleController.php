<?php
require_once(ROOT_DIR.'/Module/Role/Models/Role.php');
require_once(ROOT_DIR.'/Module/Role/Models/RolePermission.php');
require_once(ROOT_DIR.'/Module/Role/RoleDataAccessor.php');
require_once(ROOT_DIR.'/Module/ViewMaster/MasterViewDataAccessor.php');

Class RoleController {
    public function getAllRoles($request) {

    }

    public function createRole($request) {
        try {
            $roleObj = new Role();
            $roleObj->setRoleCode($request['roleCode']);
            $roleObj->setRoleName($request['roleName']);
            $roleObj->setRoleDesc($request['roleDesc']);
            $roleId = $roleObj->save();
            if($roleId) {
                http_response_code(200);
                $responseArr = array();
                $responseArr['success'] = true;
                $responseArr['message'] = 'Your user is created, activation link sent to registered Email-Id';                
                $response = json_encode($responseArr);
                echo $response; 
            }
        } catch (Exception $e) {
            Logger::writeLog('ERROR',get_called_class().' - createRole',$e->getMessage());
            http_response_code(500);
            die($e->getMessage());
        }
    }

    public function createRolePermissions($request) {
        try {
            $rolePerm = new RolePermission();
            $viewMaster = new MasterViewDataAccessor();
            $viewConfig = $viewMaster->getViewConfigByViewCode($request['viewCode']);
            if($viewConfig['SYS_CONFIG_VIEW_ID']) {
                $rolePerm->setSysConfigViewId($viewConfig['SYS_CONFIG_VIEW_ID']);
            }
            $roleDao = new RoleDataAccessor();
            $role = $roleDao->getRoleByRoleCode($request['roleCode']);
            if($role['SYS_ROLE_ID']) {
                $rolePerm->setSysRoleId($role['SYS_ROLE_ID']);
            }
            $roleParmId = $rolePerm->save();
            if($roleParmId) {
                http_response_code(200);
                $responseArr = array();
                $responseArr['success'] = true;
                $responseArr['message'] = 'Role Permission created successfully';                
                $response = json_encode($responseArr);
                echo $response; 
            }
        } catch (Exception $e) {
            Logger::writeLog('ERROR',get_called_class().' - createRolePermissions',$e->getMessage());
            http_response_code(500);
            die($e->getMessage());
        }
    }
}
?>