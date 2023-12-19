import express from 'express'
import ejs from 'ejs'
import mssql from 'mssql'
import dotenv from 'dotenv'
import { sqlConfig } from '../config/sqlConfig'
import { sendMail } from '../helpers/emailHelpers'


dotenv.config()

export const resetPassword = async () => {
        const pool = await mssql.connect(sqlConfig);
        const users = (await pool.request().query('SELECT * FROM Users WHERE resetToken IS NOT NULL AND emailSent = 0')).recordset
        
        // console.log(users);
        for (let user of users){
            ejs.renderFile('templates/resetPassword.ejs',{Name:user.userName,Password:user.resetToken,ExpiryTime:user.expiryTime},async(error,data)=>{
                let mailOptions = {
                    from:process.env.EMAIL as string,
                    to:user.email,
                    subject:"Password Reset",
                    html:data
                }
                try {
                    await sendMail(mailOptions)
                 
                    await pool.request()
                    .input('email',mssql.VarChar,user.email)
                    .query('UPDATE Users SET emailSent = 1 WHERE email = @email')
                    console.log('reset password email sent to user');
                } catch (error) {
                    console.log(error);
                    
                }
        }   )}
   
};
    