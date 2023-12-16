import Router from "express";

import { verifyToken } from "../middleware/verifyToken";
import {
  checkUserDetails,
  getAllUsers,
  getSingleUser,
  loginUser,
  registerUser,
  softDeleteUser,
} from "../controllers/userController";
import { getFollowers, getFollowings, toggleFollowUser } from "../controllers/userController";

const user_router = Router();

// user_router.get('/',verifyToken,getAllUsers)
user_router.post("/register", registerUser);
user_router.post("/login", loginUser);
user_router.get("/fetchAllUsers", getAllUsers);
user_router.get("/fetchSingleUser/:id", getSingleUser);
user_router.get("/fetchAllUsers");
user_router.put("/soft-delete/:userID", softDeleteUser);
user_router.get("/check_user_details", verifyToken, checkUserDetails);
user_router.post("/users/follow", toggleFollowUser);
user_router.get("/users/:followed_user_id/followers", getFollowers);
user_router.get("/users/:following_user_id/followings", getFollowings);


export default user_router;
