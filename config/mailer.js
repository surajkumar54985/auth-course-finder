const nodemailer = require("nodemailer");
const { google } = require("googleapis");
const OAuth2 = google.auth.OAuth2;
const dotenv = require("dotenv");

dotenv.config();

const user = process.env.MAILER_USER;
const pass = process.env.MAILER_PASS;
const CLIENT_ID = process.env.MAILER_PASS;
const CLIENT_SECERET = process.env.MAILER_SECRET;
const REFRESH_TOKEN = process.env.SURAJ;


// const MAILER_SECRET= "bezkoder-secret-key";
// const user= "surajkumar54985@gmail.com";
// const pass= "Suraj@8209";
// const CLIENT_ID = "745465324530-u6ks0nkdh800ok7hdj0aln34qa85frfp.apps.googleusercontent.com";
// const CLIENT_SECERET = "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";
// const REFRESH_TOKEN = "1//04xI2YBBsyGVmCgYIARAAGAQSNwF-L9Ir_vMGZGdt0bLJGPug4UROIDbhaT20iRvyLkzlqYi-5tlc0gmUtF0TWr69UmvXHDDaGDw";

// const accessToken = oauth2Client.getAccessToken().then((token=>{return token})).catch((error)=>console.log(error));

// const accessToken = new Promise((resolve, reject) => {
//   oauth2Client.getAccessToken((err, token) => {
//     if (err) console.log(err); // Handling the errors
//     else resolve(token);
//   });
//   return;
// });

module.exports.sendConfirmationEmail = async (
  name,
  email,
  confirmationCode
) => {
  try {
    
    const oauth2Client = new OAuth2(
      CLIENT_ID, // ClientID
      CLIENT_SECERET, // Client Secret
      "https://developers.google.com/oauthplayground" // Redirect URL
    );

    oauth2Client.setCredentials({
      refresh_token: REFRESH_TOKEN,
    });


    const accessToken = await oauth2Client.getAccessToken();
    

    const transport = nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: user,
        clientId: CLIENT_ID,
        clientSecret: CLIENT_SECERET,
        refreshToken: REFRESH_TOKEN,
        accessToken: accessToken,
      },
      tls: {
        rejectUnauthorized: false,
      },
    });
    

    const mailOption = {
      from: user,
      to: email,
      subject: "Please confirm your account",
      html: `<h1>Email Confirmation</h1>
                      <h2>Hello ${name}</h2>
                      <p>Thank you for subscribing. Please confirm your email by clicking on the following link</p>
                      <a href=https://selector-course.herokuapp.com/verify/${email}/${confirmationCode}> Click here</a>
                      </div>`,
    };
    

    transport.sendMail(mailOption, (err, res) => {
      err ? console.log(err) : console.log(res);
      transport.close();
    });

    

  } catch (error) {
    console.log(error);
  }
};
