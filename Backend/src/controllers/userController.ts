import { Request, Response } from "express";
import mssql, { pool } from "mssql";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { v4 } from "uuid";
import { sqlConfig } from "../config/sqlConfig";
import { userLoginValidationSchema, userRegisterValidationSchema } from "../validators/userValidators";
import { ExtendedUser } from "../middleware/verifyToken";


//register user
export const registerUser = async (req: Request, res: Response) => {
  try {
    let { name, email, password } = req.body;

    const { error } = userRegisterValidationSchema.validate(req.body);

    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    let UserID = v4();
    const hashedPwd = await bcrypt.hash(password, 5);

    const pool = await mssql.connect(sqlConfig);





    const data = await pool
      .request()
      .input("userID", mssql.VarChar, UserID)
      .input("Name", mssql.VarChar, name)
      .input("Email", mssql.VarChar, email)

      .input("Password", mssql.VarChar, hashedPwd)
      .execute("registerUser");

    console.log(data);

    return res.status(200).json({
      message: "User registered successfully",
    });
    
  } 
  catch (error) {
    console.log(error);
    
    return res.json({
      error: error,
    });
  }
};

//login user
export const loginUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const { error } = userLoginValidationSchema.validate(req.body);

    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    const pool = await mssql.connect(sqlConfig);

    let user = await (
      await pool
        .request()
        .input("email", mssql.VarChar, email)
        .input("password", mssql.VarChar, password)
        .execute("loginUser")
    ).recordset;
console.log(user);

    if (user.length === 1) {
      const correctPwd = await bcrypt.compare(password, user[0].Password);

      if (!correctPwd) {
        return res.status(401).json({
          error: "Incorrect password",
        });
      }
      const loginCredentials = user.map((record) => {
        const { password, ...rest } = record;
        return rest;
      });

      const token = jwt.sign(
        loginCredentials[0],
        process.env.SECRET as string,
        {
          expiresIn: "3600s",
        }
      );

      return res.status(200).json({
        message: "Logged in successfully",
        token,
      });
    } else {
      return res.status(401).json({
        error: "Email not found",
      });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      error: "Internal Server Error",
    });
  }
};


//get all users
export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const pool = await mssql.connect(sqlConfig);

    let users = (await pool.request().execute("fetchAllUsers"))
      .recordset;
    // let users = (await pool.request().query('SELECT * FROM Users')).recordset

    return res.status(200).json({
      users: users,
    });
  } catch (error) {
    return res.json({
      error: error,
    });
  }
};

//getting a single user
export const getSingleUser = async (req: Request, res: Response) => {
  try {
    let id = req.params.id;

    const pool = await mssql.connect(sqlConfig);

    let user = (
      await pool.request().input("UserID", id).execute("fetchSingleUser")
    ).recordset;
    // let users = (await pool.request().query('SELECT * FROM Users')).recordset

    return res.status(200).json({
      user: user,
    });
  } catch (error) {
    return res.json({
      error: error,
    });
  }
};


//checkUser Details
export const checkUserDetails = async (req: ExtendedUser, res: Response) => {
  if (req.info) {
    return res.json({
      info: req.info,
    });
  }
};


//soft delete
export const softDeleteUser = async (req: Request, res: Response) => {
  try {
    const { userID } = req.params;
console.log(req.params);
 const pool = await mssql.connect(sqlConfig);
    // Check if the user exists
    const userExists = await pool
      .request()
      .input("UserID", userID)
      .execute("checkUserExists");
// console.log(userExists);

    if (userExists.recordset.length === 0) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    // Perform soft delete by updating the isDeleted field
    const result = await pool
      .request()
      .input("UserID", userID)
      .execute("softDeleteUser"); // Replace with your actual stored procedure for soft delete

    console.log(result);

    return res.status(200).json({
      message: "Soft Delete Successful",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      error: error,
    });
  }
};




export const getFollowers = async (req: Request, res: Response) => {
  try {
    const { followed_user_id } = req.params;
    const pool = await mssql.connect(sqlConfig);

    

    // const followers = (
    //   await pool
    //     .request()
    //     .input("followed_user_id", mssql.VarChar, followed_user_id)
    //     .execute("fetchFollowers")
    // ).recordset;
     const result = await pool
       .request()
       .input("followed_user_id", followed_user_id)
       .execute("fetchFollowers");

     const followers = result.recordset.map((row) => row.UserID);

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


export const toggleFollowUser = async (req: Request, res: Response) => {
  console.log(req.body);

  try {
    const { following_userID, followed_userID } = req.body;
    const pool = await mssql.connect(sqlConfig);

    const relationExists = (await pool
      .request()
      .input("following_userID", mssql.VarChar, following_userID)
      .input("followed_userID", mssql.VarChar, followed_userID)
      .query(
        "SELECT * FROM Followers WHERE following_userID = @following_userID AND followed_userID = @followed_userID"
      )) as { recordset: any[] };
    let result;

    if (relationExists.recordset.length > 0) {
      result = await pool
        .request()
        .input("following_userID", mssql.VarChar, following_userID)
        .input("followed_userID", mssql.VarChar, followed_userID)
        .execute("unfollowUser");
    } else {
      const followerID = v4();
      result = await pool
        .request()
        .input("followerID", mssql.VarChar, followerID)
        .input("following_userID", mssql.VarChar, following_userID)
        .input("followed_userID", mssql.VarChar, followed_userID)
        .execute("followUser");
    }

    console.log(result);

    if (result.rowsAffected[0] > 0) {
      const actionMessage =
        relationExists.recordset.length > 0
          ? "User Unfollowed"
          : "User Followed";
      return res.status(200).json({
        message: actionMessage,
      });
    } else {
      return res.status(404).json({
        message: "Something went wrong, user not followed",
      });
    }
  } catch (error) {
    console.log(error);

    return res.json({
      error,
    });
  }
};

