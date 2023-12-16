
-- Create the Followers table
CREATE TABLE Followers (
    followerID VARCHAR(255) PRIMARY KEY,
    following_userID VARCHAR(255),
    followed_userID VARCHAR(255),
    follow_date VARCHAR(200),
    FOREIGN KEY (following_userID) REFERENCES Users(UserID),
    FOREIGN KEY (followed_userID) REFERENCES Users(UserID)
);


USE Talky;
DROP Table Followers;
CREATE DATABASE Talky2
USE Talky2;

select * from followers;