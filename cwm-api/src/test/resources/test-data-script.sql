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

INSERT INTO addresses ( full_address, address_line_1, address_line_2, address_line_3, city, state_province, country, postal_code)
    VALUES ('2605 Washington Ave Apt E Waco, TX 76710, US', '2605 Washington Ave', 'Apt E', null, 'Waco', 'TX', 'US', '76710'),
            ('12345 E Road, City, State, Country, 12345', '12345 E Road', null, null, 'City', 'State', 'Country', '12345'),
            ('54321 West Street Unit 5 C/O John Smith Denver, CO, 54321', '54321 West Street', 'Unit 5', 'C/O John Smith', 'Denver', 'CO', 'US', '54321');

INSERT INTO user_addresses (user_id, address_id, is_default)
    VALUES (1,1, TRUE),
        (1,2, FALSE);
COMMIT;