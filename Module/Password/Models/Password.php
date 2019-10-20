<?php
require_once(ROOT_DIR.'/Module/Global/DAOUtils.php');

Class Password extends DAOUtils {
    protected $model = 'PASSWORD';
    protected $fieldList = array('SYS_PASSWORD_ID', 'SYS_CREATION_DATE', 'SYS_UPDATE_DATE', 'SYS_CREATION_USER', 'SYS_UPDATE_USER',
        'NAME', 'USERNAME', 'SITE_LINK', 'PASSWORD', 'SYS_USER_ID');
    protected $keyField = 'SYS_PASSWORD_ID';
    protected $keyFieldValue;
    protected $sysPasswordId;
    protected $sysCreationDate;
    protected $sysUpdateDate;
    protected $sysCreationUser;
    protected $sysUpdateUser;
    protected $name;
    protected $username;
    protected $siteLink;
    protected $password;
    protected $sysUserId;

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

    public function getSysPasswordId() {
        return $this->sysPasswordId;
    }

    public function setSysPasswordId($sysPasswordId) {
        $this->sysPasswordId = $sysPasswordId;
        $this->setKeyFieldValue($sysPasswordId);
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

    public function getName() {
        return $this->name;
    }

    public function setName($name) {
        $this->name = $name;
        return $this;
    }

    public function getUsername() {
        return $this->username;
    }

    public function setUsername($username) {
        $this->username = $username;
        return $this;
    }

    public function getSiteLink() {
        return $this->siteLink;
    }

    public function setSiteLink($siteLink) {
        $this->siteLink = $siteLink;
        return $this;
    }

    public function getPassword() {
        return $this->password;
    }

    public function setPassword($password) {
        $this->password = $password;
        return $this;
    }

    public function getSysUserId() {
        return $this->sysUserId;
    }

    public function setSysUserId($sysUserId) {
        $this->sysUserId = $sysUserId;
        return $this;
    }

    public function allFieldsSetter($fetchedRow) {
        try{
            $this->setSysPasswordId($fetchedRow['SYS_PASSWORD_ID']);
            $this->setSysCreationDate($fetchedRow['SYS_CREATION_DATE']);
            $this->setSysUpdateDate($fetchedRow['SYS_UPDATE_DATE']);
            $this->setSysCreationUser($fetchedRow['SYS_CREATION_USER']);
            $this->setSysUpdateUser($fetchedRow['SYS_UPDATE_USER']);
            $this->setName($fetchedRow['NAME']);
            $this->setUsername($fetchedRow['USERNAME']);
            $this->setSiteLink($fetchedRow['SITE_LINK']);
            $this->setPassword($fetchedRow['PASSWORD']);
            $this->setSysUserId($fetchedRow['SYS_USER_ID']);

            $this->setKeyFieldValue($fetchedRow['SYS_PASSWORD_ID']);
        } catch (Exception $e) {
            Logger::writeLog('ERROR', get_called_class().' - allFieldsSetter', $e->getMessage());
            throw new Exception($e->getMessage());
        }
    }

    public function allFieldsGetter() {
        try {
            $dataRow = array();
            $dataRow[0] = $this->getSysPasswordId();
            $dataRow[1] = $this->getSysCreationDate();
            $dataRow[2] = $this->getSysUpdateDate();
            $dataRow[3] = $this->getSysCreationUser();
            $dataRow[4] = $this->getSysUpdateUser();
            $dataRow[5] = $this->getName();
            $dataRow[6] = $this->getUsername();
            $dataRow[7] = $this->getSiteLink();
            $dataRow[8] = $this->getPassword();
            $dataRow[9] = $this->getSysUserId();
            
            return $dataRow;
        } catch (Exception $e) {
            Logger::writeLog('ERROR', get_called_class().' - allFieldsGetter', $e->getMessage());
            throw new Exception($e->getMessage());
        }
    }
}
?>