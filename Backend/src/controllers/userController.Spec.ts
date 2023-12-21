import mssql from "mssql";
import bcrypt from "bcrypt";
import { loginUser, registerUser } from "../controllers/userController";
import { Request, Response } from "express";
import { v4 } from "uuid";
import jwt from 'jsonwebtoken'

describe("User Registration", () => {
  let res: Response;

  beforeEach(() => {
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    } as unknown as Response;
  });

  it("registers a user successfully", async () => {
    const req = {
      body: {
        name: "Robin",
        email: "devngecu@gmail.com",
        password: "I@mrich24",
      },
    } as Request;

    const mockedHash = jest.spyOn(bcrypt, "hash");
    mockedHash.mockResolvedValueOnce("HashedPass@word123" as never);

    const mockedPool = {
      request: jest.fn().mockReturnThis(),
      input: jest.fn().mockReturnThis(),
      execute: jest.fn().mockResolvedValue({ rowsAffected: [1] }),
    };

    jest.spyOn(mssql, "connect").mockResolvedValue(mockedPool as never);

    await registerUser(req, res);

    expect(mockedHash).toHaveBeenCalledWith("I@mrich24", 5);
    expect(res.json).toHaveBeenCalledWith({
      message: "User registered successfully",
    });
    expect(res.status).toHaveBeenCalledWith(200);
  });

  it("fails to register when required field is missing", async () => {
    const req = {
      body: {
        email: "devngecu@gmail.com",
        password: "I@mrich24",
      },
    } as Request;

    await registerUser(req, res);

    expect(res.json).toHaveBeenCalledWith({
      error: '"name" is required',
    });
    expect(res.status).toHaveBeenCalledWith(400);
  });
});



describe("User Login", () => {
  let res: any;
  let req: any;

  beforeEach(() => {
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    };
  });

  it("Returns an error if email or password is empty", async () => {
    const req = {
      body: {
        email: "",
        password: "",
      },
    };

    await loginUser(req as Request, res);

    expect(res.json).toHaveBeenCalledWith({
      error: '"email" is not allowed to be empty',
    });
  });
  it("Returns an error if email or password is missing", async () => {
    const req = {
      body: {},
    };

    await loginUser(req as Request, res);

    expect(res.json).toHaveBeenCalledWith({ error: '"password" is required' });
  });

  it("Returns an error if email is not in database", async () => {
    const req = {
      body: {
        email: "incorrect@email.com",
        password: "12345678",
      },
    };

    jest.spyOn(mssql, "connect").mockResolvedValueOnce({
      request: jest.fn().mockReturnThis(),
      input: jest.fn().mockReturnThis(),
      execute: jest.fn().mockResolvedValueOnce({ recordset: [] }),
    } as never);

    await loginUser(req as Request, res);

    expect(res.json).toHaveBeenCalledWith({ error: "Email not found" });
  });

  it("Handles incorrect password scenario", async () => {
    const req = {
      body: {
        email: "correct@email.com",
        password: "wrongPassword",
      },
    };

    jest.spyOn(mssql, "connect").mockResolvedValueOnce({
      request: jest.fn().mockReturnThis(),
      input: jest.fn().mockReturnThis(),
      execute: jest.fn().mockResolvedValueOnce({
        recordset: [
          {
            email: "correct@email.com",
            password: "hashedPwd",
          },
        ],
      }),
    } as never);

    jest.spyOn(bcrypt, "compare").mockResolvedValueOnce(false as never);

    await loginUser(req as Request, res);

    expect(res.json).toHaveBeenCalledWith({ error: "Incorrect password" });
  });

  it("successfully logs in a user and returns a token", async () => {
    let expectedUser = {
      userID: "f767882e-169b-4bf7-b399-a57bb9abda22",
      name: "Daniel",
      email: "gamemy177@gmail.com",
      password: "$2b$05$zUktbQwZdVCS4WNKjibYquoOhn2CttYi8U.WKfCKz79BIzFVe//Fa",
   
    };

    const req = {
      body: {
        email: expectedUser.email,
        password: "correctPassword",
      },
    };

    jest.spyOn(mssql, "connect").mockResolvedValueOnce({
      request: jest.fn().mockReturnThis(),
      input: jest.fn().mockReturnThis(),
      execute: jest.fn().mockResolvedValueOnce({ recordset: [expectedUser] }),
    } as never);

    jest.spyOn(bcrypt, "compare").mockResolvedValueOnce(true as never);

    jest
      .spyOn(jwt, "sign")
      .mockReturnValueOnce("generate-token-jghjg-jyiugjxz-mmhjruyiu" as never);

    await loginUser(req as Request, res);

    expect(res.json).toHaveBeenCalledWith({
      message: "Logged in successfully",
      token: "generate-token-jghjg-jyiugjxz-mmhjruyiu",
    });
  });
});
