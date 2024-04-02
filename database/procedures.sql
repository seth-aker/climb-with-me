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

CREATE OR REPLACE PROCEDURE insert_user_address(
    _user_id INT,
    _full_address varChar,
    _address_line_1 varChar,
    _address_line_2 varchar,
    _address_line_3 varChar,
    _city varChar,
    _state_province varChar,
    _postal_code varChar,
    _country varChar,
    _is_default boolean
    )
    LANGUAGE plpgsql
    AS $$
    DECLARE
        addressId INT;
    BEGIN
        addressId = (SELECT address_id FROM addresses WHERE full_address = _full_address);
        IF (addressId IS NULL) 
        THEN 
            INSERT INTO addresses (
                    full_address, 
                    address_line_1, 
                    address_line_2, 
                    address_line_3, 
                    city, 
                    state_province, 
                    postal_code, 
                    country
                    )
                VALUES (
                    _full_address,
                    _address_line_1,
                    _address_line_2,
                    _address_line_3,
                    _city,
                    _state_province,
                    _postal_code,
                    _country 
                    )
            RETURNING address_id INTO addressId;
        END IF;
        
        IF(_is_default IS TRUE) THEN
            UPDATE user_addresses 
            SET is_default = FALSE 
            WHERE user_id = _user_id;
        END IF;

        INSERT INTO user_addresses ( 
            user_id, 
            address_id, 
            is_default
            ) 
        VALUES (
            _user_id, 
            addressId, 
            _is_default);
    END;
    $$;

CREATE OR REPLACE PROCEDURE insert_friend_request ( 
    _requester_id int, 
    _addressee_id int 
    )
    LANGUAGE plpgsql
    AS $$
    BEGIN
        INSERT INTO friendship (requester_id, addressee_id)
        VALUES (_requester_id, _addressee_id);
    
        INSERT INTO friendship_status (requester_id, addressee_id, status_code, specifier_id)
        VALUES (_requester_id, _addressee_id, 'p', _requester_id);
    END;
    $$;


CREATE OR REPLACE PROCEDURE insert_friend_request ( 
    _requester_id int, 
    _addressee_id int, 
    _status_code varChar(1), 
    _specifier_id int 
    )
    LANGUAGE plpgsql
    AS $$
    BEGIN
        INSERT INTO friendship_status (requester_id, addressee_id, status_code, specifier_id)
        VALUES (_requester_id, _addressee_id, 'p', _specifier_id);
    END;
    $$;


CREATE OR REPLACE PROCEDURE new_message(
    _user_id int,
    _message varChar,
    _to_user_id int DEFAULT null, 
    _chat_id int DEFAULT null, 
    _chat_name varChar DEFAULT null
    )
    LANGUAGE plpgsql
    AS $$
    DECLARE varChatId int;

    BEGIN 
        varChatId = _chat_id;
        IF(varChatId IS NULL) THEN 
            INSERT INTO chats(name)
            VALUES (_chat_name)
            RETURNING chat_id INTO varChatId;

            INSERT INTO chat_users (user_id, chat_id)
            VALUES 
                (_user_id, varChatId), 
                (_to_user_id, varChatId);
        END IF;

        INSERT INTO messages (chat_id, from_id, message)
        VALUES (varChatId, _user_id, _message);

    END;
    $$;

END TRANSACTION;