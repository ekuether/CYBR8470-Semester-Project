CREATE USER me;
GRANT ALL PRIVILEGES ON DATABASE dungeon TO me;
\c dungeon

CREATE TABLE audit_log(
    audit_id SERIAL PRIMARY KEY,
    audit_date_time timestamp,
    userid varchar(255),
    ip_address varchar(255),
    audit_message text
);

CREATE TABLE userinfo(
    userid VARCHAR(255) PRIMARY KEY,
    password VARCHAR(255),
    isauthenticated boolean
);

CREATE TABLE userlevels(
    userid VARCHAR(255),
    gamelevel INT
);

CREATE TABLE gamelevel(
    ID SERIAL PRIMARY KEY,
    StartRoom int,
    LevelDifficulty int,
    LevelName varchar(255) NOT NULL,
    maxitems INT
);

CREATE TABLE obstacle(
    ID SERIAL PRIMARY KEY,
    weakness int,
    name varchar(255) NOT NULL
);

CREATE TABLE user_obstacle(
    obstacle_id int,
    userid varchar(255)
);

CREATE TABLE item(
    ID SERIAL PRIMARY KEY,
    name varchar(255)
);

CREATE TABLE user_item(
    item_id int,
    userid varchar(255)
);

CREATE TABLE player(
    id SERIAL primary key,
    name varchar(255)
);

CREATE TABLE user_player(
    player_id int,
    userid varchar(255)
);

CREATE TABLE level_player(
    player_id int,
    level_id int
);

CREATE TABLE player_room(
    room_id int,
    player_id int
);

CREATE TABLE room(
    id SERIAL primary key,
    roomabove int,
    roombelow int,
    roomleft int,
    roomright int,
    name varchar(255)
);

CREATE TABLE playeritems(
    player int not null,
    item int not null
);

CREATE TABLE roomitems(
    room int not null,
    item int not null
);

CREATE TABLE roomobstacles(
    room int not null,
    obstacle int not null
);

CREATE TABLE levelrooms(
    gamelevel int not null,
    room int not null
);