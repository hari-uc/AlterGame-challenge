require("dotenv").config();
const DB = require("../../models");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const jwtSecret = require("../../config/jwtsecret");

const salt_rounds = process.env.SALT_ROUNDS || 10;

const { User } = DB;

/**
 *
 * @param {userName,email,password} req
 * @param {boolean} res
 */

exports.signUp = async (req, res) => {
    
  const { userName, email, password } = req.body;

  try {
    
 

  if (!userName || !email || !password) {
    return res.status(400).json({
      message: "Please fill all fields",
    });
  }
    const hashPassword =   bcrypt.hashSync(password, salt_rounds);
    
    const data = {
        userName,
        email,
        password: hashPassword,
    };

// check if user already exists
const user = await User.findOne({ where: { email: email , is_active:true} });
if (user) {
    return res.status(400).json({
        message: "User already exists",
    });
}


  const newUser = await User
    .create(data)
    .catch((err) => {
      res.status(500).json({
        message: err.message || "Some error occurred while creating the User.",
      });
    });

  const token = jwt.sign({ id: newUser.id }, jwtSecret.secret, {
    expiresIn: 86400, // 24 hr
  });
  res.status(200).json({ status:true, message: "user created successfully", token:token });
} catch (err) {
  res.status(500).json({
    message: err.message || "Some error occurred while creating the User.",
  });

    
}
};


/**
 * 
 * @param {email,password} req 
 * @param {Boolean} res 
 */

exports.signIn = async (req, res) => {
    const { email, password } = req.body;

    try {
      

    if (!email || !password) {
        return res.status(400).json({
        message: "Please fill all fields",
        });
    }
    const userFound = await User.findOne({ where: { email: email, is_active:true } });
    if (!userFound) {
        return res.status(400).json({
        message: "User not found",
        });
    }
    const passwordIsValid = bcrypt.compareSync(password, userFound.password);
    if (!passwordIsValid) {
        return res.status(401).json({
        token: null,
        message: "Invalid Password!",
        });
    }

    const token = jwt.sign({ id: userFound.id }, jwtSecret.secret, {
        expiresIn: 86400, // 24 hr
    });
    res.status(200).json({ status:true, message: "user logged in successfully", token:token });
  } catch (error) {
    res.status(500).json({
      message: error.message || "Some error occurred while logging in the User.",
    });
      
  }
    }
