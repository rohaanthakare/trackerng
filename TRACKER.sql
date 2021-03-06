-- phpMyAdmin SQL Dump
-- version 4.8.5
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: Nov 07, 2019 at 01:20 PM
-- Server version: 5.7.26
-- PHP Version: 7.2.18

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `TRACKER`
--

-- --------------------------------------------------------

--
-- Table structure for table `CONTACT`
--

DROP TABLE IF EXISTS `CONTACT`;
CREATE TABLE IF NOT EXISTS `CONTACT` (
  `SYS_CONTACT_ID` int(10) NOT NULL AUTO_INCREMENT,
  `SYS_CREATION_DATE` timestamp NOT NULL,
  `SYS_UPDATE_DATE` timestamp NULL DEFAULT NULL,
  `SYS_CREATION_USER` int(10) NOT NULL,
  `SYS_UPDATE_USER` int(10) DEFAULT NULL,
  `TITLE` int(10) DEFAULT NULL,
  `FIRST_NAME` varchar(40) NOT NULL,
  `MIDDLE_NAME` varchar(40) DEFAULT NULL,
  `LAST_NAME` varchar(50) DEFAULT NULL,
  `EMAIL` varchar(200) DEFAULT NULL,
  `CONTACT_NO` int(10) DEFAULT NULL,
  `SECONDARY_CONTACT_NO` int(10) DEFAULT NULL,
  `SYS_CONTACT_GROUP_ID` int(10) DEFAULT NULL,
  `SYS_USER_ID` int(10) NOT NULL,
  PRIMARY KEY (`SYS_CONTACT_ID`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `MASTER_CONFIG_DATA`
--

DROP TABLE IF EXISTS `MASTER_CONFIG_DATA`;
CREATE TABLE IF NOT EXISTS `MASTER_CONFIG_DATA` (
  `SYS_CONFIG_DATA_ID` int(10) NOT NULL AUTO_INCREMENT,
  `SYS_CREATION_DATE` timestamp NOT NULL,
  `SYS_UPDATE_DATE` timestamp NULL DEFAULT NULL,
  `SYS_CREATION_USER` int(10) NOT NULL,
  `SYS_UPDATE_USER` int(10) DEFAULT NULL,
  `CONFIG_CODE` varchar(20) NOT NULL,
  `CONFIG_NAME` varchar(30) NOT NULL,
  `CONFIG_DESC` varchar(50) DEFAULT NULL,
  `DISPLAY_ORDER` int(2) DEFAULT NULL,
  `PARENT_CONFIG` int(10) DEFAULT NULL,
  PRIMARY KEY (`SYS_CONFIG_DATA_ID`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `MASTER_CONFIG_VIEW`
--

DROP TABLE IF EXISTS `MASTER_CONFIG_VIEW`;
CREATE TABLE IF NOT EXISTS `MASTER_CONFIG_VIEW` (
  `SYS_CONFIG_VIEW_ID` int(10) NOT NULL AUTO_INCREMENT,
  `SYS_CREATION_DATE` timestamp NOT NULL,
  `SYS_UPDATE_DATE` timestamp NULL DEFAULT NULL,
  `SYS_CREATION_USER` int(10) NOT NULL,
  `SYS_UPDATE_USER` int(10) DEFAULT NULL,
  `VIEW_CODE` varchar(50) NOT NULL,
  `VIEW_TITLE` varchar(50) NOT NULL,
  `VIEW_NAME` varchar(50) NOT NULL,
  `ICON_CLASS` varchar(100) DEFAULT NULL,
  `VIEW_ROUTE` varchar(100) DEFAULT NULL,
  `VIEW_TYPE` varchar(20) DEFAULT NULL,
  `PARENT_VIEW` int(10) DEFAULT NULL,
  `DISPLAY_ORDER` int(2) DEFAULT NULL,
  `IS_MENU_ACTION` tinyint(1) DEFAULT NULL,
  `IS_TOOLBAR_ACTION` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`SYS_CONFIG_VIEW_ID`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `PASSWORD`
--

DROP TABLE IF EXISTS `PASSWORD`;
CREATE TABLE IF NOT EXISTS `PASSWORD` (
  `SYS_PASSWORD_ID` int(10) NOT NULL AUTO_INCREMENT,
  `SYS_CREATION_DATE` timestamp NOT NULL,
  `SYS_UPDATE_DATE` timestamp NULL DEFAULT NULL,
  `SYS_CREATION_USER` int(10) NOT NULL,
  `SYS_UPDATE_USER` int(10) DEFAULT NULL,
  `NAME` varchar(30) NOT NULL,
  `USERNAME` varchar(50) DEFAULT NULL,
  `SITE_LINK` varchar(200) DEFAULT NULL,
  `PASSWORD` varchar(50) NOT NULL,
  `SYS_USER_ID` int(10) NOT NULL,
  PRIMARY KEY (`SYS_PASSWORD_ID`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `ROLE`
--

DROP TABLE IF EXISTS `ROLE`;
CREATE TABLE IF NOT EXISTS `ROLE` (
  `SYS_ROLE_ID` int(10) NOT NULL AUTO_INCREMENT,
  `SYS_CREATION_DATE` timestamp NOT NULL,
  `SYS_UPDATE_DATE` timestamp NULL DEFAULT NULL,
  `SYS_CREATION_USER` int(10) NOT NULL,
  `SYS_UPDATE_USER` int(10) DEFAULT NULL,
  `ROLE_CODE` varchar(30) NOT NULL,
  `ROLE_NAME` varchar(30) NOT NULL,
  `ROLE_DESC` varchar(100) NOT NULL,
  PRIMARY KEY (`SYS_ROLE_ID`),
  UNIQUE KEY `ROLE_CODE` (`ROLE_CODE`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `ROLE_PERMISSION`
--

DROP TABLE IF EXISTS `ROLE_PERMISSION`;
CREATE TABLE IF NOT EXISTS `ROLE_PERMISSION` (
  `SYS_PERM_ID` int(10) NOT NULL AUTO_INCREMENT,
  `SYS_CREATION_DATE` timestamp NOT NULL,
  `SYS_UPDATE_DATE` timestamp NULL DEFAULT NULL,
  `SYS_CREATION_USER` int(10) NOT NULL,
  `SYS_UPDATE_USER` int(10) DEFAULT NULL,
  `SYS_ROLE_ID` int(10) NOT NULL,
  `SYS_CONFIG_VIEW_ID` int(10) NOT NULL,
  PRIMARY KEY (`SYS_PERM_ID`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `USER`
--

DROP TABLE IF EXISTS `USER`;
CREATE TABLE IF NOT EXISTS `USER` (
  `SYS_USER_ID` int(10) NOT NULL AUTO_INCREMENT,
  `SYS_CREATION_DATE` timestamp NOT NULL,
  `SYS_UPDATE_DATE` timestamp NULL DEFAULT NULL,
  `SYS_CREATION_USER` int(10) NOT NULL,
  `SYS_UPDATE_USER` int(10) DEFAULT NULL,
  `USERNAME` varchar(20) NOT NULL,
  `PASSWORD` varchar(50) NOT NULL,
  `FIRST_NAME` varchar(30) DEFAULT NULL,
  `MIDDLE_NAME` varchar(30) DEFAULT NULL,
  `LAST_NAME` varchar(30) DEFAULT NULL,
  `DATE_OF_BIRTH` date DEFAULT NULL,
  `GENDER` int(11) DEFAULT NULL,
  `CONTACT_NO` int(10) NOT NULL,
  `EMAIL_ID` varchar(120) NOT NULL,
  `ADDRESS` varchar(150) DEFAULT NULL,
  `CITY` int(11) DEFAULT NULL,
  `STATE` int(11) DEFAULT NULL,
  `COUNTRY` int(11) DEFAULT NULL,
  `USER_STATUS` int(11) DEFAULT NULL,
  `LAST_LOGIN` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`SYS_USER_ID`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `USER_ROLES`
--

DROP TABLE IF EXISTS `USER_ROLES`;
CREATE TABLE IF NOT EXISTS `USER_ROLES` (
  `SYS_USER_ROLE_ID` int(10) NOT NULL AUTO_INCREMENT,
  `SYS_CREATION_DATE` timestamp NOT NULL,
  `SYS_UPDATE_DATE` timestamp NULL DEFAULT NULL,
  `SYS_CREATION_USER` int(10) NOT NULL,
  `SYS_UPDATE_USER` int(10) DEFAULT NULL,
  `SYS_USER_ID` int(10) NOT NULL,
  `SYS_ROLE_ID` int(10) NOT NULL,
  PRIMARY KEY (`SYS_USER_ROLE_ID`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
