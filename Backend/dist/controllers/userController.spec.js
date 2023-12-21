"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mssql_1 = __importDefault(require("mssql"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const userController_1 = require("../controllers/userController");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
describe("User Registration", () => {
    let res;
    beforeEach(() => {
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn().mockReturnThis(),
        };
    });
    it("registers a user successfully", () => __awaiter(void 0, void 0, void 0, function* () {
        const req = {
            body: {
                name: "Robin",
                email: "devngecu@gmail.com",
                password: "I@mrich24",
            },
        };
        const mockedHash = jest.spyOn(bcrypt_1.default, "hash");
        mockedHash.mockResolvedValueOnce("HashedPass@word123");
        const mockedPool = {
            request: jest.fn().mockReturnThis(),
            input: jest.fn().mockReturnThis(),
            execute: jest.fn().mockResolvedValue({ rowsAffected: [1] }),
        };
        jest.spyOn(mssql_1.default, "connect").mockResolvedValue(mockedPool);
        yield (0, userController_1.registerUser)(req, res);
        expect(mockedHash).toHaveBeenCalledWith("I@mrich24", 5);
        expect(res.json).toHaveBeenCalledWith({
            message: "User registered successfully",
        });
        expect(res.status).toHaveBeenCalledWith(200);
    }));
    it("fails to register when required field is missing", () => __awaiter(void 0, void 0, void 0, function* () {
        const req = {
            body: {
                email: "devngecu@gmail.com",
                password: "I@mrich24",
            },
        };
        yield (0, userController_1.registerUser)(req, res);
        expect(res.json).toHaveBeenCalledWith({
            error: '"name" is required',
        });
        expect(res.status).toHaveBeenCalledWith(400);
    }));
});
describe("User Login", () => {
    let res;
    let req;
    beforeEach(() => {
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn().mockReturnThis(),
        };
    });
    it("Returns an error if email or password is empty", () => __awaiter(void 0, void 0, void 0, function* () {
        const req = {
            body: {
                email: "",
                password: "",
            },
        };
        yield (0, userController_1.loginUser)(req, res);
        expect(res.json).toHaveBeenCalledWith({
            error: '"email" is not allowed to be empty',
        });
    }));
    it("Returns an error if email or password is missing", () => __awaiter(void 0, void 0, void 0, function* () {
        const req = {
            body: {},
        };
        yield (0, userController_1.loginUser)(req, res);
        expect(res.json).toHaveBeenCalledWith({ error: '"password" is required' });
    }));
    it("Returns an error if email is not in database", () => __awaiter(void 0, void 0, void 0, function* () {
        const req = {
            body: {
                email: "incorrect@email.com",
                password: "12345678",
            },
        };
        jest.spyOn(mssql_1.default, "connect").mockResolvedValueOnce({
            request: jest.fn().mockReturnThis(),
            input: jest.fn().mockReturnThis(),
            execute: jest.fn().mockResolvedValueOnce({ recordset: [] }),
        });
        yield (0, userController_1.loginUser)(req, res);
        expect(res.json).toHaveBeenCalledWith({ error: "Email not found" });
    }));
    it("Handles incorrect password scenario", () => __awaiter(void 0, void 0, void 0, function* () {
        const req = {
            body: {
                email: "correct@email.com",
                password: "wrongPassword",
            },
        };
        jest.spyOn(mssql_1.default, "connect").mockResolvedValueOnce({
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
        });
        jest.spyOn(bcrypt_1.default, "compare").mockResolvedValueOnce(false);
        yield (0, userController_1.loginUser)(req, res);
        expect(res.json).toHaveBeenCalledWith({ error: "Incorrect password" });
    }));
    it("successfully logs in a user and returns a token", () => __awaiter(void 0, void 0, void 0, function* () {
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
        jest.spyOn(mssql_1.default, "connect").mockResolvedValueOnce({
            request: jest.fn().mockReturnThis(),
            input: jest.fn().mockReturnThis(),
            execute: jest.fn().mockResolvedValueOnce({ recordset: [expectedUser] }),
        });
        jest.spyOn(bcrypt_1.default, "compare").mockResolvedValueOnce(true);
        jest
            .spyOn(jsonwebtoken_1.default, "sign")
            .mockReturnValueOnce("generate-token-jghjg-jyiugjxz-mmhjruyiu");
        yield (0, userController_1.loginUser)(req, res);
        expect(res.json).toHaveBeenCalledWith({
            message: "Logged in successfully",
            token: "generate-token-jghjg-jyiugjxz-mmhjruyiu",
        });
    }));
});
