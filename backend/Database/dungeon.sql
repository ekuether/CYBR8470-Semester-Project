CREATE USER me;
GRANT ALL PRIVILEGES ON DATABASE dungeon TO me;
\c dungeon

CREATE TABLE GameLevel(
    ID int,
    StartRoom int,
    LevelDifficulty int,
    LevelName varchar(255) NOT NULL,
    PRIMARY KEY (ID)
);

CREATE TABLE obstacle(
    ID INT PRIMARY KEY,
    weakness int,
    name varchar(255) NOT NULL
);

CREATE TABLE item(
    ID int PRIMARY KEY,
    room int,
    name varchar(255)
);

CREATE TABLE player(
    id int primary key,
    userid varchar(255),
    room int,
    maxitems int,
    name varchar(255)
);

CREATE TABLE room(
    id int primary key,
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
    obstacle int not null,
);

CREATE TABLE levelrooms(
    gamelevel int not null,
    room int not null
);