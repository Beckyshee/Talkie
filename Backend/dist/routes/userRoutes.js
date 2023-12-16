"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const verifyToken_1 = require("../middleware/verifyToken");
const userController_1 = require("../controllers/userController");
const userController_2 = require("../controllers/userController");
const user_router = (0, express_1.default)();
// user_router.get('/',verifyToken,getAllUsers)
user_router.post("/register", userController_1.registerUser);
user_router.post("/login", userController_1.loginUser);
user_router.get("/fetchAllUsers", userController_1.getAllUsers);
user_router.get("/fetchSingleUser/:id", userController_1.getSingleUser);
user_router.get("/fetchAllUsers");
user_router.put("/soft-delete/:userID", userController_1.softDeleteUser);
user_router.get("/check_user_details", verifyToken_1.verifyToken, userController_1.checkUserDetails);
user_router.post("/users/follow", userController_2.toggleFollowUser);
user_router.get("/users/:followed_user_id/followers", userController_2.getFollowers);
user_router.get("/users/:following_user_id/followings", userController_2.getFollowings);
exports.default = user_router;
