<?php
Class UserController{
    public function authenticateUser($request) {
        try {
            if($request['username'] != 'demo') {
                throw new Exception('Invalid username or password');
            }
            $responseArr = array();
            $responseArr['success'] = true;
            $responseArr['message'] = 'User authenticated successfully';
            $response = json_encode($responseArr);
            echo $response;
        } catch (Exception $e) {
            Logger::writeLog('ERROR','User - authenticateUser',$e->getMessage());
            $responseArr = array();
            $responseArr['success'] = false;
            $responseArr['message'] = $e->getMessage();
            $response = json_encode($responseArr);
            http_response_code(500);
            echo $response;
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