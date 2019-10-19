<?php
Class PasswordController {
    public function getAllPasswords() {
        try {
            session_start();
            $userId = $_SESSION['user_id'];
            $passwordObj = new Password();
            $fieldName = array('SYS_USER_ID');
            $fieldValue = array($userId);
            $result = $passwordObj->readMultipleByCustomFields($fieldName,$fieldValue);
            http_response_code(200);
            $responseArr = array();
            $responseArr['success'] = true;
            $responseArr['data'] = $result;
            $response = json_encode($responseArr);
            echo $response;
        } catch (Exception $e) {
            Logger::writeLog('ERROR',get_called_class().' - getAllPasswords',$e->getMessage());
            http_response_code(500);
            die($e->getMessage());
        }
    }

    public function createPassword($request) {
        try {
            session_start();
            $userId = $_SESSION['user_id'];
            $passwordObj = new Password();
            $passwordObj->setSysUserId($userId);
            $passwordObj->setName($request['name']);
            $passwordObj->setUsername($request['username']);
            $passwordObj->setSiteLink($request['siteLink']);
            $securePass = PasswordUtils::encryptDecrypt('encrypt', $request['password']);
            $passwordObj->setPassword($securePass);
            $passwordId = $passwordObj->save();
            if($passwordId) {
                http_response_code(200);
                $responseArr = array();
                $responseArr['success'] = true;
                $responseArr['message'] = 'Password saved successfully for - '.$request['name'];
                $response = json_encode($responseArr);
                echo $response;
            }
        } catch (Exception $e) {
            Logger::writeLog('ERROR',get_called_class().' - createPassword',$e->getMessage());
            http_response_code(500);
            die($e->getMessage());
        }
    }

    public function showPassword($request) {
        try {
            $sysPasswordId = $request['id'];
            $passwordObj = new Password();
            $passwordObj->setSysPasswordId($sysPasswordId);
            $passwordObj->readOneBySysId();
            if($passwordObj->getPassword()) {
                http_response_code(200);
                $responseArr = array();
                $responseArr['success'] = true;
                $plainPass = PasswordUtils::encryptDecrypt('decrypt', $passwordObj->getPassword());
                $responseArr['data'] = $plainPass;
                $response = json_encode($responseArr);
                echo $response;
            }
        } catch (Exception $e) {
            Logger::writeLog('ERROR',get_called_class().' - showPassword',$e->getMessage());
            http_response_code(500);
            die($e->getMessage());
        }
    }

    public function deletePassword() {
        try {

        } catch (Exception $e) {
            Logger::writeLog('ERROR',get_called_class().' - deletePassword',$e->getMessage());
            http_response_code(500);
            die($e->getMessage());
        }
    }
}
?>