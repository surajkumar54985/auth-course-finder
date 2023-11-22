const Admin = require("../models/admin");
const Token = require("../models/token");
const Course = require("../models/courses");
const nodemailer = require("nodemailer");
var bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const auth = require("../config/jwt");
// const Mailer = require("../config/mailer");

const { sendAdminConfirmationEmail } = require("../config/mailer");
const { sendCourseConfirmationEmail } = require("../config/mailer");
const { sendConfirmationEmail } = require("../config/mailer");
const { response } = require("express");

const { Kafka } = require('kafkajs');

// Define your Kafka broker(s) - Replace with your actual broker(s) information
const kafkaBrokers = ['localhost:9092'];

// Create a Kafka instance
const kafka = new Kafka({
  clientId: 'your-producer-client',
  brokers: kafkaBrokers,
});

// Create a producer instance
const producer = kafka.producer();

// Function to initialize the producer
const initProducer = async () => {
  await producer.connect();
  console.log('Kafka producer is ready.');
};

// Function to produce messages to a Kafka topic
const produceMessage = async (topic, messages) => {
  try {
    await producer.send({
      topic,
      messages: messages.map((message) => ({ value: JSON.stringify(message) })),
    });
    console.log('Message sent to Kafka:', messages);
  } catch (error) {
    console.error('Error sending message to Kafka:', error);
  }
};

exports.addCourse = (req, res, next) => {
  console.log(req.body);
  const adminid = req.body.admin;
  // Initialize the producer
  initProducer();


  const newCourse = new Course({
    adminId: req.body.admin,
    courseName: req.body.coursename,
    pSubject: req.body.parentsub,
    cSubject: req.body.childsub,
    Provider: req.body.provider,
    College: req.body.college,
  });

  // Example: Send messages to a Kafka topic
  const topic = 'test-topic';
  const messages = [{ key: '1', value: 'Hello from Kafka producer!' , 
  Course: newCourse
}];

  // Produce messages
  produceMessage(topic, messages);

  Admin.findOne({ adminid }, (err, user) => {
    if (err) {
      console.log("error in finding user to send mail after adding course");
      return;
    }
    if (user) {
      newCourse.save().then((resp) => {
        sendCourseConfirmationEmail(req.body.coursename, user.email);
        return res
        .status(200)
        .json({ message: "New course registered successfully" });
      }).catch((error) => {
        console.log(error);
        return res.json({ message: "Error in Adding new course" });
      })
    }
  });
};

exports.fetchAdmin = (req, res, next) => {
  var hash_password = (password) => {
    let salt = bcrypt.genSaltSync(10); // enter number of rounds, default: 10
    let hash = bcrypt.hashSync(password, salt);
    return hash;
  };

  const encryptedUserPassword = hash_password(req.body.password);
  const email = req.body.email;
  Admin.findOne({ email }, (err, olduser) => {
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
      const newAdmin = new Admin({
        email: req.body.email,
        password: encryptedUserPassword,
        name: req.body.name,
        avatar: "...",
      });
      newAdmin
        .save()
        .then((data) => {
          const token = new Token({
            userId: newAdmin._id,
            token: jwt.sign(
              { user_id: newAdmin._id, email: newAdmin.email },
              process.env.TOKEN_KEY,
              {
                expiresIn: "10000000d",
              }
            ),
          })
            .save()
            .then((res) => {
              sendAdminConfirmationEmail(
                newAdmin.name,
                newAdmin.email,
                res.token
              );
            });

          // console.log(token.json());

          // const message = `${process.env.BASE_URL}/user/verify/${token.userId}/${token.token}`;
          // sendEmail(user.email, "Verify Email", message);
          // res.send("An Email sent to your account please verify");
          res
            .status(200)
            .json({ message: "New admin registered successfully", data: data });
        })
        .catch((error) => {
          console.log(error);
          res.json({ message: "Error in registering new user" });
        });
    }
  });
};

exports.verifyAdmin = function (req, res, next) {
  console.log("Check for verifyAdmin");
  Token.findOne({ token: req.params.token }, function (err, token) {
    // token is not found into database i.e. token may have expired
    if (!token) {
      return res.status(400).send({
        msg: "Your verification link may have expired. Please click on resend for verify your Email.",
      });
    }
    // if token is found then check valid user
    else {
      Admin.findOne({ _id: token.userId }, function (err, user) {
        // not valid user
        if (!user) {
          return res.status(401).send({
            msg: "We were unable to find a admin for this verification. Please SignUp!",
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

exports.resendLink = function (req, res, next) {
  Admin.findOne({ email: req.body.email }, function (err, user) {
    // user is not found into database
    if (!user) {
      return res.status(400).json({
        message:
          "We were unable to find a user with that email. Make sure your Email is correct!",
      });
    }
    // user has been already verified
    else if (user.Verified) {
      return res.status(200).json({
        message: "This account has been already verified. Please log in.",
      });
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

exports.adminLogin = (req, res, next) => {
  const email = req.body.email;
  Admin.findOne({ email }, (err, user) => {
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
      return res.status(401).json({
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
            AdminToken = user._id;
            const token = jwt.sign(
              { user_id: user._id, email: user.email },
              process.env.TOKEN_KEY,
              {
                expiresIn: "5h",
              }
            );

            // console.log(token);
            res
              .status(200)
              .json({ message: "LoggedIn Successfully", token, AdminToken });
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
