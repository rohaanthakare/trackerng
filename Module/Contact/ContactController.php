<?php
Class ContactController {
    public function getUserContacts() {
        try {

        } catch (Exception $e) {
            Logger::writeLog('ERROR',get_called_class().' - getUserContacts',$e->getMessage());
            http_response_code(500);
            die($e->getMessage());
        }
    }

    public function createUserContact() {
        try {

        } catch (Exception $e) {
            Logger::writeLog('ERROR',get_called_class().' - createUserContact',$e->getMessage());
            http_response_code(500);
            die($e->getMessage());
        }
    }

    public function updateUserContact() {
        try {

        } catch (Exception $e) {
            Logger::writeLog('ERROR',get_called_class().' - updateUserContact',$e->getMessage());
            http_response_code(500);
            die($e->getMessage());
        }
    }

    public function deleteUserContact() {
        try {

        } catch (Exception $e) {
            Logger::writeLog('ERROR',get_called_class().' - deleteUserContact',$e->getMessage());
            http_response_code(500);
            die($e->getMessage());
        }
    }
}
?>