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
const postController_1 = require("../controllers/postController");
const mssql_1 = __importDefault(require("mssql"));
const uuid_1 = require("uuid");
// Mock mssql module and sqlConfig
jest.mock("mssql");
jest.mock("../config/sqlConfig", () => ({ sqlConfig: {} }));
describe("Comment Controller", () => {
    let req;
    let res;
    beforeEach(() => {
        req = {};
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn().mockReturnThis(),
        };
    });
    describe("createComment", () => {
        it("creates a comment successfully", () => __awaiter(void 0, void 0, void 0, function* () {
            req.body = {
                CommentID: (0, uuid_1.v4)(),
                PostID: "dff023ad-d2e5-4cd6-8745-6cc035dd2210",
                UserID: "0732a5a2-d46a-4bb3-88ea-4b095d28c127",
                CommentContent: "yes it is a atest comment",
                comment_replied_to_id: "06dd5591-21b8-4484-aee8-c8d1e4f7da47",
                CreatedAt: new Date().toISOString(),
            };
            mssql_1.default.connect.mockResolvedValue({
                request: jest.fn().mockReturnThis(),
                input: jest.fn().mockReturnThis(),
                execute: jest.fn().mockResolvedValue({}),
            });
            yield (0, postController_1.createComment)(req, res);
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({
                message: "Comment created successfully",
            });
        }));
        // Add more test cases for validation, error handling, etc.
    });
    describe("getAllComments", () => {
        it("fetches all comments for a post successfully", () => __awaiter(void 0, void 0, void 0, function* () {
            req.params = {
                PostID: "examplePostID",
            };
            mssql_1.default.connect.mockResolvedValue({
                request: jest.fn().mockReturnThis(),
                input: jest.fn().mockReturnThis(),
                execute: jest.fn().mockResolvedValue({
                    recordset: [{ CommentID: (0, uuid_1.v4)(), CommentContent: "This is a comment" }],
                }),
            });
            yield (0, postController_1.getAllComments)(req, res);
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({
                comments: [
                    {
                        CommentID: expect.any(String),
                        CommentContent: "This is a comment",
                    },
                ],
            });
        }));
        // Add more test cases for validation, error handling, etc.
    });
    describe("createReply", () => {
        it("creates a reply successfully", () => __awaiter(void 0, void 0, void 0, function* () {
            req.body = {
                CommentID: (0, uuid_1.v4)(),
                PostID: "2f6bcdbb-d9e1-494a-a2eb-2f32c39a98ba",
                UserID: "b433cffa-75cf-4750-8a50-79a1a1120b65",
                CommentRepliedToID: "06dd5591-21b8-4484-aee8-c8d1e4f7da47",
                CommentContent: "yes it is a atest comment",
                CreatedAt: new Date().toISOString(),
            };
            mssql_1.default.connect.mockResolvedValue({
                request: jest.fn().mockReturnThis(),
                input: jest.fn().mockReturnThis(),
                execute: jest.fn().mockResolvedValue({}),
            });
            yield (0, postController_1.createReply)(req, res);
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({
                message: "Reply created successfully",
            });
        }));
        // Add more test cases for validation, error handling, etc.
    });
});
