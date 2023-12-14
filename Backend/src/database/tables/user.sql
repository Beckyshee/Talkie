-- CREATE DATABASE Talky;

-- USE Talky;

-- User table
CREATE TABLE Users (
    UserID INT PRIMARY KEY NOT NULL,
    Name VARCHAR(255) NOT NULL,
    Email VARCHAR(255) UNIQUE NOT NULL,
    Password VARCHAR(255) NOT NULL,
    
    -- Add other user-related fields as needed
);


ALTER TABLE Users ADD Welcomed bit DEFAULT 0;

SELECT * FROM Users;

