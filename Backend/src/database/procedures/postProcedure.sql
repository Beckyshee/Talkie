-- -- Stored procedure for creating a new post
CREATE OR ALTER PROCEDURE createPost
  @UserID VARCHAR(255),
  @PostID VARCHAR(255),
  @content VARCHAR(500),
  @imageUrl VARCHAR(255),
  @createdAt VARCHAR(255)
AS
BEGIN
  INSERT INTO Posts (UserID,PostID, Content, imageUrl, createdAt)
  VALUES (@UserID,@PostID, @content, @imageUrl, @createdAt);
END;


-- -- Stored procedure for fetching all posts
-- CREATE OR ALTER PROCEDURE fetchAllPosts
-- AS
-- BEGIN
--   SELECT * FROM Posts;
-- END;
-- USE Talky2;

-- -- Stored procedure for fetching a single post by PostID
-- CREATE OR ALTER PROCEDURE fetchOnePost
--   @PostID VARCHAR(255)
-- AS
-- BEGIN
--   SELECT * FROM Posts WHERE PostID = @PostID;
-- END;


-- -- Stored procedure for deleting a post by PostID
-- CREATE OR ALTER PROCEDURE deletePost
--   @PostID VARCHAR(255)
-- AS
-- BEGIN
--   DELETE FROM Posts WHERE PostID = @PostID;
-- END;


-- -- Stored procedure for updating a post by PostID
-- CREATE OR ALTER PROCEDURE updatePost
--   @PostID VARCHAR(255),
--   @content VARCHAR(500),
--   @imageUrl VARCHAR(255),
--   @createdAt VARCHAR(255)
-- AS
-- BEGIN
--   UPDATE Posts
--   SET Content = @content, imageUrl = @imageUrl, createdAt = @createdAt
--   WHERE PostID = @PostID;
-- END;


-- Stored procedure for toggling like on a post
-- CREATE OR ALTER PROCEDURE toggleLikePost
--   @PostID VARCHAR(255),
--   @UserID VARCHAR(255)
-- AS
-- BEGIN
--   IF EXISTS (SELECT 1 FROM Likes WHERE PostID = @PostID AND UserID = @UserID)
--     DELETE FROM Likes WHERE PostID = @PostID AND UserID = @UserID;
--   ELSE
--     INSERT INTO Likes (PostID, UserID) VALUES (@PostID, @UserID);
-- END;


-- -- Stored procedure for toggling follow/unfollow a user
-- CREATE OR ALTER PROCEDURE toggleFollowUser
--   @follower_id VARCHAR(255),
--   @following_user_id VARCHAR(255),
--   @followed_user_id VARCHAR(255),
--   @created_at VARCHAR(255)
-- AS
-- BEGIN
--   IF EXISTS (SELECT 1 FROM followers WHERE following_user_id = @following_user_id AND followed_user_id = @followed_user_id)
--     DELETE FROM followers WHERE following_user_id = @following_user_id AND followed_user_id = @followed_user_id;
--   ELSE
--     INSERT INTO followers (follower_id, following_user_id, followed_user_id, follow_date)
--     VALUES (@follower_id, @following_user_id, @followed_user_id, @created_at);
-- END;


-- -- Stored procedure for fetching followers of a user
-- CREATE OR ALTER PROCEDURE fetchFollowers
--   @followed_user_id VARCHAR(255)
-- AS
-- BEGIN
--   SELECT * FROM followers WHERE followed_user_id = @followed_user_id;
-- END;


-- -- Stored procedure for fetching followings of a user
-- CREATE OR ALTER PROCEDURE fetchFollowings
--   @following_user_id VARCHAR(255)
-- AS
-- BEGIN
--   SELECT * FROM followers WHERE following_user_id = @following_user_id;
-- END;


-- Create or alter the stored procedure 'checkLikePost'
-- CREATE OR ALTER PROCEDURE checkLikePost
--   @PostID VARCHAR(255),
--   @UserID VARCHAR(255)
-- AS
-- BEGIN
--   -- Check if the user with @UserID has liked the post with @PostID
--   IF EXISTS (
--       SELECT 1
--       FROM Likes
--       WHERE PostID = @PostID
--       AND UserID = @UserID
--   )
--   BEGIN
--       -- Return 1 if the user has liked the post
--       SELECT 1 AS 'Liked';
--   END
--   ELSE
--   BEGIN
--       -- Return 0 if the user has not liked the post
--       SELECT 0 AS 'Liked';
--   END
-- END;


-- getAllLikesFor Post
-- CREATE OR ALTER PROCEDURE getLikesForPost
--   @PostID VARCHAR(255)
-- AS
-- BEGIN
--   -- Select all likes for the specified post
--   SELECT UserID
--   FROM Likes
--   WHERE PostID = @PostID;
-- END;

-- Create or alter the stored procedure 'likePost'
-- CREATE OR ALTER PROCEDURE likePost
--   @PostID VARCHAR(255),
--   @UserID VARCHAR(255)
-- AS
-- BEGIN
--   -- Insert a new like record
--   INSERT INTO Likes (PostID, UserID)
--   VALUES (@PostID, @UserID);
-- END;

-- Create or alter the stored procedure 'unlikePost'
-- CREATE OR ALTER PROCEDURE unlikePost
--   @PostID VARCHAR(255),
--   @UserID VARCHAR(255)
-- AS
-- BEGIN
--   -- Delete the like record for the specified post and user
--   DELETE FROM Likes
--   WHERE PostID = @PostID
--     AND UserID = @UserID;
-- END;

