"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const postController_1 = require("../controllers/postController");
const post_router = (0, express_1.Router)();
post_router.post("/posts", postController_1.createPost);
post_router.get("/fetchAllPosts", postController_1.fetchAllPosts);
post_router.get("/posts/:PostID", postController_1.fetchOnePost);
post_router.delete("/posts/:PostID", postController_1.deletePost);
post_router.put("/posts/:PostID", postController_1.updatePost);
post_router.post("/posts/:PostID/like", postController_1.toggleLikePost);
post_router.get("/posts/:PostID/likes", postController_1.getLikesForPost);
exports.default = post_router;
