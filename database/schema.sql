BEGIN TRANSACTION;

CREATE TABLE users (
    user_id SERIAL NOT NULL,
    auth_id varchar NOT NULL, --Comes from whatever authentication service we decide to use
    full_name varchar,
    given_name varchar,
    family_name varChar,
    email varChar UNIQUE,
    email_verified boolean,
    date_of_birth date,
    phone_number varchar UNIQUE,
    phone_verified boolean,
    created_at timestamptz,
    updated_at timestamptz,
    gender_code varChar(1), 
    is_active boolean DEFAULT TRUE,
    picture varChar, --link
    weight_range varchar, --eg: <100lbs, 100-120lbs, 120-140lbs, etc)
    last_password_reset timestamptz,
    username varChar UNIQUE,
    CONSTRAINT PK_user PRIMARY KEY (user_id)
    CONSTRAINT UC_auth_id UNIQUE (auth_id)
);

CREATE TABLE addresses (
    address_id SERIAL NOT NULL,
    full_address varChar UNIQUE,
    address_line_1 varChar,
    address_line_2 varChar,
    address_line_3 varChar,
    city varChar,
    state_province varChar,
    postal_code varchar,
    country varChar,
    CONSTRAINT PK_address_id PRIMARY KEY (address_id)
);

CREATE TABLE user_addresses (
    user_id INT NOT NULL,
    address_id INT NOT NULL,
    is_default boolean,
    CONSTRAINT PK_user_addresses PRIMARY KEY (user_id, address_id),
    CONSTRAINT FK_user_id FOREIGN KEY (user_id) REFERENCES users(user_id),
    CONSTRAINT FK_address_id FOREIGN KEY (address_id) REFERENCES addresses(address_id)
);

CREATE TABLE user_styles (
    style_code varChar(1) NOT NULL, --STYLE CODES: s: sport climbing, b: bouldering, t: trad climbing, r: top rope
    user_id int NOT NULL,
    max_grade varChar,
    indoor_only boolean,
    is_preferred boolean DEFAULT FALSE,
    years_experience varchar,
    CONSTRAINT PK_user_style PRIMARY KEY (style_code, user_id),
    CONSTRAINT FK_user_id FOREIGN KEY (user_id) REFERENCES users(user_id)
);

CREATE TABLE friendship (
    requester_id int NOT NULL,
    addressee_id int NOT NULL,
    created_at timestamptz DEFAULT now(),
    CONSTRAINT PK_requester_addressee_id PRIMARY KEY (requester_id, addressee_id),
    CONSTRAINT FK_requester_id FOREIGN KEY (requester_id) REFERENCES users(user_id),
    CONSTRAINT FK_addressee_id FOREIGN KEY (addressee_id) REFERENCES users(user_id),
    CONSTRAINT CHK_friends_are_different CHECK (requester_id != addressee_id)
);

CREATE TABLE friendship_status (
    requester_id int NOT NULL,
    addressee_id int NOT NULL,
    specified_on timestamptz DEFAULT now(),
    status_code varChar(1) NOT NULL, --CODES: p: pending, a: accepted, b: blocked, u: unfriended, d: denied
    specifier_id int NOT NULL,
    CONSTRAINT PK_friendship_status PRIMARY KEY (requester_id, addressee_id, specified_on),
    CONSTRAINT FK_requester_id_addressee_id FOREIGN KEY (requester_id, addressee_id) REFERENCES friendship(requester_id, addressee_id),
    CONSTRAINT FK_specifier_id FOREIGN KEY (specifier_id) REFERENCES users(user_id),
    CONSTRAINT CHK_friends_are_different CHECK (requester_id != addressee_id)
);

CREATE TABLE chats (
    chat_id SERIAL NOT NULL,
    name varChar,
    created_at timestamptz DEFAULT now(),
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
    community_name varChar UNIQUE,
    created_at timestamptz DEFAULT now(),
    description varchar,
    banner_img varchar,
    CONSTRAINT PK_community_id PRIMARY KEY (community_id)
);

CREATE TABLE community_owner (
    community_id int NOT NULL,
    user_id int NOT NULL,
    CONSTRAINT PK_community_owner PRIMARY KEY (community_id, user_id),
    CONSTRAINT FK_community_id FOREIGN KEY (community_id) REFERENCES communities(community_id),
    CONSTRAINT FK_user_id FOREIGN KEY (user_id) REFERENCES users(user_id)
);

CREATE TABLE community_threads (
    thread_id SERIAL NOT NULL,
    author_id int NOT NULL,
    community_id int NOT NULL,
    created_at timestamptz DEFAULT now(),
    topic varchar,
    CONSTRAINT PK_community_threads PRIMARY KEY (thread_id),
    CONSTRAINT FK_author_id FOREIGN KEY (author_id) REFERENCES users(user_id),
    CONSTRAINT FK_community_id FOREIGN KEY (community_id) REFERENCES communities(community_id)
);
CREATE TABLE thread_post (
    post_id SERIAL NOT NULL,
    thread_id int NOT NULL,
    author_id int NOT NULL,
    post_text varchar NOT NULL,
    created_at timestamptz DEFAULT now(),
    last_edited timestamptz DEFAULT now(), --TODO: create a trigger to update this anytime a row is updated.
    CONSTRAINT PK_post_id PRIMARY KEY (post_id),
    CONSTRAINT FK_thread_id FOREIGN KEY (thread_id) REFERENCES community_threads(thread_id),
    CONSTRAINT FK_author_id FOREIGN KEY (author_id) REFERENCES users(user_id)
);

CREATE TABLE user_communities (
    user_id int NOT NULL,
    community_id int NOT NULL,
    notifications_on boolean DEFAULT TRUE,
    CONSTRAINT PK_user_id_community_id PRIMARY KEY (user_id, community_id),
    CONSTRAINT FK_user_id FOREIGN KEY (user_id) REFERENCES users(user_id),
    CONSTRAINT FK_community_id FOREIGN KEY (community_id) REFERENCES communities(community_id)
);

END TRANSACTION;


