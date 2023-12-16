-- Stored procedure for creating a new comment
-- CREATE OR ALTER PROCEDURE createComment
--   @CommentID VARCHAR(255),
--   @PostID VARCHAR(255),
--   @UserID VARCHAR(255),
--   @CommentRepliedToID VARCHAR(255) = NULL,
--   @CommentContent VARCHAR(500),
--   @CreatedAt VARCHAR(255)
-- AS
-- BEGIN
--   INSERT INTO comment (CommentID, PostID, UserID, comment_replied_to_id, comment, created_at)
--   VALUES (@CommentID, @PostID, @UserID, @CommentRepliedToID, @CommentContent, @CreatedAt);
-- END;


-- -- Stored procedure for fetching all comments for a post
-- CREATE OR ALTER PROCEDURE getAllComments
--   @PostID VARCHAR(255)
-- AS
-- BEGIN
--   SELECT * FROM comment WHERE PostID = @PostID;
-- END;


-- -- Stored procedure for creating a reply to a comment
-- CREATE OR ALTER PROCEDURE createReply
--   @CommentID VARCHAR(255),
--   @PostID VARCHAR(255),
--   @UserID VARCHAR(255),
--   @CommentRepliedToID VARCHAR(255),
--   @CommentContent VARCHAR(500),
--   @CreatedAt VARCHAR(255)
-- AS
-- BEGIN
--   INSERT INTO comment (CommentID, PostID, UserID, comment_replied_to_id, comment, created_at)
--   VALUES (@CommentID, @PostID, @UserID, @CommentRepliedToID, @CommentContent, @CreatedAt);
-- END;
