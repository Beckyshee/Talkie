-- Comment table
CREATE TABLE comment (
    CommentID VARCHAR(255) PRIMARY KEY,
    UserID VARCHAR(255) NOT NULL,
    PostID VARCHAR(255) NOT NULL,
    comment VARCHAR(500) NOT NULL,
    comment_replied_to_id VARCHAR(255),
    created_at VARCHAR(255) NOT NULL,
    FOREIGN KEY (UserID) REFERENCES Users(UserID),
    FOREIGN KEY (PostID) REFERENCES Posts(PostID),
    FOREIGN KEY (comment_replied_to_id) REFERENCES comment(CommentID)
);


USE Talky2;