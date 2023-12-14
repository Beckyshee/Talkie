-- Comment table
CREATE TABLE Comment (
    CommentID INT PRIMARY KEY NOT NULL,
    Filename VARCHAR(255) NOT NULL,
    FromUserID INT,
    ToUserID INT,
    CommentText TEXT,
    createdAt VARCHAR (255),
    PRIMARY KEY (CommentID),
    FOREIGN KEY (FromUserID) REFERENCES Users(UserID),
    FOREIGN KEY (ToUserID) REFERENCES Users(UserID)
);


USE Talky;