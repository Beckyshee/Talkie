-- Post table
CREATE TABLE Posts (
    PostID VARCHAR(255) PRIMARY KEY NOT NULL,
    UserID VARCHAR(255),
    Content VARCHAR(500),
    imageUrl VARCHAR (255),
    createdAt VARCHAR(255)
    
    FOREIGN KEY (UserID) REFERENCES Users(UserID)
);

USE Talky2;
select * from Posts

DROP TABLE Posts;

