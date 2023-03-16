const User = require("../models/userModel");
const jwt = require('jsonwebtoken');

exports.login = async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({ username, password });
    if (user) {
      // Kullanıcı doğrulandı, token oluştur ve yanıtla
      const token = jwt.sign({ username, role: user.role }, 'secret_key');
      return res.status(201).json({ token });
    } else {
      // Kullanıcı adı veya şifre yanlış
      return res.status(401).json({ message: 'Kullanıcı adı veya şifre yanlış.' });
    }
  }