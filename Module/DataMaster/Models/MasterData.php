<?php
Class MasterData {
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

    /**
     * Get the value of keyField
     */ 
    public function getKeyField()
    {
        return $this->keyField;
    }

    /**
     * Set the value of keyField
     *
     * @return  self
     */ 
    public function setKeyField($keyField)
    {
        $this->keyField = $keyField;

        return $this;
    }

    /**
     * Get the value of keyFieldValue
     */ 
    public function getKeyFieldValue()
    {
        return $this->keyFieldValue;
    }

    /**
     * Set the value of keyFieldValue
     *
     * @return  self
     */ 
    public function setKeyFieldValue($keyFieldValue)
    {
        $this->keyFieldValue = $keyFieldValue;

        return $this;
    }

    /**
     * Get the value of sysConfigDataId
     */ 
    public function getSysConfigDataId()
    {
        return $this->sysConfigDataId;
    }

    /**
     * Set the value of sysConfigDataId
     *
     * @return  self
     */ 
    public function setSysConfigDataId($sysConfigDataId)
    {
        $this->sysConfigDataId = $sysConfigDataId;

        return $this;
    }

    /**
     * Get the value of sysCreationDate
     */ 
    public function getSysCreationDate()
    {
        return $this->sysCreationDate;
    }

    /**
     * Set the value of sysCreationDate
     *
     * @return  self
     */ 
    public function setSysCreationDate($sysCreationDate)
    {
        $this->sysCreationDate = $sysCreationDate;

        return $this;
    }

    /**
     * Get the value of sysUpdateDate
     */ 
    public function getSysUpdateDate()
    {
        return $this->sysUpdateDate;
    }

    /**
     * Set the value of sysUpdateDate
     *
     * @return  self
     */ 
    public function setSysUpdateDate($sysUpdateDate)
    {
        $this->sysUpdateDate = $sysUpdateDate;

        return $this;
    }

    /**
     * Get the value of sysCreationUser
     */ 
    public function getSysCreationUser()
    {
        return $this->sysCreationUser;
    }

    /**
     * Set the value of sysCreationUser
     *
     * @return  self
     */ 
    public function setSysCreationUser($sysCreationUser)
    {
        $this->sysCreationUser = $sysCreationUser;

        return $this;
    }

    /**
     * Get the value of sysUpdateUser
     */ 
    public function getSysUpdateUser()
    {
        return $this->sysUpdateUser;
    }

    /**
     * Set the value of sysUpdateUser
     *
     * @return  self
     */ 
    public function setSysUpdateUser($sysUpdateUser)
    {
        $this->sysUpdateUser = $sysUpdateUser;

        return $this;
    }

    /**
     * Get the value of configCode
     */ 
    public function getConfigCode()
    {
        return $this->configCode;
    }

    /**
     * Set the value of configCode
     *
     * @return  self
     */ 
    public function setConfigCode($configCode)
    {
        $this->configCode = $configCode;

        return $this;
    }

    /**
     * Get the value of configName
     */ 
    public function getConfigName()
    {
        return $this->configName;
    }

    /**
     * Set the value of configName
     *
     * @return  self
     */ 
    public function setConfigName($configName)
    {
        $this->configName = $configName;

        return $this;
    }

    /**
     * Get the value of configDesc
     */ 
    public function getConfigDesc()
    {
        return $this->configDesc;
    }

    /**
     * Set the value of configDesc
     *
     * @return  self
     */ 
    public function setConfigDesc($configDesc)
    {
        $this->configDesc = $configDesc;

        return $this;
    }

    /**
     * Get the value of displayOrder
     */ 
    public function getDisplayOrder()
    {
        return $this->displayOrder;
    }

    /**
     * Set the value of displayOrder
     *
     * @return  self
     */ 
    public function setDisplayOrder($displayOrder)
    {
        $this->displayOrder = $displayOrder;

        return $this;
    }

    /**
     * Get the value of parentConfig
     */ 
    public function getParentConfig()
    {
        return $this->parentConfig;
    }

    /**
     * Set the value of parentConfig
     *
     * @return  self
     */ 
    public function setParentConfig($parentConfig)
    {
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