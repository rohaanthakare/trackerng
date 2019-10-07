<?php
require_once(ROOT_DIR.'/Module/Global/DAOUtils.php');

Class RolePermission extends DAOUtils {
    protected $model = 'ROLE_PREMISSION';
    protected $fieldList = array('SYS_PERM_ID', 'SYS_CREATION_DATE', 'SYS_UPDATE_DATE', 'SYS_CREATION_USER', 'SYS_UPDATE_USER',
        'SYS_ROLE_ID', 'SYS_CONFIG_VIEW_ID');
    protected $keyField;
    protected $keyFieldValue;
    protected $sysPermId;
    protected $sysCreationDate;
    protected $sysUpdateDate;
    protected $sysCreationUser;
    protected $sysUpdateUser;
    protected $sysRoleId;
    protected $sysConfigViewId;

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

    public function getSysPermId() {
        return $this->sysPermId;
    }

    public function setSysPermId($sysPermId) {
        $this->sysPermId = $sysPermId;
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

    public function getSysRoleId() {
        return $this->sysRoleId;
    }

    public function setSysRoleId($sysRoleId) {
        $this->sysRoleId = $sysRoleId;
        return $this;
    }

    public function getSysConfigViewId() {
        return $this->sysConfigViewId;
    }

    public function setSysConfigViewId($sysConfigViewId) {
        $this->sysConfigViewId = $sysConfigViewId;
        return $this;
    }

    public function allFieldsSetter($fetchedRow) {
        try{
            $this->setSysPermId($fetchedRow['SYS_PERM_ID']);
            $this->setSysCreationDate($fetchedRow['SYS_CREATION_DATE']);
            $this->setSysUpdateDate($fetchedRow['SYS_UPDATE_DATE']);
            $this->setSysCreationUser($fetchedRow['SYS_CREATION_USER']);
            $this->setSysUpdateUser($fetchedRow['SYS_UPDATE_USER']);
            $this->setSysRoleId($fetchedRow['SYS_ROLE_ID']);
            $this->setSysConfigViewId($fetchedRow['SYS_CONFIG_VIEW_ID']);

            $this->setKeyFieldValue($fetchedRow['SYS_PERM_ID']);
        } catch (Exception $e) {
            Logger::writeLog('ERROR', get_called_class().' - allFieldsSetter', $e->getMessage());
            throw new Exception($e->getMessage());
        }
    }

    public function allFieldsGetter() {
        try {
            $dataRow = array();
            $dataRow[0] = $this->getSysPermId();
            $dataRow[1] = $this->getSysCreationDate();
            $dataRow[2] = $this->getSysUpdateDate();
            $dataRow[3] = $this->getSysCreationUser();
            $dataRow[4] = $this->getSysUpdateUser();
            $dataRow[5] = $this->getSysRoleId();
            $dataRow[6] = $this->getSysConfigViewId();

            return $dataRow;
        } catch (Exception $e) {
            Logger::writeLog('ERROR', get_called_class().' - allFieldsGetter', $e->getMessage());
            throw new Exception($e->getMessage());
        }
    }
}
?>