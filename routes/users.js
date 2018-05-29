const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../config/keys");
const passport = require("passport");

// Load User model
const User = require("../models/User");

module.exports = (app, server) => {
  // @route   POST api/users/register
  // @desc    Register user
  // @access  Public
  server.post("/register", (req, res) => {
    let errors;
    User.findOne({ email: req.body.email }).then(user => {
      if (user) {
        return res.status(400).json(errors);
      } else {
        const newUser = new User({
          name: req.body.name,
          email: req.body.email,
          password: req.body.password
        });

        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            newUser
              .save()
              .then(user => app.render(req, res, "/register", user))
              .catch(err => console.log(err));
          });
        });
      }
    });
  });

  // @route   GET api/users/login
  // @desc    Login User / Returning JWT Token
  // @access  Public
  server.post("/login", (req, res) => {
    console.log("post here");
    const email = req.body.email;
    const password = req.body.password;
    // Find user by email
    const userData = new User({
      email: req.body.email,
      password: req.body.password,
      name: req.body.name
    });

    User.findOne({ email }).then(user => {
      // Check for user
      if (!user) {
        errors.email = "User not found";
        return res.status(404).json(errors);
      }

      // Check Password
      bcrypt.compare(password, user.password).then(isMatch => {
        if (isMatch) {
          // User Matched
          const payload = { id: user.id, name: user.name }; // Create JWT Payload

          // Sign Token
          jwt.sign(
            payload,
            keys.secretOrKey,
            { expiresIn: 3600 },
            (err, token) => {
              app.render(req, res, "/login", {
                success: true,
                token: "Bearer " + token
              });
            }
          );
        } else {
          errors.password = "Password incorrect";
          return res.status(400).json(errors);
        }
      });
    });
  });
};
