import express from "express";
import {
  createComment,
  getAllComments,
  createReply,
} from "../controllers/postController";

const comment_router = express.Router();
comment_router.post("/create", createComment);
comment_router.get("/comments/:PostID", getAllComments);
comment_router.post("/reply", createReply);

export default comment_router;
