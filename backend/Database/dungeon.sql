CREATE DATABASE dungeon

CREATE TABLE GameLevel(
    ID int,
    StartRoom int,
    LevelDifficulty int,
    LevelName varchar(255) NOT NULL,
    PRIMARY KEY (ID)
)