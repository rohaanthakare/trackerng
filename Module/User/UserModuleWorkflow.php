<?php
Class UserModuleWorkflow {
    public function registerWorkflow($userObj) {
        // Validate if username exist
        // Validate if email already registered
        // Insert User
        $userId = $userObj->save();
        return $userId;
    }
}
?>