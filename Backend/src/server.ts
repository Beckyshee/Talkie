import express, { json } from "express";
import cors from "cors";

import { Express } from "express";
import dotenv from 'dotenv'
import { testConnection } from "./config/sqlConfig";
// import user_router from "./routes/userRoutes";
// import product_router from "./routes/productRoutes";

dotenv.config();
const port = process.env.PORT || 5200;
const app = express();
app.use(json());
app.use(cors());

// app.use("/user", user_router);
// app.use("/product", product_router);

app.listen(port, () => {
  console.log(`Talky running on port ${port}`);
  
testConnection();

});
