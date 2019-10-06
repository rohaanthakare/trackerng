<?php
require_once(ROOT_DIR.'/Module/Global/DAOUtils.php');

Class MasterData extends DAOUtils {
    protected $model = 'MASTER_CONFIG_DATA';
    protected $fieldList = array('SYS_CONFIG_DATA_ID', 'SYS_CREATION_DATE', 'SYS_UPDATE_DATE', 'SYS_CREATION_USER', 'SYS_UPDATE_USER',
        'CONFIG_CODE', 'CONFIG_NAME', 'CONFIG_DESC', 'DISPLAY_ORDER','PARENT_CONFIG');
    protected $keyField;
    protected $keyFieldValue;
    protected $sysConfigDataId;
    protected $sysCreationDate;
    protected $sysUpdateDate;
    protected $sysCreationUser;
    protected $sysUpdateUser;
    protected $configCode;
    protected $configName;
    protected $configDesc;
    protected $displayOrder;
    protected $parentConfig;

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

    public function getSysConfigDataId() {
        return $this->sysConfigDataId;
    }

    public function setSysConfigDataId($sysConfigDataId) {
        $this->sysConfigDataId = $sysConfigDataId;
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

    public function getConfigCode() {
        return $this->configCode;
    }

    public function setConfigCode($configCode) {
        $this->configCode = $configCode;
        return $this;
    }

    public function getConfigName() {
        return $this->configName;
    }

    public function setConfigName($configName) {
        $this->configName = $configName;
        return $this;
    }

    public function getConfigDesc() {
        return $this->configDesc;
    }

    public function setConfigDesc($configDesc) {
        $this->configDesc = $configDesc;
        return $this;
    }

    public function getDisplayOrder() {
        return $this->displayOrder;
    }

    public function setDisplayOrder($displayOrder) {
        $this->displayOrder = $displayOrder;
        return $this;
    }

    public function getParentConfig() {
        return $this->parentConfig;
    }

    public function setParentConfig($parentConfig) {
        $this->parentConfig = $parentConfig;

        return $this;
    }

    public function allFieldsSetter($fetchedRow) {
        try{
            $this->setSysConfigDataId($fetchedRow['SYS_CONFIG_DATA_ID']);
            $this->setSysCreationDate($fetchedRow['SYS_CREATION_DATE']);
            $this->setSysUpdateDate($fetchedRow['SYS_UPDATE_DATE']);
            $this->setSysCreationUser($fetchedRow['SYS_CREATION_USER']);
            $this->setSysUpdateUser($fetchedRow['SYS_UPDATE_USER']);
            $this->setConfigCode($fetchedRow['CONFIG_CODE']);
            $this->setConfigName($fetchedRow['CONFIG_NAME']);
            $this->setConfigDesc($fetchedRow['CONFIG_DESC']);
            $this->setDisplayOrder($fetchedRow['DISPLAY_ORDER']);
            $this->setParentConfig($fetchedRow['PARENT_CONFIG']);

            $this->setKeyFieldValue($fetchedRow['SYS_CONFIG_DATA_ID']);
        } catch (Exception $e) {
            Logger::writeLog('ERROR', get_called_class().' - allFieldsSetter', $e->getMessage());
            throw new Exception($e->getMessage());
        }
    }

    public function allFieldsGetter() {
        try {
            $dataRow = array();
            $dataRow[0] = $this->getSysConfigDataId();
            $dataRow[1] = $this->getSysCreationDate();
            $dataRow[2] = $this->getSysUpdateDate();
            $dataRow[3] = $this->getSysCreationUser();
            $dataRow[4] = $this->getSysUpdateUser();
            $dataRow[5] = $this->getConfigCode();
            $dataRow[6] = $this->getConfigName();
            $dataRow[7] = $this->getConfigDesc();
            $dataRow[8] = $this->getDisplayOrder();
            $dataRow[9] = $this->getParentConfig();
            return $dataRow;
        } catch (Exception $e) {
            Logger::writeLog('ERROR', get_called_class().' - allFieldsGetter', $e->getMessage());
            throw new Exception($e->getMessage());
        }
    }
}
?>