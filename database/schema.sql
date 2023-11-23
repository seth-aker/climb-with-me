BEGIN TRANSACTION;

CREATE TABLE users (
    user_id varchar(50) NOT NULL, --Comes from whatever authentication service we decide to use
    username varchar(20) NOT NULL UNIQUE, 
    first_name varchar(30),
    middle_name varChar(30),
    last_name varChar(30),
    email varChar(100) UNIQUE,
    email_verified boolean,
    date_of_birth DATE,
    primary_phone INT UNIQUE,
    created_on timestamptz DEFAULT now(),
    gender_code varChar(1), 
    is_active boolean DEFAULT TRUE,
    picture varChar(200),
    CONSTRAINT PK_user PRIMARY KEY (user_id)
);

CREATE TABLE user_address (
    address_id varChar(50) NOT NULL, --UUID or int? I don't know what is better.
    user_id varChar(50) NOT NULL,
    address_line_1 varChar(100),
    address_line_2 varChar(50),
    city varChar(50),
    state_province varChar(50)
    postal_code int,
    country varChar(50),
    is_default boolean,
    CONSTRAINT PK_address_id PRIMARY KEY (address_id),
    CONSTRAINT FK_user_id FOREIGN KEY (user_id) REFERENCES users(user_id)
);

CREATE TABLE climbing_styles (
    style_code varChar(1) NOT NULL, --STYLE CODES: s: sport climbing, b: bouldering, t: trad climbing, r: top rope
    name varChar(20) NOT NULL,
    CONSTRAINT PK_style_code PRIMARY KEY (style_code)
);

CREATE TABLE user_styles (
    style_code varChar(1) NOT NULL, 
    user_id varChar(50) NOT NULL,
    experience_level varChar(30) NOT NULL, 
    has_gear boolean DEFAULT FALSE,
    is_preferred boolean DEFAULT FALSE,
    CONSTRAINT PK_user_style PRIMARY KEY (style_code, user_id),
    CONSTRAINT FK_style_code FOREIGN KEY (style_code) REFERENCES climbing_styles(style_code),
    CONSTRAINT FK_user_id FOREIGN KEY (user_id) REFERENCES users(user_id)
);

CREATE TABLE friendship (
    requester_id varChar(50) NOT NULL,
    addressee_id varChar(50) NOT NULL,
    created_on timestamptz DEFAULT now(),
    CONSTRAINT PK_requester_addressee_id PRIMARY KEY (requester_id, addressee_id),
    CONSTRAINT FK_requester_id FOREIGN KEY (requester_id) REFERENCES users(user_id),
    CONSTRAINT FK_addressee_id FOREIGN KEY (addressee_id) REFERENCES users(user_id)
);

CREATE TABLE status_code (
    code_id varChar(1) NOT NULL, --CODES: p: pending, a: accepted, b: blocked, u: unfriended, d: denied
    status_name varChar(20) NOT NULL,
    CONSTRAINT PK_status_code PRIMARY KEY (code_id) 
);

CREATE TABLE friendship_status (
    requester_id varChar(50) NOT NULL,
    addressee_id varChar(50) NOT NULL,
    specified_on timestamptz DEFAULT now(),
    status_code varChar(1) NOT NULL,
    specifier_id varChar(50) NOT NULL,
    CONSTRAINT PK_friendship_status PRIMARY KEY (requester_id, addressee_id, specified_on),
    CONSTRAINT FK_requester_id_addressee_id FOREIGN KEY (requester_id, addressee_id) REFERENCES friendship(requester_id, addressee_id),
    CONSTRAINT FK_specifier_id FOREIGN KEY (specifier_id) REFERENCES users(user_id),
    CONSTRAINT FK_status_code FOREIGN KEY (status_code) REFERENCES status_code(code_id),
    CONSTRAINT CHK_friends_are_different CHECK (requester_id != addressee_id)
);

CREATE TABLE chats (
    chat_id SERIAL NOT NULL,
    name varChar(20),
    created_on timestamptz DEFAULT now(),
    CONSTRAINT PK_chat PRIMARY KEY (chat_id)
);

CREATE TABLE messages (
    message_id SERIAL NOT NULL,
    chat_id int NOT NULL,
    from_id varChar(50) NOT NULL,
    message varChar(200) NOT NULL,
    sent_on timestamptz DEFAULT now(),
    CONSTRAINT PK_message_id PRIMARY KEY (message_id),
    CONSTRAINT FK_chat_id FOREIGN KEY (chat_id) REFERENCES chats(chat_id),
    CONSTRAINT FK_from_id FOREIGN KEY (from_id) REFERENCES users(user_id)
);

CREATE TABLE chat_users (
    user_id varChar(50) NOT NULL,
    chat_id int NOT NULL,
    joined_on timestamptz DEFAULT now(),
    CONSTRAINT PK_chat_users PRIMARY KEY (chat_id, user_id),
    CONSTRAINT FK_user_id FOREIGN KEY (user_id) REFERENCES users(user_id),
    CONSTRAINT FK_chat_id FOREIGN KEY (chat_id) REFERENCES chats(chat_id)
);

CREATE TABLE communities (
    community_id SERIAL NOT NULL,
    community_name varChar(50) NOT NULL,
    CONSTRAINT PK_community_id PRIMARY KEY (community_id)
);

CREATE TABLE user_communities (
    user_id varChar(50) NOT NULL,
    community_id int NOT NULL,
    notifications_on boolean DEFAULT TRUE,
    CONSTRAINT PK_user_id_community_id PRIMARY KEY (user_id, community_id),
    CONSTRAINT FK_user_id FOREIGN KEY (user_id) REFERENCES users(user_id),
    CONSTRAINT FK_community_id FOREIGN KEY (community_id) REFERENCES communities(community_id)
)


