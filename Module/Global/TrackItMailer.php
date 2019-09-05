<?php
require_once ('Logger.php');
require_once ('PHPMailerAutoload.php');
require_once ('Configuration.php');

Class TrackItMailer{
	private static $adminMailId = 'trackermaster001@gmail.com';
	private static $mailSMTPHost = 'smtp.mail.yahoo.com';
	private static $adminMailPassword = 'admin@track';
	private static $mailObj;

	private static function sendMailSetup(){
		self::$mailObj = new PHPMailer;
		self::$mailObj->isSMTP();                                      // Set mailer to use SMTP
		self::$mailObj->Host = 'smtp.mail.yahoo.com';  // Specify main and backup SMTP servers
		self::$mailObj->SMTPAuth = true;                               // Enable SMTP authentication
		self::$mailObj->Username = 'it.track@yahoo.in';                 // SMTP username
		self::$mailObj->Password = 'admin@trac';                           // SMTP password
		self::$mailObj->SMTPSecure = 'tls';                            // Enable TLS encryption, `ssl` also accepted
		self::$mailObj->Port = 587;                                    // TCP port to connect to
		self::$mailObj->From = 'it.track@yahoo.in';
		self::$mailObj->FromName = 'Tracker';
		self::$mailObj->isHTML(true);                                  // Set email format to HTML
	}

	private static function welcomeMailToUser($mailParam){
		self::$mailObj->Subject = 'Welcome to Tracker';
		$trackerLogo = self::getHeaderImage();
		$accountsLogo = self::getMailImage('accounts_icon');
		$expenseLogo = self::getMailImage('expense_icon');
		$settlementLogo = self::getMailImage('settlement_icon');
		$passwordLogo = self::getMailImage('password_icon');
		$laptopLogo = self::getMailImage('laptop_and_ipad');
		self::$mailObj->AddEmbeddedImage($trackerLogo, 'tracker_logo');
		self::$mailObj->AddEmbeddedImage($accountsLogo, 'accounts_icon');
		self::$mailObj->AddEmbeddedImage($expenseLogo, 'expense_icon');
		self::$mailObj->AddEmbeddedImage($settlementLogo, 'settlement_icon');
		self::$mailObj->AddEmbeddedImage($passwordLogo, 'password_icon');
		self::$mailObj->AddEmbeddedImage($laptopLogo, 'laptop_and_ipad');
		// $msgBody = self::forgotPasswordMailMsg($mailParam);
		$mailParam['siteURL'] = Configuration::getConfigParamValue('SITE_URL');
		ob_start();
		include(ROOT_DIR."MailTemplates/WelcomeMailTemplate.php");
		$result = ob_get_contents();
		ob_clean();
		self::$mailObj->Body = $result;
	}

	private static function trackitInvitationMail($mailParam){
		$fullName = ucwords($mailParam['firstname'])." ".ucwords($mailParam['lastname']);
		self::$mailObj->Subject = 'Tracker - Invitation from '.$fullName;
		$trackerLogo = self::getHeaderImage();
		$accountsLogo = self::getMailImage('accounts_icon');
		$expenseLogo = self::getMailImage('expense_icon');
		$settlementLogo = self::getMailImage('settlement_icon');
		$passwordLogo = self::getMailImage('password_icon');
		$laptopLogo = self::getMailImage('laptop_and_ipad');
		self::$mailObj->AddEmbeddedImage($trackerLogo, 'tracker_logo');
		self::$mailObj->AddEmbeddedImage($accountsLogo, 'accounts_icon');
		self::$mailObj->AddEmbeddedImage($expenseLogo, 'expense_icon');
		self::$mailObj->AddEmbeddedImage($settlementLogo, 'settlement_icon');
		self::$mailObj->AddEmbeddedImage($passwordLogo, 'password_icon');
		self::$mailObj->AddEmbeddedImage($laptopLogo, 'laptop_and_ipad');
		$mailParam['siteURL'] = Configuration::getConfigParamValue('SITE_URL');
		ob_start();
		include(ROOT_DIR."MailTemplates/InvitationMailTemplate.php");
		$result = ob_get_contents();
		ob_clean();
		self::$mailObj->Body = $result;
	}

	private static function forgotPasswordMailToUser($mailParam){
		self::$mailObj->Subject = 'Tracker - Password reset';
		
		$trackerLogo = self::getHeaderImage();
		$accountsLogo = self::getMailImage('accounts_icon');
		$expenseLogo = self::getMailImage('accounts_icon');
		$settlementLogo = self::getMailImage('accounts_icon');
		$eventLogo = self::getMailImage('accounts_icon');
		$full_name = 'Dhating Dhating';
		self::$mailObj->AddEmbeddedImage($trackerLogo, 'tracker_logo');
		$mailParam['siteURL'] = Configuration::getConfigParamValue('SITE_URL');
		ob_start();
		include(ROOT_DIR."MailTemplates/ForgotPasswordMailTemplate.php");
		$result = ob_get_contents();
		ob_clean();
		self::$mailObj->Body = $result;
	}

	private static function userAccountConfirmationMail($mailParam){
		self::$mailObj->Subject = 'Tracker - Account Activation';
		
		$trackerLogo = self::getHeaderImage();
		self::$mailObj->AddEmbeddedImage($trackerLogo, 'tracker_logo');

		$mailParam['siteURL'] = Configuration::getConfigParamValue('SITE_URL');
		ob_start();
		include(ROOT_DIR."MailTemplates/RegistrationConfirmationMailTemplate.php");
		$result = ob_get_contents();
		ob_clean();
		self::$mailObj->Body = $result;
	}

	private static function trackitEventDepositMail($mailParam){
		self::$mailObj->Subject = 'Track It - '.$mailParam['EVENT_NAME'].' Deposit';
		
		$logoPath = self::getMailSignature();
		self::$mailObj->AddEmbeddedImage($logoPath, 'trackit_logo');
		$msgBody = self::eventDepositMsg($mailParam);
		self::$mailObj->Body = $msgBody;
	}

	private static function trackitEventTransactionMail($mailParam){
		self::$mailObj->Subject = 'Track It - '.$mailParam['EVENT_NAME'].' Transaction';
		
		$logoPath = self::getMailSignature();
		self::$mailObj->AddEmbeddedImage($logoPath, 'trackit_logo');
		$msgBody = self::eventTransactionMsg($mailParam);
		self::$mailObj->Body = $msgBody;
	}

	private static function getMailSignature(){
		$currentWorkingDir = $_SERVER['DOCUMENT_ROOT'];
		$app_conf = parse_ini_file('Configuration.ini',TRUE);
		$app_mode = $app_conf['APP_MODE']['APP_MODE'];	
		$LOGO_PATH_SEPARATOR = $app_conf[$app_mode]['REF_DATA_PATH_SEPARATOR'];
		$PROJECT_NAME = $app_conf[$app_mode]['PROJECT_NAME'];
		
		$logoPath = $currentWorkingDir.$PROJECT_NAME.'/images/logo2.png';
		return $logoPath;
	}

	private static function getHeaderImage(){
		$currentWorkingDir = $_SERVER['DOCUMENT_ROOT'];
		$app_conf = parse_ini_file('Configuration.ini',TRUE);
		$app_mode = $app_conf['APP_MODE']['APP_MODE'];	
		$LOGO_PATH_SEPARATOR = $app_conf[$app_mode]['REF_DATA_PATH_SEPARATOR'];
		$PROJECT_NAME = $app_conf[$app_mode]['PROJECT_NAME'];
		
		$logoPath = $currentWorkingDir.$PROJECT_NAME.'/images/Logos/Blue/tracker_blue.png';
		return $logoPath;
	}

	private static function getMailImage($imageType){
		$currentWorkingDir = $_SERVER['DOCUMENT_ROOT'];
		$app_conf = parse_ini_file('Configuration.ini',TRUE);
		$app_mode = $app_conf['APP_MODE']['APP_MODE'];	
		$LOGO_PATH_SEPARATOR = $app_conf[$app_mode]['REF_DATA_PATH_SEPARATOR'];
		$PROJECT_NAME = $app_conf[$app_mode]['PROJECT_NAME'];
		
		switch ($imageType) {
			case 'accounts_icon':
				$logoPath = $currentWorkingDir.$PROJECT_NAME.'/images/Icons/35baf6/64/bank_account.png';
				break;
			case 'password_icon':
				$logoPath = $currentWorkingDir.$PROJECT_NAME.'/images/Icons/35baf6/64/password.png';
				break;
			case 'expense_icon':
				$logoPath = $currentWorkingDir.$PROJECT_NAME.'/images/Icons/35baf6/64/expense.png';
				break;		
			case 'settlement_icon':
				$logoPath = $currentWorkingDir.$PROJECT_NAME.'/images/Icons/35baf6/64/settlement.png';
				break;
			case 'laptop_and_ipad':
				$logoPath = $currentWorkingDir.$PROJECT_NAME.'/images/Other/invite_mail.png';
				break;	
			default:
				$logoPath = $currentWorkingDir.$PROJECT_NAME.'/images/Logos/Blue/tracker_white.png';
				break;
		}
		
		return $logoPath;
	}

	private static function newUserMailToAdmin($mailParam){
		self::$mailObj->Subject = 'New Track It All User';
		$fullName = ucwords($mailParam['first_name'])." ".ucwords($mailParam['last_name']);
		$msgBody = "Hi Admin,<br>";
		$msgBody = $msgBody."<br>New user <b>".$fullName."</b> registred in system. Please initiate process of Activation.";
		self::$mailObj->Body = $msgBody;
	}

	public static function sendMail($toMailId,$mailTemplate,$mailParam){
		     // Add a recipient
		self::sendMailSetup();
		if($mailTemplate == 'USER_WELCOME'){
			self::$mailObj->addAddress($toMailId);
			self::welcomeMailToUser($mailParam);
		} else if ($mailTemplate == 'NEW_USER_NOTIFICATION_ADMIN'){
			self::$mailObj->addAddress(self::$adminMailId);
			self::newUserMailToAdmin($mailParam);
		} else if ($mailTemplate == 'FORGOT_PASSMAIL'){
			self::$mailObj->addAddress($toMailId);
			self::forgotPasswordMailToUser($mailParam);
		} else if($mailTemplate == 'USER_INVITATION'){
			self::$mailObj->addAddress($toMailId);
			self::trackitInvitationMail($mailParam);
		} else if($mailTemplate == 'EVENT_DEPOSIT'){
			self::$mailObj->addAddress($toMailId);
			self::trackitEventDepositMail($mailParam);
		} else if($mailTemplate == 'EVENT_TRANSACTION'){
			self::$mailObj->addAddress($toMailId);
			self::trackitEventTransactionMail($mailParam);
		} else if($mailTemplate == 'USER_CONFIRMATION'){
			self::$mailObj->addAddress($toMailId);
			self::userAccountConfirmationMail($mailParam);
		}


		if(!self::$mailObj->send()) {
		    Logger::writeLog('ERROR','TrackItMailer','Error while sending mail - '.self::$mailObj->ErrorInfo);
		} else {
		    Logger::writeLog('INFO','TrackItMailer','Email Sent successfully');
		}
	}



}





//$mail->SMTPDebug = 3;                               // Enable verbose debug output



// $mail->addAddress('ellen@example.com');               // Name is optional
// $mail->addReplyTo('info@example.com', 'Information');
// $mail->addCC('cc@example.com');
// $mail->addBCC('bcc@example.com');

// $mail->addAttachment('/var/tmp/file.tar.gz');         // Add attachments
// $mail->addAttachment('/tmp/image.jpg', 'new.jpg');    // Optional name


// $mail->AltBody = 'This is the body in plain text for non-HTML mail clients';
?>