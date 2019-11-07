<?php
require_once(ROOT_DIR.'/Module/User/UserDataAccessor.php');
require_once(ROOT_DIR.'/Module/User/Models/UserRoles.php');
require_once(ROOT_DIR.'/Module/DataMaster/MasterDataAccessor.php');

Class UserModuleWorkflow {
    public function registerWorkflow($userObj) {
        try{
            // Validate if username exist
            $userDao = new UserDataAccessor();
            $user = $userDao->getUserByUserName($userObj->getUsername());
            if($user['SYS_USER_ID']) {
                throw new Exception('Username already exist please choose other.');
            }
            // Validate if email already registered
            $userDao = new UserDataAccessor();
            $userDao->getUserByEmailId($userObj->getEmailId());
            // Insert User
            // Set user status to new
            $masterDao = new MasterDataAccessor();
            $newUserStatus = $masterDao->getConfigByConfigAndParent('NEW', 'USER_STATUS');
            $userObj->setUserStatus($newUserStatus['SYS_CONFIG_DATA_ID']);
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
                // Check if user is active or not.
                $masterDao = new MasterDataAccessor();

                $invitedUserStatus = $masterDao->getConfigByConfigAndParent('INVITED', 'USER_STATUS');
                $newUserStatus = $masterDao->getConfigByConfigAndParent('NEW', 'USER_STATUS');
                if ((isset($result['USER_STATUS']) && $result['USER_STATUS'] == $newUserStatus['SYS_CONFIG_DATA_ID']) || !isset($result['USER_STATUS'])) {
                    // Is new User not yet Activated.
                    throw new Exception('User is not activated, please activate from activation link sent on registered Email.');
                } else if (isset($result['USER_STATUS']) && $result['USER_STATUS'] == $invitedUserStatus['SYS_CONFIG_DATA_ID']) {
                    // User is invited but not registered.
                    throw new Exception('Looks like you are not on Tracker yet, please register.');
                }
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
            Logger::writeLog('ERROR',get_called_class().' - userAuthenticationWorkflow',$e->getMessage());
            throw new Exception($e->getMessage());
        }
    }

    public function attachRoleToUser($userName, $roleCode) {
        try {
            $userRole = new UserRoles();
            $roleDao = new RoleDataAccessor();
            $role = $roleDao->getRoleByRoleCode($roleCode);
            $userRole->setSysRoleId($role['SYS_ROLE_ID']);
            $userDao = new UserDataAccessor();
            $user = $userDao->getUserByUserName($userName);
            $userRole->setSysUserId($user['SYS_USER_ID']);
            $userRoleId = $userRole->save();
            return $userRoleId;
        } catch (Exception $e) {
            Logger::writeLog('ERROR',get_called_class().' - attachRoleToUser',$e->getMessage());
            throw new Exception($e->getMessage());
        }
    }
}
?>