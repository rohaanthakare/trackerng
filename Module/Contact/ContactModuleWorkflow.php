<?php
require_once(ROOT_DIR.'/Module/Contact/Models/Contact.php');

Class ContactModuleWorkflow {
    public function createContactWorkflow($contact) {
        try {
            // Check if contact has email or contact number
            $email = $contact->getEmail();
            $contactNo = $contact->getContactNo();
            if (!isset($email) && !isset($contactNo)) {
                $sysContactId = $contact->save();
                return $sysContactId;
            }
            // If email and contact number not present create contact
            // Check if email exist in user
            // If email exist in user set tracker id as user id and create contact
            // Check if contact number exist in user
            // If contact number exist in user set tracker id as user id and create contact
        } catch (Exception $e) {
            Logger::writeLog('ERROR',get_called_class().' - createContactWorkflow',$e->getMessage());
            throw new Exception($e->getMessage());
        }
    }
}
?>