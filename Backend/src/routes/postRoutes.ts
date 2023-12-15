import { Router } from "express";
import { createPost, deletePost, fetchAllPosts, fetchOnePost, getFollowers, getFollowings, getLikesForPost, toggleFollowUser, toggleLikePost, updatePost } from "../controllers/postController";


const post_router = Router();




post_router.post("/posts", createPost);
post_router.get("/fetchAllPosts", fetchAllPosts);
post_router.get("/posts/:PostID", fetchOnePost);
post_router.delete("/posts/:PostID", deletePost);
post_router.put("/posts/:PostID", updatePost);
post_router.post("/posts/:PostID/like", toggleLikePost);
post_router.get("/posts/:PostID/likes", getLikesForPost);


export default post_router;


