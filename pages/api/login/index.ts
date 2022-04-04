// const jwt = require('jsonwebtoken')
// const bcrypt = require('bcrypt')
const User = require('../../../models/User')

const login = async (req, res) => {
  const { username, password } = req.body
  const { method } = req

  if(method === 'POST') {
    const user = await User.findOne({ username })
    const passwordCorrect = user === null
      ? false
      : await password === user.password
      // : await bcrypt.compare(password, user.passwordHash)
  
    if (!(user && passwordCorrect)) {
      return res.status(401).json({
        error: 'invalid username or password'
      })
    }
  
    // const userForToken = {
    //   username: user.username,
    //   id: user._id,
    // }
  
    // const token = jwt.sign(userForToken, process.env.SECRET)

    res.status(200).send({ username: user.username })
    }
  }

export default login