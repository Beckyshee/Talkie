-- CREATE PROCEDURE registerUser(
--     @UserID varchar(100),
--     @Name varchar(255),
--     @Email VARCHAR(300),
--     @Password VARCHAR(200)
-- )
-- AS
-- BEGIN
--     IF NOT EXISTS (SELECT 1 FROM Users WHERE Email = @Email)
--     BEGIN
--         INSERT INTO Users (UserID, Name, Email, Password)
--         VALUES (@UserID, @Name, @Email, @Password)
--     END
--     ELSE
--     BEGIN
--         PRINT 'Email already exists. User not registered.'
--     END
-- END

-- select * from Users




-- use Talky2
-- select * from Users

-- loginUser
-- create  PROCEDURE loginUser(
--     @Email varchar(300),
--     @Password VARCHAR(200)
-- )
-- as
-- BEGIN
--     select * from Users where Email = @Email 
-- end


-- FetchAllUser
-- CREATE PROCEDURE FetchAllUsers
-- AS
-- BEGIN
--     SELECT * FROM Users WHERE isDeleted = 0;
-- END;


-- singleUserFetch
-- CREATE PROCEDURE FetchSingleUser
--     @UserID VARCHAR(255)
-- AS
-- BEGIN
--     SELECT * FROM Users WHERE UserID = @UserID AND isDeleted = 0;
-- END;


-- SoftDel
-- CREATE PROCEDURE SoftDeleteUser
--     @UserID VARCHAR(255)
-- AS
-- BEGIN
--     UPDATE Users SET isDeleted = 1 WHERE UserID = @UserID;
-- END;


-- doesUserExist
-- CREATE OR ALTER PROCEDURE CheckUserExists
--     @UserID VARCHAR(255)
-- AS
-- BEGIN
--     SELECT * FROM Users WHERE UserID = @UserID;
-- END;


USE Talky2;


CREATE OR ALTER PROCEDURE unlikePost
  @PostID VARCHAR(255),
  @UserID VARCHAR(255)
AS
BEGIN
  -- Delete the like record for the specified post and user
  DELETE FROM Likes
  WHERE PostID = @PostID
  AND UserID = @UserID;
END;
