const User = require('../../../models/User')

const login = async (req, res) => {
  const { username, password } = req.body
  const { method } = req

  if(method === 'POST') {
    const user = await User.findOne({ username })
    const passwordCorrect = user === null
      ? false
      : await password === user.password
  
    if (!(user && passwordCorrect)) {
      return res.status(401).json({
        error: 'invalid username or password'
      })
    }
  
    res.status(200).json({ _id: user._id, username: user.username })
    }
  }

export default login