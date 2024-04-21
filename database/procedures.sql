BEGIN TRANSACTION;

CREATE OR REPLACE FUNCTION create_new_user (
    IN _auth_id varchar, 
    IN _created_at timestamptz,
    IN _email varchar,
    IN _email_verified boolean,
    IN _family_name varchar,
    IN _given_name varchar,
    IN _last_password_reset timestamptz,
    IN _full_name varchar, 
    IN _phone_number varchar,
    IN _phone_verified boolean,
    IN _picture varchar,
    IN _updated_at timestamptz,
    IN _username varchar,
    OUT rowCount int
    )
    LANGUAGE plpgsql
    AS ' 
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
            phone_number,
            phone_verified,
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
            _phone_verified,
            _picture,
            _updated_at,
            _username
            );
        GET DIAGNOSTICS rowCount = ROW_COUNT;
    END;';

CREATE OR REPLACE FUNCTION get_userID_by_authID (IN _auth_id varChar, OUT userId int) 
    LANGUAGE plpgsql
    AS '
    BEGIN
        SELECT INTO userId 
            user_id FROM users WHERE auth_id = _auth_id;
        
        IF userId IS NULL THEN 
        userId = -1;
        END IF;
    END;
    ';

CREATE OR REPLACE FUNCTION get_user_by_ID (_user_id int) 
    RETURNS setof users
    LANGUAGE plpgsql
    AS '
    BEGIN 
        RETURN QUERY SELECT * FROM users AS u WHERE u.user_id = _user_id;
    END;
    ';


CREATE OR REPLACE FUNCTION update_user (
    IN _user_id int, 
    IN _full_name varChar,
    IN _given_name varChar,
    IN _family_name varchar,
    IN _email varChar, 
    IN _email_verified boolean,
    IN _date_of_birth date,
    IN _phone_number varChar,
    IN _phone_verified boolean,
    IN _created_at timestamptz,
    IN _gender_code varChar(1),
    IN _is_active boolean,
    IN _picture varChar,
    IN _weight_range varChar,
    IN _last_password_reset timestamptz,
    IN _username varChar
    ) 
    RETURNS SETOF users
    LANGUAGE plpgsql
    AS '
    BEGIN
        UPDATE users SET full_name = _full_name, given_name = _given_name,
        family_name = _family_name, email = _email,
        email_verified = _email_verified, date_of_birth = _date_of_birth,
        phone_number = _phone_number, phone_verified = _phone_verified,
        created_at = _created_at, updated_at = now(), 
        gender_code = _gender_code, is_active = _is_active,
        picture = _picture, weight_range = _weight_range,
        last_password_reset = _last_password_reset, username = _username
        WHERE user_id = _user_id;

        RETURN QUERY SELECT * FROM users WHERE user_id = _user_id;
        
    END;
    ';

CREATE OR REPLACE PROCEDURE deactivate_user (
    IN _userId int,
    INOUT successful boolean DEFAULT false
    )
    LANGUAGE plpgsql
    AS '
    DECLARE rowCount int;
    BEGIN 
        UPDATE users SET is_active = false WHERE user_id = _userId;
        GET DIAGNOSTICS rowCount = ROW_COUNT;
        IF(rowCount != 1) THEN
            successful = false;
            ROLLBACK;
        ELSE 
            successful = true;
        END IF;
    END;
    ';

CREATE OR REPLACE FUNCTION insert_climbing_style (
    IN _style_code varchar, 
    IN _user_id int,
    IN _max_grade varChar,
    IN _indoor_only boolean,
    IN _is_preferred boolean,
    IN _years_experience varChar,
    OUT rowCount int
    )
    LANGUAGE plpgsql
    AS ' 
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
            GET DIAGNOSTICS rowCount = ROW_COUNT;
        ELSE RAISE EXCEPTION ''Nonexistent user ID --> %'', _user_id;
        END IF;
    END;
    ';


CREATE OR REPLACE FUNCTION get_user_climbing_styles (
    IN _user_id int
) 
RETURNS setof user_styles
LANGUAGE plpgsql
AS '
BEGIN 
    RETURN QUERY SELECT * FROM user_styles WHERE user_id = _user_id;
END;
';

CREATE OR REPLACE FUNCTION update_climbing_style (
    IN _style_code varchar, 
    IN _user_id int,
    IN _max_grade varChar,
    IN _indoor_only boolean,
    IN _is_preferred boolean,
    IN _years_experience varChar,
    OUT rowCount int
) 
LANGUAGE plpgsql
AS '
BEGIN
    UPDATE user_styles SET max_grade = _max_grade, indoor_only = _indoor_only, 
    is_preferred = _is_preferred, years_experience = _years_experience 
    WHERE style_code = _style_code AND user_id = _user_id;

    GET DIAGNOSTICS rowCount = ROW_COUNT;
END;
';

CREATE OR REPLACE FUNCTION delete_climbing_style(
    IN _user_id int,
    IN _style_code varChar,
    OUT rowCount int
)
LANGUAGE plpgsql
AS '
BEGIN
    DELETE FROM user_styles WHERE user_id = _user_id AND style_code = _style_code;
    GET DIAGNOSTICS rowCount = ROW_COUNT;
    IF(rowCount > 1) THEN 
        ROLLBACK;
    END IF;
END;

';

CREATE OR REPLACE FUNCTION insert_user_address(
    IN _user_id INT,
    IN _full_address varChar,
    IN _address_line_1 varChar,
    IN _address_line_2 varchar,
    IN _address_line_3 varChar,
    IN _city varChar,
    IN _state_province varChar,
    IN _postal_code varChar,
    IN _country varChar,
    IN _is_default boolean,
    OUT rowCount int
    )
    LANGUAGE plpgsql
    AS '
    DECLARE
        addressId int;
        runningCount int;
    BEGIN
        rowCount = 0;
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
            GET DIAGNOSTICS runningCount = ROW_COUNT;
            rowCount = (runningCount + rowCount);
        END IF;
        
        IF(_is_default IS TRUE) THEN
            UPDATE user_addresses 
            SET is_default = FALSE 
            WHERE user_id = _user_id;

            GET DIAGNOSTICS runningCount = ROW_COUNT;
            rowCount = (runningCount + rowCount);
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

        EXCEPTION WHEN UNIQUE_VIOLATION THEN
            UPDATE user_addresses SET is_default = _is_default
            WHERE user_id = _user_id AND address_id = addressId;


        GET DIAGNOSTICS runningCount = ROW_COUNT;
            rowCount = (runningCount + rowCount);
    END;
    ';


CREATE OR REPLACE FUNCTION get_user_default_address (_user_id int) 
    RETURNS TABLE (
    address_id int,
    full_address varChar,
    address_line_1 varChar,
    address_line_2 varChar,
    address_line_3 varChar,
    city varChar,
    state_province varChar,
    postal_code varchar,
    country varChar,
    is_default boolean
    )
    LANGUAGE plpgsql 
    AS '
    BEGIN 
        RETURN QUERY SELECT a.address_id, a.full_address, a.address_line_1, 
            a.address_line_2, a.address_line_3,
            a.city, a.state_province,
            a.postal_code, a.country, ua.is_default
        FROM addresses AS a 
        JOIN user_addresses AS ua ON a.address_id = ua.address_id
        WHERE ua.user_id = _user_id AND ua.is_default = TRUE;
    END;
    ';

CREATE OR REPLACE FUNCTION get_user_addresses (_user_id int) 
RETURNS TABLE (
    address_id int,
    full_address varChar,
    address_line_1 varChar,
    address_line_2 varChar,
    address_line_3 varChar,
    city varChar,
    state_province varChar,
    postal_code varchar,
    country varChar,
    is_default boolean
    )
    LANGUAGE plpgsql
    AS '
    BEGIN
        RETURN QUERY SELECT a.address_id, a.full_address, a.address_line_1, 
            a.address_line_2, a.address_line_3,
            a.city, a.state_province,
            a.postal_code, a.country, ua.is_default
        FROM addresses AS a 
        JOIN user_addresses AS ua ON a.address_id = ua.address_id
        WHERE ua.user_id = _user_id;
    END;
    ';

CREATE OR REPLACE FUNCTION update_default_user_address (
    IN _address_id int,
    IN _user_id INT,
    OUT rowCount INT
) 
    LANGUAGE plpgsql
    AS '
    DECLARE queryReturn int;
    BEGIN 
        
        SELECT INTO queryReturn
            address_id FROM addresses AS a 
            JOIN user_addresses as ua ON a.address_id = ua.address_id
            WHERE a.address_id = _address_id AND ua.user_id = _user_id;
        
        IF(queryReturn IS NOT NULL) THEN
            UPDATE user_addresses 
            SET is_default = FALSE 
            WHERE user_id = _user_id;
            
            UPDATE user_addresses 
            SET is_default = TRUE
            WHERE address_id = _address_id AND user_id = _user_id;
        END IF;

        GET DIAGNOSTICS rowCount = ROW_COUNT;
    END;
    ';

CREATE OR REPLACE FUNCTION delete_user_address (IN _user_id int, IN _address_id int, OUT rowCount int)
    LANGUAGE plpgsql
    AS '
    BEGIN 
        DELETE FROM user_addresses 
        WHERE user_id = _user_id AND address_id = _address_id;
        GET DIAGNOSTICS rowCount = ROW_COUNT;
    END; 
    ';



CREATE OR REPLACE PROCEDURE create_friend_request ( 
    _requester_id int, 
    _addressee_id int 
    )
    LANGUAGE plpgsql
    AS '
    BEGIN
        INSERT INTO friendship (requester_id, addressee_id)
        VALUES (_requester_id, _addressee_id);
    
        INSERT INTO friendship_status (requester_id, addressee_id, status_code, specifier_id)
        VALUES (_requester_id, _addressee_id, ''p'', _requester_id);
    END;
    ';


CREATE OR REPLACE PROCEDURE update_friend_request ( 
    _requester_id int, 
    _addressee_id int, 
    _status_code varChar(1), 
    _specifier_id int 
    )
    LANGUAGE plpgsql
    AS '
    BEGIN
        IF(_status_code = ''a'' AND _specifier_id != _addressee_id) THEN
            RAISE EXCEPTION ''User is unauthorized to accept friend request'';
        ELSE
            INSERT INTO friendship_status (requester_id, addressee_id, status_code, specifier_id)
            VALUES (_requester_id, _addressee_id, _status_code, _specifier_id);
        END IF;
    END;
    ';


CREATE OR REPLACE PROCEDURE new_message (
    _user_id int,
    _message varChar,
    _to_user_id int DEFAULT null, 
    _chat_id int DEFAULT null, 
    _chat_name varChar DEFAULT null
    )
    LANGUAGE plpgsql
    AS '
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
    ';

COMMIT;