// import mssql from "mssql";
// import { v4 } from "uuid";
// import bcrypt from "bcrypt";
// import { LoginUser, getOneUser, registerUser } from "./userControllerSpec";
// import { Request, Response } from "express";
// import jwt from "jsonwebtoken";
// import { sqlConfig } from "../config/sqlConfig";

// describe("User Registration", () => {
//   //
//   let res = {
//     status: jest.fn().mockReturnThis(), //to make our function chainable
//     json: jest.fn(), //mock function
//   };

//   beforeEach(() => {
//     res = {
//       status: jest.fn().mockReturnThis(),
//       json: jest.fn().mockReturnThis(),
//     };
//   });

//   it("successfully registers a user", async () => {
//     const req = {
//       body: {
//         name: "becky kariuki",
//         email: "becky.kariuki@thejitu.com",
//         phone_no: "01154256576",
//         id_no: "367577998",
//         cohort_no: "jgjfuy86869",
//         password: "HashedPass@word123",
//       },
//     };

//     jest
//       .spyOn(bcrypt, "hash")
//       .mockResolvedValueOnce("HashedPass@word123" as never);

//     const mockedInput = jest.fn().mockReturnThis();

//     const mockedExecute = jest.fn().mockResolvedValue({ rowsAffected: [1] });

//     const mockedRequest = {
//       input: mockedInput,
//       execute: mockedExecute,
//     };

//     const mockedPool = {
//       request: jest.fn().mockReturnValue(mockedRequest),
//     };

//     jest.spyOn(mssql, "connect").mockResolvedValue(mockedPool as never);

//     await registerUser(req as Request, res as any);

//     // Assertions

//     expect(res.json).toHaveBeenCalledWith({
//       message: "User registered successfully",
//     });
//     expect(res.status).toHaveBeenCalledWith(200);
//     expect(mockedInput).toHaveBeenCalledWith(
//       "password",
//       mssql.VarChar,
//       "HashedPass@word123"
//     );
//     expect(mockedInput).toHaveBeenCalledWith(
//       "name",
//       mssql.VarChar,
//       "becky kariuki"
//     );
//     expect(mockedInput).toHaveBeenCalledWith(
//       "email",
//       mssql.VarChar,
//       "becky.kariuki@thejitu.com"
//     );
//     expect(mockedInput).toHaveBeenCalledWith("id_no", mssql.Int, "367577998");
//   });
// });

// //Login
// describe("Testing Login Functionality", () => {
//   let res: any;

//   beforeEach(() => {
//     res = {
//       status: jest.fn().mockReturnThis(),
//       json: jest.fn().mockReturnThis(),
//     };
//   });

//   it("Returns an error if email or password is empty", async () => {
//     const req = {
//       body: {
//         email: "",
//         password: "",
//       },
//     };

//     await LoginUser(req as Request, res);

//     expect(res.json).toHaveBeenCalledWith({
//       error: '"email" is not allowed to be empty',
//     });
//   });

//   it("Returns an error if email or password is missing", async () => {
//     const req = {
//       body: {},
//     };

//     await LoginUser(req as Request, res);

//     expect(res.json).toHaveBeenCalledWith({ error: '"email" is required' });
//   });

//   it("Returns an error if email is not in database", async () => {
//     const req = {
//       body: {
//         email: "incorrect@email.com",
//         password: "12345678",
//       },
//     };

//     jest.spyOn(mssql, "connect").mockResolvedValueOnce({
//       request: jest.fn().mockReturnThis(),
//       input: jest.fn().mockReturnThis(),
//       execute: jest.fn().mockResolvedValueOnce({ recordset: [] }),
//     } as never);

//     await LoginUser(req as Request, res);

//     expect(res.json).toHaveBeenCalledWith({ error: "Email not found" });
//   });

//   it("Handles incorrect password scenario", async () => {
//     const req = {
//       body: {
//         email: "correct@email.com",
//         password: "wrongPassword",
//       },
//     };

//     jest.spyOn(mssql, "connect").mockResolvedValueOnce({
//       request: jest.fn().mockReturnThis(),
//       input: jest.fn().mockReturnThis(),
//       execute: jest.fn().mockResolvedValueOnce({
//         recordset: [
//           {
//             email: "correct@email.com",
//             password: "hashedPwd",
//           },
//         ],
//       }),
//     } as never);

//     jest.spyOn(bcrypt, "compare").mockResolvedValueOnce(false as never);

//     await LoginUser(req as Request, res);

//     expect(res.json).toHaveBeenCalledWith({ error: "Incorrect password" });
//   });

//   it("successfully logs in a user and returns a token", async () => {
//     let expectedUser = {
//       employee_id: "0adbb3b5-dead-448f-9ca1-44f93d0e5527",
//       name: "Jane Doe",
//       email: "correct@email.com",
//       phone_no: "0754876562",
//       id_no: 363784563,
//       cohort_no: "20",
//       password: "$2b$05$S.fpxBj3qNllnIvd.sq/beDjNoP72TvaMAS.GrplxY75sFyh6qV7e",
//       role: "employee",
//       welcomed: true,
//     };

//     const req = {
//       body: {
//         email: expectedUser.email,
//         password: "correctPassword",
//       },
//     };

//     jest.spyOn(mssql, "connect").mockResolvedValueOnce({
//       request: jest.fn().mockReturnThis(),
//       input: jest.fn().mockReturnThis(),
//       execute: jest.fn().mockResolvedValueOnce({ recordset: [expectedUser] }),
//     } as never);

//     jest.spyOn(bcrypt, "compare").mockResolvedValueOnce(true as never);

//     jest
//       .spyOn(jwt, "sign")
//       .mockReturnValueOnce("generate-token-jghjg-jyiugjxz-mmhjruyiu" as never);

//     await LoginUser(req as Request, res);

//     expect(res.json).toHaveBeenCalledWith({
//       message: "Logged in successfully",
//       token: "generate-token-jghjg-jyiugjxz-mmhjruyiu",
//     });
//   });
// });

// //one user

// describe("Get One User", () => {
//   let res: Response;

//   beforeEach(() => {
//     res = {
//       status: jest.fn().mockReturnThis(),
//       json: jest.fn().mockReturnThis(),
//     } as unknown as Response;
//   });

//   it("successfully retrieves a user by ID", async () => {
//     const userId = 1; // Assuming you have a user with ID 1 in your database

//     const mockedInput = jest.fn().mockReturnThis();
//     const mockedExecute = jest.fn().mockResolvedValue({
//       recordset: [
//         {
//           // employee: userId,
//           // name: "becky kariuki",
//           // email: "becky.kariuki@thejitu.com",
//           // phone_no: "01154256576",
//           // id_no: "367577998",
//           // cohort_no: "jgjfuy86869",
//           // password: "HashedPass@word123",

//           employee_id: "0adbb3b5-dead-448f-9ca1-44f93d0e5527",
//           name: "Jane Doe",
//           email: "correct@email.com",
//           phone_no: "0754876562",
//           id_no: 363784563,
//           cohort_no: "20",
//           password:
//             "$2b$05$S.fpxBj3qNllnIvd.sq/beDjNoP72TvaMAS.GrplxY75sFyh6qV7e",
//           role: "employee",
//           welcomed: true,
//         },
//       ],
//     });

//     const mockedRequest = {
//       input: mockedInput,
//       execute: mockedExecute,
//     };

//     const mockedPool = {
//       request: jest.fn().mockReturnValue(mockedRequest),
//     } as unknown as mssql.ConnectionPool;

//     (mssql.connect as jest.Mock).mockResolvedValue(mockedPool);

//     // await getOneUser(req as Request, res);

//     // Assertions
//     expect(res.json).toHaveBeenCalledWith({
//       user: [
//         {
//           // id: userId,
//           // name: "becky kariuki",
//           // email: "becky.kariuki@thejitu.com",
//           // phone_no: "01154256576",
//           // id_no: "367577998",
//           // cohort_no: "20",
//           // password: "HashedPass@word123",

//           employee_id: "0adbb3b5-dead-448f-9ca1-44f93d0e5527",
//           name: "Jane Doe",
//           email: "correct@email.com",
//           phone_no: "0754876562",
//           id_no: 363784563,
//           cohort_no: "20",
//           password:
//             "$2b$05$S.fpxBj3qNllnIvd.sq/beDjNoP72TvaMAS.GrplxY75sFyh6qV7e",
//           role: "employee",
//           welcomed: true,
//         },
//       ],
//     });
//     expect(res.status).toHaveBeenCalledWith(200);
//     expect(mockedInput).toHaveBeenCalledWith("employee_id", mssql.Int, userId);
//     expect(mockedExecute).toHaveBeenCalledWith("fetchOneUser");
//   });
// });
