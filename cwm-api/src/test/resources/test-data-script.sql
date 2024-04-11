BEGIN TRANSACTION;


INSERT INTO users (
            auth_id,
            created_at,
            email,
            email_verified,
            family_name,
            given_name,
            date_of_birth,
            last_password_reset,
            full_name,
            phone_number,
            phone_verified,
            picture,
            updated_at,
            username,
            gender_code,
            weight_range
        )
        VALUES (
            'authIdTestUser',
            now(),
            'test@email.com',
            true,
            'Doe',
            'Jane',
            '01/01/2000',
            now(),
            'Jane Doe',
            '+1-111-111-1111',
            true,
            'http://defaultpicture.com',
            now(),
            'jdoe123',
            'f',
            '100-120lbs'
            );

COMMIT;