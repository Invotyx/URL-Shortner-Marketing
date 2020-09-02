const db = require("../models");
const config = require("../config/auth.config");
const User = db.user;
const SocialLogin = db.social_login;

const Op = db.Sequelize.Op;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");
const { validateUser } = require("../validations/auth");

exports.signin = async (req, res) => {
  // VALIDATE REQUEST BODY
  const { error } = validateUser(req.body);
  if (error)
    return res
      .status(400)
      .json({ success: false, message: error.details[0].message, data: [] });

  let social_user = await SocialLogin.findOne({
    where: {
      provider: req.body.provider,
      social_id: req.body.social_id,
    },
  });
  // IF USER IN SOCIAL LOGIN ALREADY EXISTS
  if (social_user) {
    let user = await User.findOne({
      where: {
        id: social_user.user_id,
      },
    });
    var token = jwt.sign({ id: user.id }, config.secret, {
      // expiresIn: 86400, // 24 hours
    });
    return res.status(200).json({
      success: true,
      message: "",
      data: { token },
    });
  }
  // CREATE NEW USER IF NOT EXISTS
  else {
    let user = new User({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
      phone_number: req.body.phone_number,
      first_name: req.body.first_name,
      last_name: req.body.last_name,
    });
    if (user.password) {
      const salt = await bcrypt.genSalt(10);
      user.password = bcrypt.hashSync(user.password, salt);
    }
    const transaction = await db.sequelize.transaction();

    try {
      await user.save({ transaction });
      await SocialLogin.create(
        {
          provider: req.body.provider,
          social_id: req.body.social_id,
          user_id: user.id,
        },
        { transaction }
      );
      await transaction.commit();
      const token = jwt.sign({ _id: user._id }, config.secret);
      return res.status(200).json({
        success: true,
        message: "",
        data: { token },
      });
    } catch (ex) {
      await transaction.rollback();
      return res.status(500).json({
        success: false,
        message: "Something went wrong!",
        data: {},
      });
    }
  }
};
