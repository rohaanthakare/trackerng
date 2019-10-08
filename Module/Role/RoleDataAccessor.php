<?php
require_once(ROOT_DIR.'/Module/Role/Models/Role.php');

Class RoleDataAccessor {
    public function getRoleByRoleCode($roleCode) {
        try {
            $role = new Role();
            $fieldName = array('ROLE_CODE');
            $fieldValue = array($roleCode);
            $result = $role->readOneByCustomField($fieldName,$fieldValue);
            if(!$result['ROLE_CODE']) {
                throw new Exception('No Matching role found for Role Code - '.$roleCode);
            }
            return $result;
        } catch (Exception $e) {
            Logger::writeLog('ERROR',get_called_class().' - getRoleByRoleCode',$e->getMessage());
        }
    }
}
?>