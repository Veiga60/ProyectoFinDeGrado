CREATE SCHEMA IF NOT EXISTS mhcdatabase;

CREATE USER 'user'@'localhost' IDENTIFIED BY 'user';
USE mhcdatabase;
GRANT ALL PRIVILEGES ON mhcdatabase TO 'user'@'localhost';