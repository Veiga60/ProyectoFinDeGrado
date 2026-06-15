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

INSERT IGNORE INTO stick_models(stick_model_description) VALUES ('SENIOR');
INSERT IGNORE INTO stick_models(stick_model_description) VALUES ('INTERMEDIATE');
INSERT IGNORE INTO stick_models(stick_model_description) VALUES ('JUNIOR');
INSERT IGNORE INTO stick_models(stick_model_description) VALUES ('YOUTH');

INSERT IGNORE INTO stick_lengths(stick_length_description) VALUES ('65"');
INSERT IGNORE INTO stick_lengths(stick_length_description) VALUES ('63"');
INSERT IGNORE INTO stick_lengths(stick_length_description) VALUES ('57"');
INSERT IGNORE INTO stick_lengths(stick_length_description) VALUES ('47"');
INSERT IGNORE INTO stick_lengths(stick_length_description) VALUES ('52"');
INSERT IGNORE INTO stick_lengths(stick_length_description) VALUES ('56"');

INSERT IGNORE INTO stick_weights(stick_weight_description) VALUES ('400g');
INSERT IGNORE INTO stick_weights(stick_weight_description) VALUES ('310g');
INSERT IGNORE INTO stick_weights(stick_weight_description) VALUES ('260g');

INSERT IGNORE INTO stick_blades(stick_blade_description) VALUES ('P92');
INSERT IGNORE INTO stick_blades(stick_blade_description) VALUES ('P28');
INSERT IGNORE INTO stick_blades(stick_blade_description) VALUES ('P88');
INSERT IGNORE INTO stick_blades(stick_blade_description) VALUES ('PM9');
INSERT IGNORE INTO stick_blades(stick_blade_description) VALUES ('P91A');
INSERT IGNORE INTO stick_blades(stick_blade_description) VALUES ('P02');
INSERT IGNORE INTO stick_blades(stick_blade_description) VALUES ('P14R');
INSERT IGNORE INTO stick_blades(stick_blade_description) VALUES ('P92M');
INSERT IGNORE INTO stick_blades(stick_blade_description) VALUES ('P90TM');
INSERT IGNORE INTO stick_blades(stick_blade_description) VALUES ('P77');
INSERT IGNORE INTO stick_blades(stick_blade_description) VALUES ('P28M');

INSERT IGNORE INTO stick_flexes(stick_flex_description) VALUES ('20');
INSERT IGNORE INTO stick_flexes(stick_flex_description) VALUES ('30');
INSERT IGNORE INTO stick_flexes(stick_flex_description) VALUES ('40');
INSERT IGNORE INTO stick_flexes(stick_flex_description) VALUES ('45');
INSERT IGNORE INTO stick_flexes(stick_flex_description) VALUES ('50');
INSERT IGNORE INTO stick_flexes(stick_flex_description) VALUES ('55');
INSERT IGNORE INTO stick_flexes(stick_flex_description) VALUES ('60');
INSERT IGNORE INTO stick_flexes(stick_flex_description) VALUES ('65');
INSERT IGNORE INTO stick_flexes(stick_flex_description) VALUES ('70');
INSERT IGNORE INTO stick_flexes(stick_flex_description) VALUES ('75');
INSERT IGNORE INTO stick_flexes(stick_flex_description) VALUES ('85');
INSERT IGNORE INTO stick_flexes(stick_flex_description) VALUES ('95');
INSERT IGNORE INTO stick_flexes(stick_flex_description) VALUES ('102');
INSERT IGNORE INTO stick_flexes(stick_flex_description) VALUES ('112');

INSERT IGNORE INTO stick_kickpoints(stick_kickpoint_description) VALUES ('Low kickpoint');
INSERT IGNORE INTO stick_kickpoints(stick_kickpoint_description) VALUES ('Mid kickpoint');
INSERT IGNORE INTO stick_kickpoints(stick_kickpoint_description) VALUES ('High kickpoint');

INSERT IGNORE INTO stick_grips(stick_grip_description) VALUES ('Sin grip');
INSERT IGNORE INTO stick_grips(stick_grip_description) VALUES ('Grip normal');
INSERT IGNORE INTO stick_grips(stick_grip_description) VALUES ('Tactile grip');



