BEGIN TRANSACTION;

CREATE PROCEDURE create_new_user(
    auth_id varchar, 
    created_at varchar,
    email varchar,
    email_verified boolean,
    family_name varchar,
    given_name varchar,
    last_password_reset varchar,
    full_name varchar, 
    nickname varchar,
    phone_number varchar,
    phone_verified boolean,
    picture varchar,
    updated_at varchar,
    username varchar
    )
    BEGIN   
        INSERT INTO users (
            auth_id, 
            created_at, 
            email, 
            email_verified,
            family_name,
            given_name,
            last_password_reset,
            full_name,
            nickname,
            phone_number,
            phone_verified
            picture,
            updated_at,
            username
        )
        VALUES (
            auth_id,
            created_at,
            email,
            email_verified,
            family_name,
            given_name,
            last_password_reset,
            full_name,
            nickname,
            phone_number,
            phone_verified
            picture,
            updated_at,
            username
            );
    END;

END TRANSACTION;