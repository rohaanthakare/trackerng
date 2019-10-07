<?php
require_once(ROOT_DIR.'/Module/Global/DAOUtils.php');
Class MasterConfigView extends DAOUtils{
    protected $model = 'MASTER_CONFIG_VIEW';
    protected $fieldList = array('SYS_CONFIG_VIEW_ID', 'SYS_CREATION_DATE', 'SYS_UPDATE_DATE', 'SYS_CREATION_USER', 'SYS_UPDATE_USER',
        'VIEW_CODE', 'VIEW_TITLE', 'VIEW_NAME', 'ICON_CLASS','VIEW_ROUTE', 'VIEW_TYPE', 'PARENT_VIEW', 'DISPLAY_ORDER');
    protected $keyField;
    protected $keyFieldValue;
    protected $sysConfigViewId;
    protected $sysCreationDate;
    protected $sysUpdateDate;
    protected $sysCreationUser;
    protected $sysUpdateUser;
    protected $viewCode;
    protected $viewTitle;
    protected $viewName;
    protected $iconClass;
    protected $viewRoute;
    protected $viewType;
    protected $parentView;
    protected $displayOrder;

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

    public function getSysConfigViewId() {
        return $this->sysConfigViewId;
    }

    public function setSysConfigViewId($sysConfigViewId) {
        $this->sysConfigViewId = $sysConfigViewId;
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

    public function getViewCode() {
        return $this->viewCode;
    }

    public function setViewCode($viewCode) {
        $this->viewCode = $viewCode;
        return $this;
    }

    public function getViewTitle() {
        return $this->viewTitle;
    }

    public function setViewTitle($viewTitle) {
        $this->viewTitle = $viewTitle;
        return $this;
    }

    public function getViewName() {
        return $this->viewName;
    }

    public function setViewName($viewName) {
        $this->viewName = $viewName;
        return $this;
    }

    public function getIconClass() {
        return $this->iconClass;
    }

    public function setIconClass($iconClass) {
        $this->iconClass = $iconClass;
        return $this;
    }

    public function getViewRoute() {
        return $this->viewRoute;
    }

    public function setViewRoute($viewRoute) {
        $this->viewRoute = $viewRoute;
        return $this;
    }

    public function getViewType() {
        return $this->viewType;
    }

    public function setViewType($viewType) {
        $this->viewType = $viewType;
        return $this;
    }

    public function getParentView() {
        return $this->parentView;
    }

    public function setParentView($parentView) {
        $this->parentView = $parentView;
        return $this;
    }

    public function getDisplayOrder() {
        return $this->displayOrder;
    }

    public function setDisplayOrder($displayOrder) {
        $this->displayOrder = $displayOrder;
        return $this;
    }

    public function allFieldsSetter($fetchedRow) {
        try{
            $this->setSysConfigViewId($fetchedRow['SYS_CONFIG_VIEW_ID']);
            $this->setSysCreationDate($fetchedRow['SYS_CREATION_DATE']);
            $this->setSysUpdateDate($fetchedRow['SYS_UPDATE_DATE']);
            $this->setSysCreationUser($fetchedRow['SYS_CREATION_USER']);
            $this->setSysUpdateUser($fetchedRow['SYS_UPDATE_USER']);
            $this->setViewCode($fetchedRow['VIEW_CODE']);
            $this->setViewTitle($fetchedRow['VIEW_TITLE']);
            $this->setViewName($fetchedRow['VIEW_NAME']);
            $this->setIconClass($fetchedRow['ICON_CLASS']);
            $this->setViewRoute($fetchedRow['VIEW_ROUTE']);
            $this->setViewType($fetchedRow['VIEW_TYPE']);
            $this->setParentView($fetchedRow['PARENT_VIEW']);
            $this->setDisplayOrder($fetchedRow['DISPLAY_ORDER']);

            $this->setKeyFieldValue($fetchedRow['SYS_CONFIG_VIEW_ID']);
        } catch (Exception $e) {
            Logger::writeLog('ERROR', get_called_class().' - allFieldsSetter', $e->getMessage());
            throw new Exception($e->getMessage());
        }
    }

    public function allFieldsGetter() {
        try {
            $dataRow = array();
            $dataRow[0] = $this->getSysConfigViewId();
            $dataRow[1] = $this->getSysCreationDate();
            $dataRow[2] = $this->getSysUpdateDate();
            $dataRow[3] = $this->getSysCreationUser();
            $dataRow[4] = $this->getSysUpdateUser();
            $dataRow[5] = $this->getViewCode();
            $dataRow[6] = $this->getViewTitle();
            $dataRow[7] = $this->getViewName();
            $dataRow[8] = $this->getIconClass();
            $dataRow[9] = $this->getViewRoute();
            $dataRow[10] = $this->getViewType();
            $dataRow[11] = $this->getParentView();
            $dataRow[12] = $this->getDisplayOrder();

            return $dataRow;
        } catch (Exception $e) {
            Logger::writeLog('ERROR', get_called_class().' - allFieldsGetter', $e->getMessage());
            throw new Exception($e->getMessage());
        }
    }
}
?>