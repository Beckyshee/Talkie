import Router from "express";

import { verifyToken } from "../middleware/verifyToken";
import {
  checkUserDetails,
  loginUser,
  registerUser,
} from "../controllers/userController";

const user_router = Router();

// user_router.get('/',verifyToken,getAllUsers)
user_router.post("/register", registerUser);
user_router.post("/login", loginUser);
user_router.get("/check_user_details", verifyToken, checkUserDetails);
// user_router.post('/sendReview', sendReview)
// user_router.get('/allReviews', getAllReviews)
// user_router.put('/updateProfile', updateProfile)
// user_router.get('/userDetails', fecthUserDetails)
// user_router.post('/checkUserEmail', checkUserEmail);
// user_router.post('/requestPassword', initiate_password_reset)
// user_router.post('/resetPassword', resetPassword)
// user_router.get('/allUsers', getAllUsers)
// user_router.delete('/deleteUser', deleteUser)

export default user_router;
