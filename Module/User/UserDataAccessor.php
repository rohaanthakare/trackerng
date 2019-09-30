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

    public function getUserByEmailId() {}
}
?>