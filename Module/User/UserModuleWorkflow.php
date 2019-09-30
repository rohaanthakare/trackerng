<?php
require_once(ROOT_DIR.'/Module/User/UserDataAccessor.php');
Class UserModuleWorkflow {
    public function registerWorkflow($userObj) {
        try{
            // Validate if username exist
            $userDao = new UserDataAccessor();
            $userDao->getUserByUserName($userObj->getUsername());
            // Validate if email already registered
            // Insert User
            $userId = $userObj->save();
            return $userId;
        } catch (Exception $e) {
            Logger::writeLog('ERROR',get_called_class().' - registerWorkflow',$e->getMessage());
            throw new Exception($e->getMessage());
        }
    }
}
?>