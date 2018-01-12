--------------------------------------------
--- Database Schema
--------------------------------------------

DROP   DATABASE IF EXISTS burgers_db;
CREATE DATABASE burgers_db;

USE burgers_db;

CREATE TABLE burgers_t
(
	id INTEGER  AUTO_INCREMENT NOT NULL,
	burger_name VARCHAR(255) NOT NULL,
	devoured BOOLEAN NOT NULL default false,
	burger_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
	PRIMARY KEY (id)
);