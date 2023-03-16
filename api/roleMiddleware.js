const jwt = require('jsonwebtoken');
module.exports = (roles) => {
    return (req, res, next) => {
        const token = req.headers.authorization;
        try {
          jwt.verify(token, 'secret_key', (err, decoded) => {
            if (err) {
              return res.status(401).json({ message: 'Geçersiz kimlik doğrulama bilgileri.' });
            } else {
              if (roles.includes(decoded.role)) {
                // Yetkili kullanıcı, isteği işle ve yanıtla
                next()
              } else {
                // Yetkisiz kullanıcı
                return res.status(403).json({ message: 'Bu kaynağa erişim izniniz yok.' });
              }
            }
          });
        } catch (err) {
          // Geçersiz token
          return res.status(401).json({ message: 'Geçersiz kimlik doğrulama bilgileri.' });
        }
      }
}