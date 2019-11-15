<?php
require_once(ROOT_DIR.'/Module/Global/DAOUtils.php');

Class User extends DAOUtils{
    protected $model = 'CONTACT';
    protected $fieldList = array('SYS_CONTACT_ID', 'SYS_CREATION_DATE', 'SYS_UPDATE_DATE', 'SYS_CREATION_USER', 'SYS_UPDATE_USER',
        'TITLE', 'FIRST_NAME', 'MIDDLE_NAME','LAST_NAME','EMAIL', 'CONTACT_NO', 'SECONDARY_CONTACT_NO', 'SYS_CONTACT_GROUP_ID',
        'NICK_NAME', 'SYS_TRACKER_ID', 'SYS_USER_ID');
    protected $keyField = 'SYS_CONTACT_ID';
    protected $keyFieldValue;
    protected $sysContactId;
    protected $sysCreationDate;
    protected $sysUpdateDate;
    protected $sysCreationUser;
    protected $sysUpdateUser;
    protected $title;
    protected $firstName;
    protected $lastName;
    protected $middleName;
    protected $email;
    protected $contactNo;
    protected $secondaryContactNo;
    protected $sysContactGroupId;
    protected $nickName;
    protected $sysTrackerId;
    protected $sysUserId;
    
    public function getSysContactId() {
        return $this->sysContactId;
    }

    public function setSysContactId($sysContactId) {
        $this->sysContactId = $sysContactId;
        return $this;
    }

    public function getTitle() {
        return $this->title;
    }

    public function setTitle($title) {
        $this->title = $title;
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

    public function getEmail() {
        return $this->email;
    }

    public function setEmail($email) {
        $this->email = $email;
        return $this;
    }

    public function getContactNo() {
        return $this->contactNo;
    }

    public function setContactNo($contactNo) {
        $this->contactNo = $contactNo;
        return $this;
    }

    public function getSecondaryContactNo() {
        return $this->secondaryContactNo;
    }

    public function setSecondaryContactNo($secondaryContactNo) {
        $this->secondaryContactNo = $secondaryContactNo;
        return $this;
    }

    public function getSysContactGroupId() {
        return $this->sysContactGroupId;
    }

    public function setSysContactGroupId($sysContactGroupId) {
        $this->sysContactGroupId = $sysContactGroupId;
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

    public function getSysUserId() {
        return $this->sysUserId;
    }

    public function setSysUserId($sysUserId) {
        $this->sysUserId = $sysUserId;
        return $this;
    }

    public function getNickName() {
        return $this->nickName;
    }

    public function setNickName($nickName) {
        $this->nickName = $nickName;
        return $this;
    }

    public function getSysTrackerId() {
        return $this->sysTrackerId;
    }

    public function setSysTrackerId($sysTrackerId) {
        $this->sysTrackerId = $sysTrackerId;
        return $this;
    }

    public function allFieldsSetter($fetchedRow) {
        try{
            $this->setSysContactId($fetchedRow['SYS_CONTACT_ID']);
            $this->setSysCreationDate($fetchedRow['SYS_CREATION_DATE']);
            $this->setSysUpdateDate($fetchedRow['SYS_UPDATE_DATE']);
            $this->setSysCreationUser($fetchedRow['SYS_CREATION_USER']);
            $this->setSysUpdateUser($fetchedRow['SYS_UPDATE_USER']);
            $this->setTitle($fetchedRow['TITLE']);
            $this->setFirstName($fetchedRow['FIRST_NAME']);
            $this->setMiddleName($fetchedRow['MIDDLE_NAME']);
            $this->setLastName($fetchedRow['LAST_NAME']);
            $this->setEmail($fetchedRow['EMAIL']);
            $this->setContactNo($fetchedRow['CONTACT_NO']);
            $this->setSecondaryContactNo($fetchedRow['SECONDARY_CONTACT_NO']);
            $this->setSysContactGroupId($fetchedRow['SYS_CONTACT_GROUP_ID']);
            $this->setNickName($fetchedRow['NICK_NAME']);
            $this->setSysTrackerId($fetchedRow['SYS_TRACKER_ID']);
            $this->setSysUserId($fetchedRow['SYS_USER_ID']);

            $this->setKeyFieldValue($fetchedRow['SYS_CONTACT_ID']);
        } catch (Exception $e) {
            Logger::writeLog('ERROR', get_called_class().' - allFieldsSetter', $e->getMessage());
            throw new Exception($e->getMessage());
        }
    }

    public function allFieldsGetter() {
        try {
            $dataRow = array();
            $dataRow[0] = $this->getSysContactId();
            $dataRow[1] = $this->getSysCreationDate();
            $dataRow[2] = $this->getSysUpdateDate();
            $dataRow[3] = $this->getSysCreationUser();
            $dataRow[4] = $this->getSysUpdateUser();
            $dataRow[5] = $this->getTitle();
            $dataRow[6] = $this->getFirstName();
            $dataRow[7] = $this->getMiddleName();
            $dataRow[8] = $this->getLastName();
            $dataRow[9] = $this->getEmail();
            $dataRow[10] = $this->getContactNo();
            $dataRow[11] = $this->getSecondaryContactNo();
            $dataRow[12] = $this->getSysContactGroupId();
            $dataRow[13] = $this->getNickName();
            $dataRow[14] = $this->getSysTrackerId();
            $dataRow[15] = $this->getSysUserId();

            return $dataRow;
        } catch (Exception $e) {
            Logger::writeLog('ERROR', get_called_class().' - allFieldsGetter', $e->getMessage());
            throw new Exception($e->getMessage());
        }
    }
}
?>