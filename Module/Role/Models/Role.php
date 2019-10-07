<?php
require_once(ROOT_DIR.'/Module/Global/DAOUtils.php');

Class Role extends DAOUtils{
    protected $model = 'ROLE';
    protected $fieldList = array('SYS_ROLE_ID', 'SYS_CREATION_DATE', 'SYS_UPDATE_DATE', 'SYS_CREATION_USER', 'SYS_UPDATE_USER',
        'ROLE_CODE', 'ROLE_NAME', 'ROLE_DESC');
    protected $keyField;
    protected $keyFieldValue;
    protected $sysRoleId;
    protected $sysCreationDate;
    protected $sysUpdateDate;
    protected $sysCreationUser;
    protected $sysUpdateUser;
    protected $roleCode;
    protected $roleName;
    protected $roleDesc;

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

    public function getSysRoleId() {
        return $this->sysRoleId;
    }

    public function setSysRoleId($sysRoleId) {
        $this->sysRoleId = $sysRoleId;
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

    public function getRoleCode() {
        return $this->roleCode;
    }

    public function setRoleCode($roleCode) {
        $this->roleCode = $roleCode;
        return $this;
    }

    public function getRoleName() {
        return $this->roleName;
    }

    public function setRoleName($roleName) {
        $this->roleName = $roleName;
        return $this;
    }

    public function getRoleDesc() {
        return $this->roleDesc;
    }

    public function setRoleDesc($roleDesc) {
        $this->roleDesc = $roleDesc;
        return $this;
    }

    public function allFieldsSetter($fetchedRow) {
        try{
            $this->setSysRoleId($fetchedRow['SYS_ROLE_ID']);
            $this->setSysCreationDate($fetchedRow['SYS_CREATION_DATE']);
            $this->setSysUpdateDate($fetchedRow['SYS_UPDATE_DATE']);
            $this->setSysCreationUser($fetchedRow['SYS_CREATION_USER']);
            $this->setSysUpdateUser($fetchedRow['SYS_UPDATE_USER']);
            $this->setRoleCode($fetchedRow['ROLE_CODE']);
            $this->setRoleName($fetchedRow['ROLE_NAME']);
            $this->setRoleDesc($fetchedRow['ROLE_DESC']);
            
            $this->setKeyFieldValue($fetchedRow['SYS_ROLE_ID']);
        } catch (Exception $e) {
            Logger::writeLog('ERROR', get_called_class().' - allFieldsSetter', $e->getMessage());
            throw new Exception($e->getMessage());
        }
    }

    public function allFieldsGetter() {
        try {
            $dataRow = array();
            $dataRow[0] = $this->getSysRoleId();
            $dataRow[1] = $this->getSysCreationDate();
            $dataRow[2] = $this->getSysUpdateDate();
            $dataRow[3] = $this->getSysCreationUser();
            $dataRow[4] = $this->getSysUpdateUser();
            $dataRow[5] = $this->getRoleCode();
            $dataRow[6] = $this->getRoleName();
            $dataRow[7] = $this->getRoleDesc();
            
            return $dataRow;
        } catch (Exception $e) {
            Logger::writeLog('ERROR', get_called_class().' - allFieldsGetter', $e->getMessage());
            throw new Exception($e->getMessage());
        }
    }
}
?>