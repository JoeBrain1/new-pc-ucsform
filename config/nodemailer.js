// Creating a transporter and then exporting out to any api route
// that we need
import nodemailer from 'nodemailer';

// pulling the variables in .env.local
const email = process.env.EMAIL;
const pass = process.env.EMAIL_PASS;


export const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: email,
        pass
    },
    tls: {
        rejectUnauthorized: false
    }

})


export const mailOptions = {
    from: email,
    to: email,
}


// Now that we have the transport and mailOptions 
// Lets go to the contact api and then use it.
