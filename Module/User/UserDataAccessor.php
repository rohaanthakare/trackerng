<?php
Class UserDataAccessor {
    public function getUserByUserName($username) {
        $userObj = new User();
        $fieldName = array('USERNAME');
        $fieldValue = array($username);
        $result = $userObj->readOneByCustomField($fieldName, $fieldValue);
        return $result;
    }

    public function getUserByEmailId($emailId) {
        $userObj = new User();
        $fieldName = array('EMAIL_ID');
        $fieldValue = array($emailId);
        $result = $userObj->readOneByCustomField($fieldName, $fieldValue);
        if($result) {
            throw new Exception('Email is already registered with Tracker, you can reset your password incase you forgot');
        }
    }

    public function getUserRole($userId) {
        try{
            $userRoleObj = new UserRoles();
            $fieldName = array('SYS_USER_ID');
            $fieldValue = array($userId);
            $result = $userRoleObj->readOneByCustomField($fieldName, $fieldValue);
            if($result['SYS_ROLE_ID']) {
                return $result;
            } else {
                throw new Exception('No Role associated with user UserId - '.$userId);
            }
        } catch (Exception $e) {
            Logger::writeLog('ERROR',get_called_class().' - getUserRole',$e->getMessage());
            throw new Exception($e->getMessage());
        }
    }
}
?>