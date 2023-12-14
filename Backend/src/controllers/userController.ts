import { Request, Response } from "express";
import mssql from "mssql";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { v4 } from "uuid";
import { sqlConfig } from "../config/sqlConfig";
import { userLoginValidationSchema, userRegisterValidationSchema } from "../validators/userValidators";
import { ExtendedUser } from "../middleware/verifyToken";


//register user
export const registerUser = async (req: Request, res: Response) => {
  try {
    let { Name, Email, Password } = req.body;

    const { error } = userRegisterValidationSchema.validate(req.body);

    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    let userID = v4();
    const hashedPwd = await bcrypt.hash(Password, 5);

    const pool = await mssql.connect(sqlConfig);





    const data = await pool
      .request()
      
      .input("Name", mssql.VarChar, Name)
      .input("Email", mssql.VarChar, Email)
     
      .input("Password", mssql.VarChar, hashedPwd)
      .execute("registerUser");

    console.log(data);

    return res.status(200).json({
      message: "User registered successfully",
    });
  } catch (error) {
    return res.json({
      error: error,
    });
  }
};

//login user
export const loginUser = async (req: Request, res: Response) => {
  try {
    const { Email, Password } = req.body;

    const { error } = userLoginValidationSchema.validate(req.body);

    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    const pool = await mssql.connect(sqlConfig);

    let user = await (
      await pool
        .request()
        .input("Email", mssql.VarChar, Email)
        .input("Password", mssql.VarChar, Password)
        .execute("loginUser")
    ).recordset;

    if (user.length === 1) {
      const correctPwd = await bcrypt.compare(Password, user[0].Password);

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
