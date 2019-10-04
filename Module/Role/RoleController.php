<?php
require_once(ROOT_DIR.'/Module/Role/Models/Role.php');

Class RoleController {
    public function getAllRoles($request) {

    }

    public function createRole($request) {
        try {
            $roleObj = new Role();
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
}
?>