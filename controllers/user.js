const User = require("../models/user");
const Token = require("../models/token");
const Course = require("../models/courses");
const nodemailer = require("nodemailer");
var bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const auth = require("../config/jwt");
// const Mailer = require("../config/mailer");

const { sendUserConfirmationEmail } = require("../config/mailer");
const { sendConfirmationEmail } = require("../config/mailer");
const { response } = require("express");

// var data = {
//   email: "suraj1234@gmail.com",
//   password: "12345",
//   name: "Suraj Kumar",
//   avatar: "...",
// };

exports.courses = async (req,res,next) => {
  try{
    const course = await Course.find();
    res.status(200).json(course);
  }
  catch(err) {
    res.status(500).json({message: err.message});
  }
}

exports.fetchUser = (req, res, next) => {
  var hash_password = (password) => {
    let salt = bcrypt.genSaltSync(10); // enter number of rounds, default: 10
    let hash = bcrypt.hashSync(password, salt);
    return hash;
  };

  const encryptedUserPassword = hash_password(req.body.password);
  const email = req.body.email;
  User.findOne({ email }, (err, olduser) => {
    if (err) {
      console.log("error in finding user while signing up");
      return;
    }
    if (olduser) {
      console.log("User Already Exist. Please Login");
      return res
        .status(409)
        .json({ message: "User Already Exist. Please Login" });
    } else if (!olduser) {
      const newUser = new User({
        email: req.body.email,
        password: encryptedUserPassword,
        name: req.body.name,
        avatar: "...",
      });
      newUser
        .save()
        .then((data) => {
          const token = new Token({
            userId: newUser._id,
            token: jwt.sign(
              { user_id: newUser._id, email: newUser.email },
              process.env.TOKEN_KEY,
              {
                expiresIn: "10000000d",
              }
            ),
          })
            .save()
            .then((res) => {

              sendUserConfirmationEmail(newUser.name, newUser.email, res.token);
            });

          // console.log(token.json());

          // const message = `${process.env.BASE_URL}/user/verify/${token.userId}/${token.token}`;
          // sendEmail(user.email, "Verify Email", message);
          // res.send("An Email sent to your account please verify");
          res
            .status(200)
            .json({ message: "New user registered successfully", data: data });
        })
        .catch((error) => {
          console.log(error);
          res.json({ message: "Error in registering new user" });
        });
    }
  });
};



exports.verifyUser = function (req, res, next) {
  Token.findOne({ token: req.params.token }, function (err, token) {
    // token is not found into database i.e. token may have expired
    if (!token) {
      return res
        .status(400)
        .send({
          msg: "Your verification link may have expired. Please click on resend for verify your Email.",
        });
    }
    // if token is found then check valid user
    else {
      User.findOne({ _id: token.userId }, function (err, user) {
        // not valid user
        if (!user) {
          return res
            .status(401)
            .send({
              msg: "We were unable to find a user for this verification. Please SignUp!",
            });
        }
        // user is already verified
        else if (user.verified) {
          return res
            .status(200)
            .send("User has been already verified. Please Login");
        }
        // verify user
        else {
          // change isVerified to true
          user.verified = true;
          user.save(function (err) {
            // error occur
            if (err) {
              return res.status(500).send({ msg: err.message });
            }
            // account successfully verified
            else {
              return res
                .status(200)
                .send("Your account has been successfully verified");
            }
          });
        }
      });
    }
  });
};

// exports.confirmEmail = function (req, res, next) {
//   Token.findOne({ token: req.params.token }, function (err, token) {
//       // token is not found into database i.e. token may have expired
//       if (!token){
//           return res.status(400).send({msg:'Your verification link may have expired. Please click on resend for verify your Email.'});
//       }
//       // if token is found then check valid user
//       else{
//           User.findOne({ _id: token._userId, email: req.params.email }, function (err, user) {
//               // not valid user
//               if (!user){
//                   return res.status(401).send({msg:'We were unable to find a user for this verification. Please SignUp!'});
//               }
//               // user is already verified
//               else if (user.isVerified){
//                   return res.status(200).send('User has been already verified. Please Login');
//               }
//               // verify user
//               else{
//                   // change isVerified to true
//                   user.isVerified = true;
//                   user.save(function (err) {
//                       // error occur
//                       if(err){
//                           return res.status(500).send({msg: err.message});
//                       }
//                       // account successfully verified
//                       else{
//                         return res.status(200).send('Your account has been successfully verified');
//                       }
//                   });
//               }
//           });
//       }

//   });
// };

exports.resendLink = function (req, res, next) {
  User.findOne({ email: req.body.email }, function (err, user) {
    // user is not found into database
    if (!user) {
      return res
        .status(400)
        .json({
          message: "We were unable to find a user with that email. Make sure your Email is correct!",
        });
    }
    // user has been already verified
    else if (user.Verified) {
      return res
        .status(200)
        .json({message:"This account has been already verified. Please log in."});
    }
    // send verification link
    else {
      // generate token and save
      const token = new Token({
        userId: user._id,
        token: jwt.sign(
          { user_id: user._id, email: user.email },
          process.env.TOKEN_KEY,
          {
            expiresIn: "10000000d",
          }
        ),
      })
        .save()
        .then((res) => {

          sendConfirmationEmail(user.name, user.email, res.token);
        });

      // Send email (use verified sender's email address & generated API_KEY on SendGrid)

      return res
        .status(200)
        .send(
          "A verification email has been sent to " +
            user.email +
            ". It will be expire after one day. If you not get verification Email click on resend token."
        );
    }
  });
};

exports.Login = (req, res, next) => {
  const email = req.body.email;
  User.findOne({ email }, (err, user) => {
    if (err) {
      console.log("error in finding username while Logging In");
      return;
    }
    if (!user) {
      console.log("Username does not exist");
      return res.status(409).json({ message: "Incorrect Username" });
    }
    if (!user.verified) {
      console.log("Account is not verified! Please verify your account...");
      return res
        .status(401)
        .json({
          message: "Account is not verified! Please verify your account...",
        });
    }
    if (user.verified) {
      const validPassword = bcrypt.compare(
        req.body.password,
        user.password,
        (err, resp) => {
          if (err) {
            console.log("error in comparing encrypted password");
            return res.send("error in comparing encrypted password");
          }
          if (!resp) {
            console.log("Wrong Password");
            return res.json({ message: "Invalid Password" });
          } else if (resp) {
            // console.log("password matched");
            const token = jwt.sign(
              { user_id: user._id, email: user.email },
              process.env.TOKEN_KEY,
              {
                expiresIn: "5h",
              }
            );

            // console.log(token);
            res.status(200).json({ message: "LoggedIn Successfully", token });
          }
        }
      );
    }
  });
};

exports.DashBoard = (req, res) => {
  // console.log(req.body,'suraj');
  res.status(200).json({ message: "Welcome" });
};
