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
                email: "testuser@example.com",
                password: "I@mrich24",
            },
        };
        jest
            .spyOn(bcrypt_1.default, "hash")
            .mockResolvedValueOnce("HashedPass@word123");
        const mockedInput = jest.fn().mockReturnThis();
        const mockedExecute = jest.fn().mockResolvedValue({ rowsAffected: [1] });
        const mockedRequest = {
            input: mockedInput,
            execute: mockedExecute,
        };
        const mockedPool = {
            request: jest.fn().mockReturnValue(mockedRequest),
        };
        jest.spyOn(mssql_1.default, "connect").mockResolvedValue(mockedPool);
        yield (0, userController_1.registerUser)(req, res);
        expect(res.json).toHaveBeenCalledWith({
            message: "User registered successfully",
        });
        expect(res.status).toHaveBeenCalledWith(200);
    }));
    it("fails to register with missing required fields", () => __awaiter(void 0, void 0, void 0, function* () {
        // Omitting the "name" field intentionally
        const req = {
            body: {
                email: "testuser@example.com",
                password: "I@mrich24",
            },
        };
        yield (0, userController_1.registerUser)(req, res);
        expect(res.json).toHaveBeenCalledWith({
            error: "name is required",
        });
        expect(res.status).toHaveBeenCalledWith(400);
    }));
    it("fails to register with invalid email", () => __awaiter(void 0, void 0, void 0, function* () {
        const req = {
            body: {
                name: "Robin",
                email: "devngecumail.com", // Invalid email format
                password: "I@mrich24",
            },
        };
        yield (0, userController_1.registerUser)(req, res);
        expect(res.json).toHaveBeenCalledWith({
            error: "Invalid email format",
        });
        expect(res.status).toHaveBeenCalledWith(400);
    }));
});
