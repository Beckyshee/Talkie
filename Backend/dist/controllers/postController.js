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
exports.updatePost = exports.deletePost = exports.fetchOnePost = exports.fetchAllPosts = exports.createPost = void 0;
const uuid_1 = require("uuid");
const mssql_1 = __importDefault(require("mssql"));
const sqlConfig_1 = require("../config/sqlConfig");
const dbHelpers_1 = __importDefault(require("../dbHelpers/dbHelpers"));
const createPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = (0, uuid_1.v4)();
        const { PostID, content, imageUrl, createdAt } = req.body;
        yield dbHelpers_1.default.execute("createPost", {
            PostID: id,
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
        const posts = (yield pool.request().execute("fetchAllPosts"))
            .recordset;
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
        let { PostID } = req.params;
        const pool = yield mssql_1.default.connect(sqlConfig_1.sqlConfig);
        const post = (yield pool.request().input("PostID", PostID).execute("deletePost")).rowsAffected;
        if (post[0] == 1) {
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
