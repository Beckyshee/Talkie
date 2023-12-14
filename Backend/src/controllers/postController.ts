import { Request, Response } from "express";
import { v4 } from "uuid";
import mssql from "mssql";
import { sqlConfig } from "../config/sqlConfig";
import dbHelper from "../dbHelpers/dbHelpers"


export const createPost = async (req: Request, res: Response) => {
  try {
    const id = v4();

    const { PostID, content, imageUrl, createdAt } =
      req.body;

    await dbHelper.execute("createPost", {
        PostID: id,
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

    const posts = (await pool.request().execute("fetchAllPosts"))
      .recordset;

    return res.status(200).json({ posts: posts});
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
    let { PostID } = req.params;

    const pool = await mssql.connect(sqlConfig);

    const post = (
      await pool.request().input("PostID", PostID).execute("deletePost")
    ).rowsAffected;

    if (post[0] == 1) {
      return res.status(200).json({
        message: "Post deleted successfully",
      });
    } else {
      return res.status(400).json({
        error: "No post with the given ID",
      });
    }
  } catch (error) {
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
