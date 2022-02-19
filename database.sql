create database omnidoc;

use omnidoc;

CREATE TABLE users
( 
    ID int PRIMARY KEY AUTO_INCREMENT ,
	NAME varchar(25) NOT NULL,
    LASTNAME varchar(25) NOT NULL,
    MLASTNAME varchar(30) NOT NULL,
    EMAIL varchar(30) NOT NULL,
    CARD int NOT NULL,
    AMOUNT DOUBLE NOT NULL,
    AMOUNCREDIT DOUBLE NOT NULL
);
  
