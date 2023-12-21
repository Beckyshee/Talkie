import { Request, Response } from "express";
import {
  createComment,
  getAllComments,
  createReply,
} from "../controllers/postController";
import mssql from "mssql";
import { v4 } from "uuid";

// Mock mssql module and sqlConfig
jest.mock("mssql");
jest.mock("../config/sqlConfig", () => ({ sqlConfig: {} }));

describe("Comment Controller", () => {
  let req: Request;
  let res: Response;

  beforeEach(() => {
    req = {} as Request;
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    } as unknown as Response;
  });

  describe("createComment", () => {
    it("creates a comment successfully", async () => {
      req.body = {
        CommentID: v4(),
       PostID: "dff023ad-d2e5-4cd6-8745-6cc035dd2210",
       UserID: "0732a5a2-d46a-4bb3-88ea-4b095d28c127",
        CommentContent: "yes it is a atest comment",
            comment_replied_to_id: "06dd5591-21b8-4484-aee8-c8d1e4f7da47",
        CreatedAt: new Date().toISOString(),
      };

      (mssql.connect as jest.Mock).mockResolvedValue({
        request: jest.fn().mockReturnThis(),
        input: jest.fn().mockReturnThis(),
        execute: jest.fn().mockResolvedValue({}),
      });

      await createComment(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        message: "Comment created successfully",
      });
    });

    // Add more test cases for validation, error handling, etc.
  });

  describe("getAllComments", () => {
    it("fetches all comments for a post successfully", async () => {
      req.params = {
        PostID: "examplePostID",
      };

      (mssql.connect as jest.Mock).mockResolvedValue({
        request: jest.fn().mockReturnThis(),
        input: jest.fn().mockReturnThis(),
        execute: jest.fn().mockResolvedValue({
          recordset: [{ CommentID: v4(), CommentContent: "This is a comment" }],
        }),
      });

      await getAllComments(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        comments: [
          {
            CommentID: expect.any(String),
            CommentContent: "This is a comment",
          },
        ],
      });
    });

    // Add more test cases for validation, error handling, etc.
  });

  describe("createReply", () => {
    it("creates a reply successfully", async () => {
      req.body = {
        CommentID: v4(),
        PostID: "2f6bcdbb-d9e1-494a-a2eb-2f32c39a98ba",
        UserID: "b433cffa-75cf-4750-8a50-79a1a1120b65",
        CommentRepliedToID: "06dd5591-21b8-4484-aee8-c8d1e4f7da47",
        CommentContent: "yes it is a atest comment",
        CreatedAt: new Date().toISOString(),
      };

      (mssql.connect as jest.Mock).mockResolvedValue({
        request: jest.fn().mockReturnThis(),
        input: jest.fn().mockReturnThis(),
        execute: jest.fn().mockResolvedValue({}),
      });

      await createReply(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        message: "Reply created successfully",
      });
    });

    // Add more test cases for validation, error handling, etc.
  });
});
