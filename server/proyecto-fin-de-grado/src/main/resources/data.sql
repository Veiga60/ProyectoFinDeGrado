CREATE SCHEMA IF NOT EXISTS mhcdatabase;

DROP USER 'user'@'localhost';
CREATE USER IF NOT EXISTS 'user'@'localhost' IDENTIFIED BY 'user';
USE mhcdatabase;
GRANT ALL PRIVILEGES ON mhcdatabase TO 'user'@'localhost';

DELETE FROM wheel_models WHERE WHEEL_MODEL_ID >= 1;
DELETE FROM wheel_hardnesses WHERE WHEEL_HARDNESS_ID >= 1;
DELETE FROM wheel_sizes WHERE WHEEL_SIZE_ID >= 1;

INSERT INTO wheel_models(wheel_model_description) VALUES ('RINKSTER MAVERICK');
INSERT INTO wheel_models(wheel_model_description) VALUES ('RINK RAT TRICKSTER');
INSERT INTO wheel_models(wheel_model_description) VALUES ('RINKSTER SPLITSTER');
INSERT INTO wheel_models(wheel_model_description) VALUES ('RINKSTER SPLIT');
INSERT INTO wheel_models(wheel_model_description) VALUES ('RINKSTER BEAST');

INSERT INTO wheel_hardnesses(wheel_hardness_description) VALUES ('XX');
INSERT INTO wheel_hardnesses(wheel_hardness_description) VALUES ('XXX');

INSERT INTO wheel_sizes(wheel_size_description) VALUES ('59mm');
INSERT INTO wheel_sizes(wheel_size_description) VALUES ('68mm');
INSERT INTO wheel_sizes(wheel_size_description) VALUES ('72mm');
INSERT INTO wheel_sizes(wheel_size_description) VALUES ('76mm');
INSERT INTO wheel_sizes(wheel_size_description) VALUES ('80mm');
