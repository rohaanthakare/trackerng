<?php
require_once(ROOT_DIR.'/Module/Global/DAOUtils.php');

Class UserRoles extends DAOUtils{
    protected $model = 'USER_ROLES';
    protected $fieldList = array('SYS_USER_ROLE_ID', 'SYS_CREATION_DATE', 'SYS_UPDATE_DATE', 'SYS_CREATION_USER', 'SYS_UPDATE_USER',
        'SYS_USER_ID', 'SYS_ROLE_ID');
    protected $keyField;
    protected $keyFieldValue;
    protected $sysUserRoleId;
    protected $sysCreationDate;
    protected $sysUpdateDate;
    protected $sysCreationUser;
    protected $sysUpdateUser;    
    protected $sysUserId;
    protected $sysRoleId;

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

    public function getSysUserRoleId() {
        return $this->sysUserRoleId;
    }

    public function setSysUserRoleId($sysUserRoleId) {
        $this->sysUserRoleId = $sysUserRoleId;
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

    public function getSysUserId() {
        return $this->sysUserId;
    }

    public function setSysUserId($sysUserId) {
        $this->sysUserId = $sysUserId;
        return $this;
    }

    public function getSysRoleId() {
        return $this->sysRoleId;
    }

    public function setSysRoleId($sysRoleId) {
        $this->sysRoleId = $sysRoleId;
        return $this;
    }

    public function allFieldsSetter($fetchedRow) {
        try{
            $this->setSysUserRoleId($fetchedRow['SYS_USER_ROLE_ID']);
            $this->setSysCreationDate($fetchedRow['SYS_CREATION_DATE']);
            $this->setSysUpdateDate($fetchedRow['SYS_UPDATE_DATE']);
            $this->setSysCreationUser($fetchedRow['SYS_CREATION_USER']);
            $this->setSysUpdateUser($fetchedRow['SYS_UPDATE_USER']);
            $this->setSysUserId($fetchedRow['SYS_USER_ID']);
            $this->setSysRoleId($fetchedRow['SYS_ROLE_ID']);

            $this->setKeyFieldValue($fetchedRow['SYS_USER_ROLE_ID']);
        } catch (Exception $e) {
            Logger::writeLog('ERROR', get_called_class().' - allFieldsSetter', $e->getMessage());
            throw new Exception($e->getMessage());
        }
    }

    public function allFieldsGetter() {
        try {
            $dataRow = array();
            $dataRow[0] = $this->getSysUserRoleId();
            $dataRow[1] = $this->getSysCreationDate();
            $dataRow[2] = $this->getSysUpdateDate();
            $dataRow[3] = $this->getSysCreationUser();
            $dataRow[4] = $this->getSysUpdateUser();
            $dataRow[5] = $this->getSysUserId();
            $dataRow[6] = $this->getSysRoleId();

            return $dataRow;
        } catch (Exception $e) {
            Logger::writeLog('ERROR', get_called_class().' - allFieldsGetter', $e->getMessage());
            throw new Exception($e->getMessage());
        }
    }
}
?>