import { Router } from "express";
import {
  
  getFollowers,
  getFollowings,
  toggleFollowUser,
  
} from "../controllers/postController";

const follow_router = Router();


