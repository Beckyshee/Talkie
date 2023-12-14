import dotenv from "dotenv";
import mssql from "mssql";

dotenv.config();

export const sqlConfig = {
  user: process.env.DB_USER as string,
  password: process.env.DB_PWD as string,
  database: process.env.DB_NAME as string,
  server: "localhost",
  pool: {
    max: 10,
    min: 0,
    idleTimeoutMillis: 30000,
  },
  options: {
    encrypt: false, // for azure
    trustServerCertificate: true, // change to true for local dev / self-signed certs
  },
};

export async function testConnection() {
  console.log(process.env.DB_NAME);

  const pool = await mssql.connect(sqlConfig);
  //testing if db is connected
  if (pool.connected) {
    console.log("connected to database");
  } else {
    console.log("connection failed");
  }
}
