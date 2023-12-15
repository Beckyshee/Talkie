import { Request, Response } from "express";
import { v4 } from "uuid";
import mssql, { pool } from "mssql";
import { sqlConfig } from "../config/sqlConfig";
import dbHelper from "../dbHelpers/dbHelpers";
import { isEmpty } from "lodash";

export const createPost = async (req: Request, res: Response) => {
  try {
    const PostID = v4();

    const { UserID, content, imageUrl } = req.body;

    const createdAt = new Date().toISOString();
    await dbHelper.execute("createPost", {
      UserID,
      PostID,
      imageUrl,
      content,
      createdAt,
    });

    return res.status(200).json({ message: "post created successfully" });
  } catch (error) {
    return res.json({
      error: error,
    });
  }
};

export const fetchAllPosts = async (req: Request, res: Response) => {
  try {
    const pool = await mssql.connect(sqlConfig);

    const posts = (await pool.request().execute("fetchAllPosts")).recordset;

    return res.status(200).json({ posts: posts });
  } catch (error) {
    return res.json({
      error: error,
    });
  }
};

export const fetchOnePost = async (req: Request, res: Response) => {
  try {
    let { PostID } = req.params;

    const pool = await mssql.connect(sqlConfig);

    const post = (
      await pool.request().input("PostID", PostID).execute("fetchOnePost")
    ).recordset;

    // console.log(post);
    return res.json({ post: post });
  } catch (error) {
    return res.json({
      error: error,
    });
  }
};

export const deletePost = async (req: Request, res: Response) => {
  try {
    let PostID = req.params.PostID;

    console.log(PostID);

    const pool = await mssql.connect(sqlConfig);

    const post = (
      await pool.request().input("PostID", PostID).execute("deletePost")
    ).rowsAffected;

    console.log(post);

    if (post[0] === 1) {
      return res.status(200).json({
        message: "Post deleted successfully",
      });
    } else {
      return res.status(400).json({
        error: "No post with the given ID",
      });
    }
  } catch (error) {
    console.log(error);

    return res.json({
      error: "Server not running",
    });
  }
};

export const updatePost = async (req: Request, res: Response) => {
  try {
    let { PostID } = req.params;

    const { content, imageUrl, createdAt } = req.body;

    const pool = await mssql.connect(sqlConfig);

    const post = await pool
      .request()

      .input("content", content)
      .input("imageUrl", imageUrl)
      .input("createdAt", createdAt)
      .input("PostID", PostID)
      .execute("updatePost");

    console.log(post);
  } catch (error) {
    return res.json({
      error: error,
    });
  }
};

//Like Unlike Logic
export const toggleLikePost = async (req: Request, res: Response) => {
  try {
    const { PostID } = req.body;
    const { UserID } = req.body;

    const pool = await mssql.connect(sqlConfig);
    const likeExists = await pool
      .request()
      .input("PostID", PostID)
      .input("UserID", UserID)
      .execute("checkLikePost"); // Assume you have a stored procedure to check if the user has already liked the post
    console.log(PostID, UserID);

    let result;

    if (likeExists.recordset.length > 0 && likeExists.recordset[0].Liked == 1) {
      // User has already liked the post, perform unlike
      result = await pool
        .request()
        .input("PostID", PostID)
        .input("UserID", UserID)
        .execute("unlikePost"); // Modify with your actual stored procedure
    } else {
      // User has not liked the post, perform like
      result = await pool
        .request()
        .input("PostID", PostID)
        .input("UserID", UserID)
        .execute("likePost"); // Modify with your actual stored procedure
    }

    console.log(result);

    if (result.rowsAffected[0] > 0) {
      return res.status(200).json({
        message: "Toggle Like Successful",
      });
    } else {
      return res.status(200).json({
        message: "Error",
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      error: error,
    });
  }
};

export const getLikesForPost = async (req: Request, res: Response) => {
  try {
    const { PostID } = req.params; // Assuming PostID is part of the route parameters

    const pool = await mssql.connect(sqlConfig);
    const result = await pool
      .request()
      .input("PostID", PostID)
      .execute("getLikesForPost");

    const likes = result.recordset.map((row) => row.UserID);

    return res.status(200).json({
      likes: likes,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      error: error,
    });
  }
};

//Follow Unfollow Logic
export const toggleFollowUser = async (req: Request, res: Response) => {
  const FollowerID = v4()
  try {
    const { following_user_id, followed_user_id } = req.body;

    const pool = await mssql.connect(sqlConfig);
    const relationExists = await pool
      .request()
      .input("following_user_id", following_user_id)
      .input("followed_user_id", followed_user_id)
      .execute("checkFollowUser"); // Assume you have a stored procedure to check if the user is already following the target user

    let result;

    if (relationExists.recordset.length > 0) {
      // User is already following the target user, perform unfollow
      result = await pool
        .request()
        .input("following_user_id", following_user_id)
        .input("followed_user_id", followed_user_id)
        .execute("unfollowUser"); // Modify with your actual stored procedure
    } else {
      // User is not following the target user, perform follow
      result = await pool
        .request()
        .input("following_user_id", following_user_id)
        .input("followed_user_id", followed_user_id)
        .execute("followUser"); // Modify with your actual stored procedure
    }

    console.log(result);

    return res.status(200).json({
      message: "Toggle Follow Successful",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      error: error,
    });
  }
}

export const getFollowers = async (req: Request, res: Response) => {
  try {
    const { followed_user_id } = req.params;
    const pool = await mssql.connect(sqlConfig); // Make sure to import or define sqlConfig

    const followers = (
      await pool
        .request()
        .input("followed_user_id", mssql.VarChar, followed_user_id)
        .execute("fetchFollowers")
    ).recordset;

    return res.status(200).json({
      followers,
    });
  } catch (error) {
    return res.json({
      error,
    });
  }
};

export const getFollowings = async (req: Request, res: Response) => {
  try {
    const { following_user_id } = req.params;
    const pool = await mssql.connect(sqlConfig); // Make sure to import or define sqlConfig

    const followings = (
      await pool
        .request()
        .input("following_user_id", mssql.VarChar, following_user_id)
        .execute("fetchFollowings")
    ).recordset;

    return res.status(200).json({
      followings,
    });
  } catch (error) {
    return res.json({
      error,
    });
  }
};
