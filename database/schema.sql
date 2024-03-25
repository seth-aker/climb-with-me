BEGIN TRANSACTION;

CREATE TABLE users (
    user_id SERIAL NOT NULL,
    auth_id varchar NOT NULL, --Comes from whatever authentication service we decide to use
    full_name varchar,
    first_name varchar,
    last_name varChar,
    email varChar UNIQUE,
    email_verified boolean,
    date_of_birth DATE,
    primary_phone varchar UNIQUE,
    created_on timestamptz DEFAULT now(),
    last_modified timestamptz DEFAULT now(),
    gender_code varChar(1), 
    is_active boolean DEFAULT TRUE,
    picture varChar,
    user_zip varchar(5), --denormalized for faster lookup
    CONSTRAINT PK_user PRIMARY KEY (user_id)
);

CREATE TABLE gym_account (
    gym_id SERIAL NOT NULL,
    name varchar(),
    created_on timestamptz DEFAULT now(),
    picture varchar,
    CONSTRAINT PK_gym_id PRIMARY KEY (gym_id)
);

CREATE TABLE addresses (
    address_id SERIAL NOT NULL,
    address_line_1 varChar,
    address_line_2 varChar,
    address_line_3 varChar,
    city varChar,
    state_province varChar,
    postal_code varchar,
    country varChar,
    is_default boolean,
    CONSTRAINT PK_address_id PRIMARY KEY (address_id),
);

CREATE TABLE user_addresses (
    user_id INT NOT NULL,
    address_id INT NOT NULL,
    CONSTRAINT PK_user_addresses PRIMARY KEY (user_id, address_id),
    CONSTRAINT FK_user_id FOREIGN KEY (user_id) REFERENCES users(user_id),
    CONSTRAINT FK_address_id FOREIGN KEY (address_id) REFERENCES addresses(address_id)
);

CREATE TABLE gym_address (
    address_id INT NOT NULL,
    gym_id INT NOT NULL,
    CONSTRAINT PK_gym_address PRIMARY KEY (gym_id, address_id),
    CONSTRAINT FK_address_id FOREIGN KEY (address_id) REFERENCES addresses(address_id),
    CONSTRAINT FK_gym_id FOREIGN KEY (gym_id) REFERENCES gym_account(gym_id)
);

CREATE TABLE climbing_styles (
    style_code varChar(1) NOT NULL, --STYLE CODES: s: sport climbing, b: bouldering, t: trad climbing, r: top rope
    name varChar NOT NULL,
    CONSTRAINT PK_style_code PRIMARY KEY (style_code)
);

CREATE TABLE user_styles (
    style_code varChar(1) NOT NULL, 
    user_id int NOT NULL,
    experience_level varChar NOT NULL,
    preferred boolean DEFAULT FALSE,
    CONSTRAINT PK_user_style PRIMARY KEY (style_code, user_id),
    CONSTRAINT FK_style_code FOREIGN KEY (style_code) REFERENCES climbing_styles(style_code),
    CONSTRAINT FK_user_id FOREIGN KEY (user_id) REFERENCES users(user_id)
);
CREATE TABLE weight_range ( --eg: <100lbs, 100-120lbs, 120-140lbs, etc)
    weight_range_id SERIAL NOT NULL,
    range varchar,
    CONSTRAINT PK_weight_range_id PRIMARY KEY (weight_range_id)
);

CREATE TABLE user_weight_range (
    user_id INT NOT NULL,
    weight_range_id INT NOT NULL,
    CONSTRAINT PK_user_weight_range PRIMARY KEY (user_id, weight_range_id),
    CONSTRAINT FK_user_id FOREIGN KEY (user_id) REFERENCES users(user_id),
    CONSTRAINT FK_weight_range_id FOREIGN (weight_range_id) REFERENCES weight_range(weight_range_id)
);

CREATE TABLE friendship (
    requester_id int NOT NULL,
    addressee_id int NOT NULL,
    created_on timestamptz DEFAULT now(),
    CONSTRAINT PK_requester_addressee_id PRIMARY KEY (requester_id, addressee_id),
    CONSTRAINT FK_requester_id FOREIGN KEY (requester_id) REFERENCES users(user_id),
    CONSTRAINT FK_addressee_id FOREIGN KEY (addressee_id) REFERENCES users(user_id)
);

CREATE TABLE status_code (
    code_id varChar(1) NOT NULL, --CODES: p: pending, a: accepted, b: blocked, u: unfriended, d: denied
    status_name varChar NOT NULL,
    CONSTRAINT PK_status_code PRIMARY KEY (code_id) 
);

CREATE TABLE friendship_status (
    requester_id int NOT NULL,
    addressee_id int NOT NULL,
    specified_on timestamptz DEFAULT now(),
    status_code varChar(1) NOT NULL,
    specifier_id int NOT NULL,
    CONSTRAINT PK_friendship_status PRIMARY KEY (requester_id, addressee_id, specified_on),
    CONSTRAINT FK_requester_id_addressee_id FOREIGN KEY (requester_id, addressee_id) REFERENCES friendship(requester_id, addressee_id),
    CONSTRAINT FK_specifier_id FOREIGN KEY (specifier_id) REFERENCES users(user_id),
    CONSTRAINT FK_status_code FOREIGN KEY (status_code) REFERENCES status_code(code_id),
    CONSTRAINT CHK_friends_are_different CHECK (requester_id != addressee_id)
);

CREATE TABLE chats (
    chat_id SERIAL NOT NULL,
    name varChar,
    created_on timestamptz DEFAULT now(),
    CONSTRAINT PK_chat PRIMARY KEY (chat_id)
);

CREATE TABLE messages (
    message_id SERIAL NOT NULL,
    chat_id int NOT NULL,
    from_id int NOT NULL,
    message varChar NOT NULL,
    sent_on timestamptz DEFAULT now(),
    CONSTRAINT PK_message_id PRIMARY KEY (message_id),
    CONSTRAINT FK_chat_id FOREIGN KEY (chat_id) REFERENCES chats(chat_id),
    CONSTRAINT FK_from_id FOREIGN KEY (from_id) REFERENCES users(user_id)
);

CREATE TABLE chat_users (
    user_id int NOT NULL,
    chat_id int NOT NULL,
    joined_on timestamptz DEFAULT now(),
    CONSTRAINT PK_chat_users PRIMARY KEY (chat_id, user_id),
    CONSTRAINT FK_user_id FOREIGN KEY (user_id) REFERENCES users(user_id),
    CONSTRAINT FK_chat_id FOREIGN KEY (chat_id) REFERENCES chats(chat_id)
);

CREATE TABLE communities (
    community_id SERIAL NOT NULL,
    community_name varChar NOT NULL,
    CONSTRAINT PK_community_id PRIMARY KEY (community_id)
);

CREATE TABLE user_communities (
    user_id int NOT NULL,
    community_id int NOT NULL,
    notifications_on boolean DEFAULT TRUE,
    CONSTRAINT PK_user_id_community_id PRIMARY KEY (user_id, community_id),
    CONSTRAINT FK_user_id FOREIGN KEY (user_id) REFERENCES users(user_id),
    CONSTRAINT FK_community_id FOREIGN KEY (community_id) REFERENCES communities(community_id)
)


