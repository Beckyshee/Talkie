-- followUser
-- CREATE PROCEDURE followUser
--     @following_user_id VARCHAR(255),
--     @followed_user_id VARCHAR(255)
-- AS
-- BEGIN
--     DECLARE @follower_id VARCHAR(255);
--     SET @follower_id = CONVERT(VARCHAR(255), NEWID());

--     INSERT INTO followers (follower_id, following_user_id, followed_user_id, follow_date)
--     VALUES (@follower_id, @following_user_id, @followed_user_id, GETDATE());
-- END;

-- CREATE OR ALTER PROCEDURE unfollowUser
--     @follower_id VARCHAR(255),
--     @following_user_id VARCHAR(255)
-- AS
-- BEGIN
--     SET NOCOUNT ON;

--     -- Delete from followers table
--     DELETE FROM followers
--     WHERE follower_id = @follower_id AND following_user_id = @following_user_id;

--     -- Decrement follower count for unfollowed user
--     UPDATE users
--     SET followers_count = followers_count - 1
--     WHERE UserID = @following_user_id;

--     -- Decrement following count for follower
--     UPDATE users
--     SET following_count = following_count - 1
--     WHERE UserID = @follower_id;
-- END;

-- Create or alter the stored procedure 'checkFollowUser'
-- Create or alter the stored procedure 'checkFollowUser'
CREATE OR ALTER PROCEDURE checkFollowUser
  @FollowerID VARCHAR(255),
  @FollowingID VARCHAR(255)
AS
BEGIN
  -- Check if the user with @FollowerID is following @FollowingID
  IF EXISTS (
      SELECT 1
      FROM followers
      WHERE follower_id = @FollowerID
      AND following_id = @FollowingID
  )
  BEGIN
      -- Return 1 if the user is following
      SELECT 1 AS 'IsFollowing';
  END
  ELSE
  BEGIN
      -- Return 0 if the user is not following
      SELECT 0 AS 'IsFollowing';
  END
END;

drop procedure




