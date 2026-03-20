CREATE SCHEMA IF NOT EXISTS mhcdatabase;

DROP USER 'user'@'localhost';
CREATE USER IF NOT EXISTS 'user'@'localhost' IDENTIFIED BY 'user';
USE mhcdatabase;
GRANT ALL PRIVILEGES ON mhcdatabase TO 'user'@'localhost';

INSERT IGNORE INTO wheel_models(wheel_model_description) VALUES ('RINKSTER MAVERICK');
INSERT IGNORE INTO wheel_models(wheel_model_description) VALUES ('RINK RAT TRICKSTER');
INSERT IGNORE INTO wheel_models(wheel_model_description) VALUES ('RINKSTER SPLITSTER');
INSERT IGNORE INTO wheel_models(wheel_model_description) VALUES ('RINKSTER SPLIT');
INSERT IGNORE INTO wheel_models(wheel_model_description) VALUES ('RINKSTER BEAST');

INSERT IGNORE INTO wheel_hardnesses(wheel_hardness_description) VALUES ('XX');
INSERT IGNORE INTO wheel_hardnesses(wheel_hardness_description) VALUES ('XXX');

INSERT IGNORE INTO wheel_sizes(wheel_size_description) VALUES ('59mm');
INSERT IGNORE INTO wheel_sizes(wheel_size_description) VALUES ('68mm');
INSERT IGNORE INTO wheel_sizes(wheel_size_description) VALUES ('72mm');
INSERT IGNORE INTO wheel_sizes(wheel_size_description) VALUES ('76mm');
INSERT IGNORE INTO wheel_sizes(wheel_size_description) VALUES ('80mm');

INSERT IGNORE INTO order_types(order_type_description) VALUES ('Sticks'); 
INSERT IGNORE INTO order_types(order_type_description) VALUES ('Ruedas'); 
