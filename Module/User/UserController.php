<?php
require_once(ROOT_DIR.'/Module/Global/PasswordUtils.php');
require_once(ROOT_DIR.'/Module/User/Models/User.php');
require_once(ROOT_DIR.'/Module/User/UserModuleWorkflow.php');

Class UserController{
    public function authenticateUser($request) {
        try {
            if($request['username'] != 'demo') {
                throw new Exception('Invalid username or password');
            }
            $responseArr = array();
            $responseArr['success'] = true;
            $responseArr['user']['username'] = $request['username'];
            $responseArr['user']['first_name'] = 'demo';
            $responseArr['user']['last_name'] = 'demo';
            $responseArr['token'] = 'demo_token';
            $response = json_encode($responseArr);
            echo $response;
        } catch (Exception $e) {
            Logger::writeLog('ERROR','User - authenticateUser',$e->getMessage());
            http_response_code(500);
            die($e->getMessage());
        }
    }

    public function registerUser($request) {
        try {
            $user = new User();
            $user->setUsername($request['username']);
            $securePassword = PasswordUtils::encryptDecrypt('encrypt',$request['password']);
            $user->setPassword($securePassword);
            $user->setEmailId($request['emailId']);
            $user->setContactNo($request['contactNo']);

            $userWf = new UserModuleWorkflow();
            $result = $userWf->registerWorkflow($user);
            if($result) {
                http_response_code(200);
                $responseArr = array();
                $responseArr['success'] = true;
                $responseArr['message'] = 'Your user is created, activation link sent to registered Email-Id';                
                $response = json_encode($responseArr);
                echo $response;
            }
        } catch (Exception $e) {
            Logger::writeLog('ERROR',get_called_class().' - registerUser',$e->getMessage());
            http_response_code(500);
            die($e->getMessage());
        }
    }

    public function activateUser($request) {
        echo "Inside Activate User";
    }

    public function getUserProfile($request) {
        echo "Inside Get User Profile";
    }
}
?>