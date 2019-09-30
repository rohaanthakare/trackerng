<?php
require_once(ROOT_DIR.'/Module/User/UserDataAccessor.php');
Class UserModuleWorkflow {
    public function registerWorkflow($userObj) {
        try{
            // Validate if username exist
            $userDao = new UserDataAccessor();
            $userDao->getUserByUserName($userObj->getUsername());
            // Validate if email already registered
            $userDao = new UserDataAccessor();
            $userDao->getUserByEmailId($userObj->getEmailId());
            // Insert User
            $userId = $userObj->save();
            return $userId;
        } catch (Exception $e) {
            Logger::writeLog('ERROR',get_called_class().' - registerWorkflow',$e->getMessage());
            throw new Exception($e->getMessage());
        }
    }

    public function userAuthenticationWorkflow($userObj) {
        try{
            // Validate username and password
            $fieldName = array('USERNAME', 'PASSWORD');
            $fieldValue = array($userObj->getUsername(), $userObj->getPassword());
            $result = $userObj->readOneByCustomField($fieldName, $fieldValue);
            if($result) {
                session_start();
                $_SESSION['username'] = $result['USERNAME'];
                $_SESSION['user_id'] = $result['SYS_USER_ID'];
                unset($result['PASSWORD']);
            } else {
                throw new Exception('Invalid username or password');
            }
            // check if user is active or not
            // 
            return $result;
        } catch (Exception $e) {
            Logger::writeLog('ERROR',get_called_class().' - registerWorkflow',$e->getMessage());
            throw new Exception($e->getMessage());
        }
    }
}
?>