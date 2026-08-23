INSERT INTO wheel_models (wheel_model_description)
VALUES ('RINKSTER MAVERICK')
ON CONFLICT (wheel_model_description) DO NOTHING;

INSERT INTO wheel_models (wheel_model_description)
VALUES ('RINK RAT TRICKSTER')
ON CONFLICT (wheel_model_description) DO NOTHING;

INSERT INTO wheel_models (wheel_model_description)
VALUES ('RINKSTER SPLITSTER')
ON CONFLICT (wheel_model_description) DO NOTHING;

INSERT INTO wheel_models (wheel_model_description)
VALUES ('RINKSTER SPLIT')
ON CONFLICT (wheel_model_description) DO NOTHING;

INSERT INTO wheel_models (wheel_model_description)
VALUES ('RINKSTER BEAST')
ON CONFLICT (wheel_model_description) DO NOTHING;


INSERT INTO wheel_hardnesses (wheel_hardness_description)
VALUES ('XX')
ON CONFLICT (wheel_hardness_description) DO NOTHING;

INSERT INTO wheel_hardnesses (wheel_hardness_description)
VALUES ('XXX')
ON CONFLICT (wheel_hardness_description) DO NOTHING;


INSERT INTO wheel_sizes (wheel_size_description)
VALUES ('59mm')
ON CONFLICT (wheel_size_description) DO NOTHING;

INSERT INTO wheel_sizes (wheel_size_description)
VALUES ('68mm')
ON CONFLICT (wheel_size_description) DO NOTHING;

INSERT INTO wheel_sizes (wheel_size_description)
VALUES ('72mm')
ON CONFLICT (wheel_size_description) DO NOTHING;

INSERT INTO wheel_sizes (wheel_size_description)
VALUES ('76mm')
ON CONFLICT (wheel_size_description) DO NOTHING;

INSERT INTO wheel_sizes (wheel_size_description)
VALUES ('80mm')
ON CONFLICT (wheel_size_description) DO NOTHING;


INSERT INTO order_types (order_type_description)
VALUES ('Sticks')
ON CONFLICT (order_type_description) DO NOTHING;

INSERT INTO order_types (order_type_description)
VALUES ('Ruedas')
ON CONFLICT (order_type_description) DO NOTHING;


INSERT INTO stick_models (stick_model_description)
VALUES ('SENIOR')
ON CONFLICT (stick_model_description) DO NOTHING;

INSERT INTO stick_models (stick_model_description)
VALUES ('INTERMEDIATE')
ON CONFLICT (stick_model_description) DO NOTHING;

INSERT INTO stick_models (stick_model_description)
VALUES ('JUNIOR')
ON CONFLICT (stick_model_description) DO NOTHING;

INSERT INTO stick_models (stick_model_description)
VALUES ('YOUTH')
ON CONFLICT (stick_model_description) DO NOTHING;


INSERT INTO stick_lengths (stick_length_description)
VALUES ('65"')
ON CONFLICT (stick_length_description) DO NOTHING;

INSERT INTO stick_lengths (stick_length_description)
VALUES ('63"')
ON CONFLICT (stick_length_description) DO NOTHING;

INSERT INTO stick_lengths (stick_length_description)
VALUES ('57"')
ON CONFLICT (stick_length_description) DO NOTHING;

INSERT INTO stick_lengths (stick_length_description)
VALUES ('47"')
ON CONFLICT (stick_length_description) DO NOTHING;

INSERT INTO stick_lengths (stick_length_description)
VALUES ('52"')
ON CONFLICT (stick_length_description) DO NOTHING;

INSERT INTO stick_lengths (stick_length_description)
VALUES ('56"')
ON CONFLICT (stick_length_description) DO NOTHING;


INSERT INTO stick_weights (stick_weight_description)
VALUES ('400g')
ON CONFLICT (stick_weight_description) DO NOTHING;

INSERT INTO stick_weights (stick_weight_description)
VALUES ('310g')
ON CONFLICT (stick_weight_description) DO NOTHING;

INSERT INTO stick_weights (stick_weight_description)
VALUES ('260g')
ON CONFLICT (stick_weight_description) DO NOTHING;


INSERT INTO stick_blades (stick_blade_description)
VALUES ('P92')
ON CONFLICT (stick_blade_description) DO NOTHING;

INSERT INTO stick_blades (stick_blade_description)
VALUES ('P28')
ON CONFLICT (stick_blade_description) DO NOTHING;

INSERT INTO stick_blades (stick_blade_description)
VALUES ('P88')
ON CONFLICT (stick_blade_description) DO NOTHING;

INSERT INTO stick_blades (stick_blade_description)
VALUES ('PM9')
ON CONFLICT (stick_blade_description) DO NOTHING;

INSERT INTO stick_blades (stick_blade_description)
VALUES ('P91A')
ON CONFLICT (stick_blade_description) DO NOTHING;

INSERT INTO stick_blades (stick_blade_description)
VALUES ('P02')
ON CONFLICT (stick_blade_description) DO NOTHING;

INSERT INTO stick_blades (stick_blade_description)
VALUES ('P14R')
ON CONFLICT (stick_blade_description) DO NOTHING;

INSERT INTO stick_blades (stick_blade_description)
VALUES ('P92M')
ON CONFLICT (stick_blade_description) DO NOTHING;

INSERT INTO stick_blades (stick_blade_description)
VALUES ('P90TM')
ON CONFLICT (stick_blade_description) DO NOTHING;

INSERT INTO stick_blades (stick_blade_description)
VALUES ('P77')
ON CONFLICT (stick_blade_description) DO NOTHING;

INSERT INTO stick_blades (stick_blade_description)
VALUES ('P28M')
ON CONFLICT (stick_blade_description) DO NOTHING;


INSERT INTO stick_flexes (stick_flex_description)
VALUES ('20')
ON CONFLICT (stick_flex_description) DO NOTHING;

INSERT INTO stick_flexes (stick_flex_description)
VALUES ('30')
ON CONFLICT (stick_flex_description) DO NOTHING;

INSERT INTO stick_flexes (stick_flex_description)
VALUES ('40')
ON CONFLICT (stick_flex_description) DO NOTHING;

INSERT INTO stick_flexes (stick_flex_description)
VALUES ('45')
ON CONFLICT (stick_flex_description) DO NOTHING;

INSERT INTO stick_flexes (stick_flex_description)
VALUES ('50')
ON CONFLICT (stick_flex_description) DO NOTHING;

INSERT INTO stick_flexes (stick_flex_description)
VALUES ('55')
ON CONFLICT (stick_flex_description) DO NOTHING;

INSERT INTO stick_flexes (stick_flex_description)
VALUES ('60')
ON CONFLICT (stick_flex_description) DO NOTHING;

INSERT INTO stick_flexes (stick_flex_description)
VALUES ('65')
ON CONFLICT (stick_flex_description) DO NOTHING;

INSERT INTO stick_flexes (stick_flex_description)
VALUES ('70')
ON CONFLICT (stick_flex_description) DO NOTHING;

INSERT INTO stick_flexes (stick_flex_description)
VALUES ('75')
ON CONFLICT (stick_flex_description) DO NOTHING;

INSERT INTO stick_flexes (stick_flex_description)
VALUES ('85')
ON CONFLICT (stick_flex_description) DO NOTHING;

INSERT INTO stick_flexes (stick_flex_description)
VALUES ('95')
ON CONFLICT (stick_flex_description) DO NOTHING;

INSERT INTO stick_flexes (stick_flex_description)
VALUES ('102')
ON CONFLICT (stick_flex_description) DO NOTHING;

INSERT INTO stick_flexes (stick_flex_description)
VALUES ('112')
ON CONFLICT (stick_flex_description) DO NOTHING;


INSERT INTO stick_kickpoints (stick_kickpoint_description)
VALUES ('Low kickpoint')
ON CONFLICT (stick_kickpoint_description) DO NOTHING;

INSERT INTO stick_kickpoints (stick_kickpoint_description)
VALUES ('Mid kickpoint')
ON CONFLICT (stick_kickpoint_description) DO NOTHING;

INSERT INTO stick_kickpoints (stick_kickpoint_description)
VALUES ('High kickpoint')
ON CONFLICT (stick_kickpoint_description) DO NOTHING;


INSERT INTO stick_grips (stick_grip_description)
VALUES ('Sin grip')
ON CONFLICT (stick_grip_description) DO NOTHING;

INSERT INTO stick_grips (stick_grip_description)
VALUES ('Grip normal')
ON CONFLICT (stick_grip_description) DO NOTHING;

INSERT INTO stick_grips (stick_grip_description)
VALUES ('Tactile grip')
ON CONFLICT (stick_grip_description) DO NOTHING;