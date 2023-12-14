-- Post table
CREATE TABLE Posts (
    PostID INT PRIMARY KEY NOT NULL,
    UserID INT,
    Content TEXT,
    imageUrl VARCHAR (255),
    createdAt VARCHAR(255)
    
    FOREIGN KEY (UserID) REFERENCES Users(UserID)
);
USE Talky;

DROP TABLE Posts;

