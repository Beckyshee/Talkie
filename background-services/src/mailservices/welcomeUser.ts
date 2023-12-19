import express from 'express'
import ejs from 'ejs'
import mssql from 'mssql'
import dotenv from 'dotenv'
import { sqlConfig } from '../config/sqlConfig'
import { sendMail } from '../helpers/emailHelpers'


dotenv.config()

export const welcomeUser = async () => {
        const pool = await mssql.connect(sqlConfig);
        const users = (await pool.request().query('SELECT * FROM Users WHERE Welcomed = 0')).recordset
        
        // console.log(users);
        for (let user of users){
            ejs.renderFile('templates/welcomeUser.ejs',{Name:user.userName},async(error,data)=>{
                let mailOptions = {
                    from:process.env.EMAIL as string,
                    to:user.email,
                    subject:"Welcome Onboard",
                    html:data
                }
                try {
                    await sendMail(mailOptions)
                    await pool.request().query('UPDATE Users SET Welcomed = 1 WHERE Welcomed  = 0')
                    console.log('Email sent to new users');
                } catch (error) {
                    console.log(error);
                    
                }
        }   )}
   
};
    