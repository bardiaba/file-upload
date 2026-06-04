CREATE DATABASE file_upload;
USE file_upload;

CREATE TABLE `users` (
  `username` varchar(50) NOT NULL,
  `password_hash` char(60) NOT NULL,
  PRIMARY KEY (`username`)
);


CREATE TABLE `uploads` (
  `uuid` char(36) NOT NULL,
  `file_name` varchar(255) NOT NULL,
  `file_size` int(10) unsigned NOT NULL,
  `uploaded_at` timestamp NULL DEFAULT current_timestamp(),
  `file_location` varchar(255) NOT NULL,
  `password_hash` char(60) DEFAULT NULL,
  `uploaded_by` varchar(50) NOT NULL,
  PRIMARY KEY (`uuid`),
  KEY `uploaded_by` (`uploaded_by`),
  CONSTRAINT `1` FOREIGN KEY (`uploaded_by`) REFERENCES `users` (`username`) ON DELETE CASCADE
)
