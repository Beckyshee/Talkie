"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const postController_1 = require("../controllers/postController");
const comment_router = express_1.default.Router();
comment_router.post("/create", postController_1.createComment);
comment_router.get("/comments/:PostID", postController_1.getAllComments);
comment_router.post("/reply", postController_1.createReply);
exports.default = comment_router;
