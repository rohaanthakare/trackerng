<?php
Class UserDataAccessor {
    public function getUserByUserName($username) {
        $userObj = new User();
        $fieldName = array('USERNAME');
        $fieldValue = array($username);
        $result = $userObj->readOneByCustomField($fieldName, $fieldValue);
        if($result) {
            throw new Exception('Username already exist, please select other username');
        }
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
}
?>