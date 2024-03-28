BEGIN TRANSACTION;

CREATE OR REPLACE PROCEDURE create_new_user(
    _auth_id varchar, 
    _created_at varchar,
    _email varchar,
    _email_verified boolean,
    _family_name varchar,
    _given_name varchar,
    _last_password_reset varchar,
    _full_name varchar, 
    _phone_number varchar,
    _phone_verified boolean,
    _picture varchar,
    _updated_at varchar,
    _username varchar
    )
    LANGUAGE SQL
    AS $$
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
            _auth_id,
            _created_at,
            _email,
            _email_verified,
            _family_name,
            _given_name,
            _last_password_reset,
            _full_name,
            _phone_number,
            _phone_verified
            _picture,
            _updated_at,
            _username
            );
    END;
    $$;

CREATE OR REPLACE PROCEDURE insert_climbing_style(
    _style_code varchar, 
    _user_id int,
    _max_grade varChar,
    _indoor_only boolean,
    _is_preferred boolean,
    _years_experience boolean
    )
    LANGUAGE plpgsql
    AS $$ 
    BEGIN    
    	IF EXISTS (SELECT FROM users WHERE user_id = _user_id) THEN
            INSERT INTO user_styles(
                style_code, 
                user_id,
                max_grade, 
                indoor_only, 
                is_preferred, 
                years_experience
                )
            VALUES (
                _style_code, 
                _user_id, 
                _max_grade, 
                _indoor_only, 
                _is_preferred, 
                _years_experience
                );
        ELSE RAISE EXCEPTION 'Nonexistent user ID --> %', _user_id;
        END IF;
    END;
    $$;

END TRANSACTION;