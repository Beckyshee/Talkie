"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const verifyToken_1 = require("../middleware/verifyToken");
const userController_1 = require("../controllers/userController");
const user_router = (0, express_1.default)();
// user_router.get('/',verifyToken,getAllUsers)
user_router.post("/register", userController_1.registerUser);
user_router.post("/login", userController_1.loginUser);
user_router.get("/check_user_details", verifyToken_1.verifyToken, userController_1.checkUserDetails);
// user_router.post('/sendReview', sendReview)
// user_router.get('/allReviews', getAllReviews)
// user_router.put('/updateProfile', updateProfile)
// user_router.get('/userDetails', fecthUserDetails)
// user_router.post('/checkUserEmail', checkUserEmail);
// user_router.post('/requestPassword', initiate_password_reset)
// user_router.post('/resetPassword', resetPassword)
// user_router.get('/allUsers', getAllUsers)
// user_router.delete('/deleteUser', deleteUser)
exports.default = user_router;
