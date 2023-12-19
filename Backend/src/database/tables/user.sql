-- CREATE DATABASE Talky;

-- USE Talky2;

-- User table
CREATE TABLE Users (
    UserID VARCHAR(255) PRIMARY KEY NOT NULL,
    Name VARCHAR(255) NOT NULL,
    Email VARCHAR(255) UNIQUE NOT NULL,
    Password VARCHAR(255) NOT NULL,
    
    -- Add other user-related fields as needed
);
USE

ALTER TABLE Users ADD Welcomed bit DEFAULT 0;
ALTER TABLE Users ADD isDeleted bit DEFAULT 0;

SELECT * FROM Users;

