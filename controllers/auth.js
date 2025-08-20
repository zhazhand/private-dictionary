//Authorization controller
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const keys = require("../config/keys");
const errorHandler = require("../utils/errorHandler");
const message = require("../utils/messages");

module.exports.login = async function (req, res) {
  const candidate = await User.findOne({ email: req.body.email });

  if (candidate) {
    const passwordResult = bcrypt.compareSync(
      req.body.password,
      candidate.password,
    );
    if (passwordResult) {
      const token = jwt.sign(
        {
          email: candidate.email,
          userId: candidate._id,
        },
        keys.jwt,
        { expiresIn: 60 * 60 },
      );

      res.status(200).json({
        //200 - ctatus ok
        token: `Bearer ${token}`,
        userId: candidate._id,
      });
    } else {
      res.status(401).json({
        //401 - ctatus unauthorized
        message: message.clientError.unauthorized,
      });
    }
  } else {
    res.status(404).json({
      message: message.clientError.notFound,
    });
  }
};

//Registration controller
module.exports.register = async function (req, res) {
  const candidate = await User.findOne({ email: req.body.email });

  if (candidate) {
    res.status(409).json({
      message: message.clientError.conflict,
    });
  } else {
    const salt = bcrypt.genSaltSync(10);
    const password = req.body.password;
    const user = new User({
      email: req.body.email,
      password: bcrypt.hashSync(password, salt),
    });

    try {
      await user.save();
      res.status(201).json(user);
    } catch (e) {
      errorHandler(res, e);
    }
  }
};
