-- ==============================================================================
-- MIGRACIÓN MULTI-TENANT: CLUB METROPOLITANO HC (TENANT POR DEFECTO)
-- ==============================================================================

-- 1. Insertar el club inicial si no existe
INSERT INTO clubs (club_name, club_code, club_logo, club_primary_color, club_secondary_color, club_is_active)
VALUES (
    'Metropolitano HC',
    'metropolitano',
    'tigre-transparente.png',
    '#074ec8',
    '#ebf6ff',
    true
)
ON CONFLICT (club_name) DO NOTHING;

-- 2. Asignar el club a los registros existentes que tengan club_id a NULL
DO $$
DECLARE
    default_club_id BIGINT;
BEGIN
    SELECT club_id INTO default_club_id FROM clubs WHERE club_code = 'metropolitano' LIMIT 1;

    IF default_club_id IS NOT NULL THEN
        -- Actualizar Categorías / Equipos del Club
        UPDATE club_teams
        SET club_id = default_club_id
        WHERE club_id IS NULL;

        -- Actualizar Jugadores
        UPDATE players
        SET club_id = default_club_id
        WHERE club_id IS NULL;

        -- Actualizar Entrenadores
        UPDATE coaches
        SET club_id = default_club_id
        WHERE club_id IS NULL;

        -- Actualizar Usuarios
        UPDATE users
        SET club_id = default_club_id
        WHERE club_id IS NULL;

        -- Actualizar Emails Autorizados
        UPDATE authorized_emails
        SET club_id = default_club_id
        WHERE club_id IS NULL;
    END IF;
END $$;

