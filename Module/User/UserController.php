<?php
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
        echo "Inside Register User";
    }

    public function activateUser($request) {
        echo "Inside Activate User";
    }

    public function getUserProfile($request) {
        echo "Inside Get User Profile";
    }
}
?>