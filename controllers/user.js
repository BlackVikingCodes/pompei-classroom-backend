const User = require('../models/User')
const jwt = require('jsonwebtoken')

const createToken = (_id) => {
  return jwt.sign({_id}, process.env.SECRET_SAUCE, { expiresIn: '3d' })
}

module.exports = {
  loginUser: async (req, res) => {
    const {email, password} = req.body
  
    try {
      const user = await User.login(email, password)
  
      // create a token
      const token = createToken(user._id)
      const Teacher = user.teacher
      const Grade = user.grade


      res.status(200).json({email, Teacher, Grade, token})
      
    } catch (error) {
      res.status(400).json({error: error.message})
    }
  },

  signupUser: async (req, res) => {
    const {email, password, teacher, grade} = req.body
  
    try {
      const user = await User.signup(email, password, teacher)
  
      // create a token
      const token = createToken(user._id)

      res.status(200).json({email, teacher, grade, token})
  
    } catch (error) {
      res.status(400).json({error: error.message})
    }
  }
}

/*

// login a user
const loginUser = async (req, res) => {
  const {email, password} = req.body

  try {
    const user = await User.login(email, password)

    // create a token
    const token = createToken(user._id)

    res.status(200).json({email, token})
  } catch (error) {
    res.status(400).json({error: error.message})
  }
}

// signup a user
const signupUser = async (req, res) => {
  const {email, password} = req.body

  try {
    const user = await User.signup(email, password)

    // create a token
    const token = createToken(user._id)

    res.status(200).json({email, token})
  } catch (error) {
    res.status(400).json({error: error.message})
  }
}

module.exports = { signupUser, loginUser }
*/