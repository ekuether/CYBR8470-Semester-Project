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
    room int,
    name varchar(255) NOT NULL
);

CREATE TABLE item(
    ID int PRIMARY KEY,
    possessed int,
    room int,
    name varchar(255)
);

CREATE TABLE player(
    id int primary key,
    userid varchar(255),
    room int,
    maxitems int,
    numitems int,
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