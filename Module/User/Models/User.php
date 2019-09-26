<?php
require_once(ROOT_DIR.'/Module/Global/DAOUtils.php');

Class User extends DAOUtils{
    protected $model = 'USER';
    protected $fieldList = array('SYS_USER_ID', 'SYS_CREATION_DATE', 'SYS_UPDATE_DATE', 'SYS_CREATION_USER', 'SYS_UPDATE_USER',
        'USERNAME', 'PASSWORD', 'FIRST_NAME', 'MIDDLE_NAME','LAST_NAME', 'DATE_OF_BIRTH', 'GENDER', 'CONTACT_NO', 'EMAIL_ID',
        'ADDRESS', 'CITY', 'STATE', 'COUNTRY', 'USER_STATUS', 'LAST_LOGIN');
    protected $keyField;
    protected $keyFieldValue;
    protected $sysUserId;
    protected $sysCreationDate;
    protected $sysUpdateDate;
    protected $sysCreationUser;
    protected $sysUpdateUser;
    protected $username;
    protected $password;
    protected $firstName;
    protected $lastName;
    protected $middleName;
    protected $dateOfBirth;
    protected $gender;
    protected $contactNo;
    protected $emailId;
    protected $address;
    protected $city;
    protected $state;
    protected $country;
    protected $userStatus;
    protected $lastLogin;

    
    public function getSysUserId() {
        return $this->sysUserId;
    }

    public function setSysUserId($sysUserId) {
        $this->sysUserId = $sysUserId;
        return $this;
    }

    public function getSysCreationDate() {
        return $this->sysCreationDate;
    }

    public function setSysCreationDate($sysCreationDate) {
        $this->sysCreationDate = $sysCreationDate;
        return $this;
    }

    public function getSysUpdateDate() {
        return $this->sysUpdateDate;
    }

    public function setSysUpdateDate($sysUpdateDate) {
        $this->sysUpdateDate = $sysUpdateDate;
        return $this;
    }

    public function getSysCreationUser() {
        return $this->sysCreationUser;
    }

    public function setSysCreationUser($sysCreationUser) {
        $this->sysCreationUser = $sysCreationUser;
        return $this;
    }

    public function getSysUpdateUser() {
        return $this->sysUpdateUser;
    }

    public function setSysUpdateUser($sysUpdateUser) {
        $this->sysUpdateUser = $sysUpdateUser;
        return $this;
    }

    public function getUsername() {
        return $this->username;
    }

    public function setUsername($username) {
        $this->username = $username;
        return $this;
    }

    public function getPassword() {
        return $this->password;
    }

    public function setPassword($password) {
        $this->password = $password;
        return $this;
    }

    public function getFirstName() {
        return $this->firstName;
    }

    public function setFirstName($firstName) {
        $this->firstName = $firstName;
        return $this;
    }

    public function getLastName() {
        return $this->lastName;
    }

    public function setLastName($lastName) {
        $this->lastName = $lastName;
        return $this;
    }

    public function getMiddleName() {
        return $this->middleName;
    }

    public function setMiddleName($middleName) {
        $this->middleName = $middleName;
        return $this;
    }

    public function getDateOfBirth() {
        return $this->dateOfBirth;
    }

    public function setDateOfBirth($dateOfBirth) {
        $this->dateOfBirth = $dateOfBirth;
        return $this;
    }

    public function getGender() {
        return $this->gender;
    }

    public function setGender($gender) {
        $this->gender = $gender;
        return $this;
    }

    public function getContactNo() {
        return $this->contactNo;
    }

    public function setContactNo($contactNo) {
        $this->contactNo = $contactNo;
        return $this;
    }

    public function getEmailId() {
        return $this->emailId;
    }

    public function setEmailId($emailId) {
        $this->emailId = $emailId;
        return $this;
    }

    public function getAddress() {
        return $this->address;
    }

    public function setAddress($address) {
        $this->address = $address;
        return $this;
    }

    public function getCity() {
        return $this->city;
    }

    public function setCity($city) {
        $this->city = $city;
        return $this;
    }

    public function getState() {
        return $this->state;
    }

    public function setState($state) {
        $this->state = $state;
        return $this;
    }

    public function getCountry() {
        return $this->country;
    }

    public function setCountry($country) {
        $this->country = $country;
        return $this;
    }

    public function getUserStatus() {
        return $this->userStatus;
    }

    public function setUserStatus($userStatus) {
        $this->userStatus = $userStatus;
        return $this;
    }

    public function getLastLogin() {
        return $this->lastLogin;
    }

    public function setLastLogin($lastLogin) {
        $this->lastLogin = $lastLogin;
        return $this;
    }

    public function getKeyField() {
        return $this->keyField;
    }

    public function setKeyField($keyField) {
        $this->keyField = $keyField;
        return $this;
    }

    public function getKeyFieldValue() {
        return $this->keyFieldValue;
    }

    public function setKeyFieldValue($keyFieldValue) {
        $this->keyFieldValue = $keyFieldValue;
        return $this;
    }

    public function allFieldsSetter($fetchedRow) {
        try{
            $this->setSysUserId($fetchedRow['SYS_USER_ID']);
            $this->setSysCreationDate($fetchedRow['SYS_CREATION_DATE']);
            $this->setSysUpdateDate($fetchedRow['SYS_UPDATE_DATE']);
            $this->setSysCreationUser($fetchedRow['SYS_CREATION_USER']);
            $this->setSysUpdateUser($fetchedRow['SYS_UPDATE_USER']);
            $this->setUsername($fetchedRow['USERNAME']);
            $this->setPassword($fetchedRow['PASSWORD']);
            $this->setFirstName($fetchedRow['FIRST_NAME']);
            $this->setMiddleName($fetchedRow['MIDDLE_NAME']);
            $this->setLastName($fetchedRow['LAST_NAME']);
            $this->setDateOfBirth($fetchedRow['DATE_OF_BIRTH']);
            $this->setGender($fetchedRow['GENDER']);
            $this->setContactNo($fetchedRow['CONTACT_NO']);
            $this->setEmailId($fetchedRow['EMAIL_ID']);
            $this->setAddress($fetchedRow['ADDRESS']);
            $this->setCity($fetchedRow['CITY']);
            $this->setState($fetchedRow['STATE']);
            $this->setCountry($fetchedRow['COUNTRY']);
            $this->setUserStatus($fetchedRow['USER_STATUS']);
            $this->setLastLogin($fetchedRow['LAST_LOGIN']);

            $this->setKeyFieldValue($fetchedRow['SYS_USER_ID']);
        } catch (Exception $e) {
            Logger::writeLog('ERROR', get_called_class().' - allFieldsSetter', $e->getMessage());
            throw new Exception($e->getMessage());
        }
    }

    public function allFieldsGetter() {
        try {
            $dataRow = array();
            $dataRow[0] = $this->getSysUserId();
            $dataRow[1] = $this->getSysCreationDate();
            $dataRow[2] = $this->getSysUpdateDate();
            $dataRow[3] = $this->getSysCreationUser();
            $dataRow[4] = $this->getSysUpdateUser();
            $dataRow[5] = $this->getUsername();
            $dataRow[6] = $this->getPassword();
            $dataRow[7] = $this->getFirstName();
            $dataRow[8] = $this->getMiddleName();
            $dataRow[9] = $this->getLastName();
            $dataRow[10] = $this->getDateOfBirth();
            $dataRow[11] = $this->getGender();
            $dataRow[12] = $this->getContactNo();
            $dataRow[13] = $this->getEmailId();
            $dataRow[14] = $this->getAddress();
            $dataRow[15] = $this->getCity();
            $dataRow[16] = $this->getState();
            $dataRow[17] = $this->getCountry();
            $dataRow[18] = $this->getUserStatus();
            $dataRow[19] = $this->getLastLogin();

            return $dataRow;
        } catch (Exception $e) {
            Logger::writeLog('ERROR', get_called_class().' - allFieldsGetter', $e->getMessage());
            throw new Exception($e->getMessage());
        }
    }
}
?>