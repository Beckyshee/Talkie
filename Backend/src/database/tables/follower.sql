-- Followers Table
CREATE TABLE followers (
    follower_id VARCHAR(255),
    following_id VARCHAR(255),
    follow_date VARCHAR(200),
    PRIMARY KEY (follower_id, following_id),
    FOREIGN KEY (follower_id) REFERENCES users(UserID),
    FOREIGN KEY (following_id) REFERENCES users(UserID)
);
USE Talky;
DROP followers;
CREATE DATABASE Talky2
USE Talky2;