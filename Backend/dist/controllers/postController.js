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
exports.createReply = exports.getAllComments = exports.createComment = exports.getLikesForPost = exports.toggleLikePost = exports.updatePost = exports.deletePost = exports.fetchOnePost = exports.fetchAllPosts = exports.createPost = void 0;
const uuid_1 = require("uuid");
const mssql_1 = __importDefault(require("mssql"));
const sqlConfig_1 = require("../config/sqlConfig");
const dbHelpers_1 = __importDefault(require("../dbHelpers/dbHelpers"));
const createPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const PostID = (0, uuid_1.v4)();
        const { UserID, content, imageUrl } = req.body;
        const createdAt = new Date().toISOString();
        yield dbHelpers_1.default.execute("createPost", {
            UserID,
            PostID,
            imageUrl,
            content,
            createdAt,
        });
        return res.status(200).json({ message: "post created successfully" });
    }
    catch (error) {
        return res.json({
            error: error,
        });
    }
});
exports.createPost = createPost;
const fetchAllPosts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const pool = yield mssql_1.default.connect(sqlConfig_1.sqlConfig);
        const posts = (yield pool.request().execute("fetchAllPosts")).recordset;
        return res.status(200).json({ posts: posts });
    }
    catch (error) {
        return res.json({
            error: error,
        });
    }
});
exports.fetchAllPosts = fetchAllPosts;
const fetchOnePost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let { PostID } = req.params;
        const pool = yield mssql_1.default.connect(sqlConfig_1.sqlConfig);
        const post = (yield pool.request().input("PostID", PostID).execute("fetchOnePost")).recordset;
        // console.log(post);
        return res.json({ post: post });
    }
    catch (error) {
        return res.json({
            error: error,
        });
    }
});
exports.fetchOnePost = fetchOnePost;
const deletePost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let PostID = req.params.PostID;
        console.log(PostID);
        const pool = yield mssql_1.default.connect(sqlConfig_1.sqlConfig);
        const post = (yield pool.request().input("PostID", PostID).execute("deletePost")).rowsAffected;
        console.log(post);
        if (post[0] === 1) {
            return res.status(200).json({
                message: "Post deleted successfully",
            });
        }
        else {
            return res.status(400).json({
                error: "No post with the given ID",
            });
        }
    }
    catch (error) {
        console.log(error);
        return res.json({
            error: "Server not running",
        });
    }
});
exports.deletePost = deletePost;
const updatePost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let { PostID } = req.params;
        const { content, imageUrl, createdAt } = req.body;
        const pool = yield mssql_1.default.connect(sqlConfig_1.sqlConfig);
        const post = yield pool
            .request()
            .input("content", content)
            .input("imageUrl", imageUrl)
            .input("createdAt", createdAt)
            .input("PostID", PostID)
            .execute("updatePost");
        console.log(post);
    }
    catch (error) {
        return res.json({
            error: error,
        });
    }
});
exports.updatePost = updatePost;
//Like Unlike Logic
const toggleLikePost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { PostID } = req.body;
        const { UserID } = req.body;
        const pool = yield mssql_1.default.connect(sqlConfig_1.sqlConfig);
        const likeExists = yield pool
            .request()
            .input("PostID", PostID)
            .input("UserID", UserID)
            .execute("checkLikePost"); // Assume you have a stored procedure to check if the user has already liked the post
        console.log(PostID, UserID);
        let result;
        if (likeExists.recordset.length > 0 && likeExists.recordset[0].Liked == 1) {
            // User has already liked the post, perform unlike
            result = yield pool
                .request()
                .input("PostID", PostID)
                .input("UserID", UserID)
                .execute("unlikePost"); // Modify with your actual stored procedure
        }
        else {
            // User has not liked the post, perform like
            result = yield pool
                .request()
                .input("PostID", PostID)
                .input("UserID", UserID)
                .execute("likePost"); // Modify with your actual stored procedure
        }
        console.log(result);
        if (result.rowsAffected[0] > 0) {
            return res.status(200).json({
                message: "Toggle Like Successful",
            });
        }
        else {
            return res.status(200).json({
                message: "Error",
            });
        }
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            error: error,
        });
    }
});
exports.toggleLikePost = toggleLikePost;
const getLikesForPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { PostID } = req.params; // Assuming PostID is part of the route parameters
        const pool = yield mssql_1.default.connect(sqlConfig_1.sqlConfig);
        const result = yield pool
            .request()
            .input("PostID", PostID)
            .execute("getLikesForPost");
        const likes = result.recordset.map((row) => row.UserID);
        return res.status(200).json({
            likes: likes,
        });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({
            error: error,
        });
    }
});
exports.getLikesForPost = getLikesForPost;
// Controller for creating a new comment
const createComment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const CommentID = (0, uuid_1.v4)();
        const { PostID, UserID, CommentRepliedToID, CommentContent } = req.body;
        const CreatedAt = new Date().toISOString();
        const pool = yield mssql_1.default.connect(sqlConfig_1.sqlConfig);
        const result = yield pool
            .request()
            .input("CommentID", CommentID)
            .input("PostID", PostID)
            .input("UserID", UserID)
            .input("CommentRepliedToID", CommentRepliedToID)
            .input("CommentContent", CommentContent)
            .input("CreatedAt", CreatedAt)
            .execute("createComment");
        console.log(result);
        return res.status(200).json({
            message: "Comment created successfully",
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            error: error,
        });
    }
});
exports.createComment = createComment;
// Controller for fetching all comments for a post
const getAllComments = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { PostID } = req.params;
        const pool = yield mssql_1.default.connect(sqlConfig_1.sqlConfig);
        const comments = (yield pool
            .request()
            .input("PostID", PostID)
            .execute("getAllComments")).recordset;
        return res.status(200).json({
            comments,
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            error: error,
        });
    }
});
exports.getAllComments = getAllComments;
// Controller for creating a reply to a comment
const createReply = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const CommentID = (0, uuid_1.v4)();
        const { PostID, UserID, CommentRepliedToID, CommentContent } = req.body;
        const CreatedAt = new Date().toISOString();
        const pool = yield mssql_1.default.connect(sqlConfig_1.sqlConfig);
        const result = yield pool
            .request()
            .input("CommentID", CommentID)
            .input("PostID", PostID)
            .input("UserID", UserID)
            .input("CommentRepliedToID", CommentRepliedToID)
            .input("CommentContent", CommentContent)
            .input("CreatedAt", CreatedAt)
            .execute("createReply");
        console.log(result);
        return res.status(200).json({
            message: "Reply created successfully",
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            error: error,
        });
    }
});
exports.createReply = createReply;
