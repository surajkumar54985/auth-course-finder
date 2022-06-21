const User = require("../models/user");
var bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const auth = require('../config/jwt');

// var data = {
//   email: "suraj1234@gmail.com",
//   password: "12345",
//   name: "Suraj Kumar",
//   avatar: "...",
// };

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
      return res.status(409).send("User Already Exist. Please Login");
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
          res
            .status(200)
            .json({ message: "New user registered successfully", data: data });
        })
        .catch((error) => {
          console.log(error);
        });
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
      return res.status(409).send("Username does not exist");
    }
    if (user) {
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
            return res.send("Password is not correct");
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
            res.status(200).json({message: 'token created',token});
          }
        }
      );
    }
  });
};


exports.DashBoard = ((req,res) => {
  // console.log(req.body,'suraj');
  res.status(200).json({message: 'dashboard ok!'});
});