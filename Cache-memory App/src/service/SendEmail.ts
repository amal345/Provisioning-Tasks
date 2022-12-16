// const nodemailer = require('nodemailer');
import * as fs from 'fs';
import nodemailer from "nodemailer";
import Mail from 'nodemailer/lib/mailer';
export class SendEmail {

   

   static authenticate = {
        service: 'gmail',
        auth: {
            user: 'amal281217@gmail.com',
            pass: "llqewodngbrjewbc"
        },
        tls: {
            rejectUnauthorized: false
          }
    }
    static async SendMAiler(owner: string,mailbody:any){
      
        try {
            const transporter: any = await nodemailer.createTransport(this.authenticate);
          
           
             let mailOptions:Mail.Options = {
                from: this.authenticate.auth.user,
                to: owner,
                ...mailbody,
                
            }
           
   
            

            const result = await transporter.sendMail(mailOptions)
            // console.log(result);
            
            return result
        }

        catch (error: any) {
            throw error;

        }
    }
}
