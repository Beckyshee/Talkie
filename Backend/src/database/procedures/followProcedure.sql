
-- -- Create the stored procedure
-- CREATE OR ALTER PROCEDURE followUser(
--     @followerID VARCHAR(255),
--     @following_userID VARCHAR(255),
--     @followed_userID VARCHAR(255)
-- )
-- AS
-- BEGIN
--     INSERT INTO Followers (followerID, following_userID, followed_userID)
--     VALUES (@followerID, @following_userID,@followed_userID)
-- END

-- CREATE OR ALTER PROCEDURE unfollowUser(
--     @following_userID VARCHAR(255),
--     @followed_userID VARCHAR(255)
-- )
-- AS
-- BEGIN
--     DELETE FROM Followers
--     WHERE following_userID = @following_userID
--     AND followed_userID = @followed_userID;
-- END


-- CREATE OR ALTER PROCEDURE fetchFollowings
--     @following_userID VARCHAR(255)
-- AS
-- BEGIN
--     SELECT followerID
--     FROM Followers
--     WHERE following_userID = @following_userID;
-- END

-- CREATE OR ALTER PROCEDURE fetchFollowers
--     @followed_userID VARCHAR(255)
-- AS
-- BEGIN
--     SELECT followerID
--     FROM Followers
--     WHERE followed_userID = @followed_userID
-- END






-- -- Create the stored procedure
-- CREATE OR ALTER PROCEDURE unfollowUser
--     @following_userID VARCHAR(255),
--     @followed_userID VARCHAR(255)
-- AS
-- BEGIN
--     SET NOCOUNT ON;

--     DELETE FROM Followers
--     WHERE following_userID = @following_userID AND followed_userID = @followed_userID;
-- END;