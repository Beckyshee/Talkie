-- Create the 'Follows' table
CREATE TABLE Follows (
    FollowID INT PRIMARY KEY IDENTITY(1,1),
    UserID VARCHAR(255),
    FollowedUserID VARCHAR(255),
    CONSTRAINT FK_Follows_User FOREIGN KEY (UserID) REFERENCES Users(UserID),
    CONSTRAINT FK_Follows_FollowedUser FOREIGN KEY (FollowedUserID) REFERENCES Users(UserID)
);
use Talky2;
select * from follows;
drop table follows;