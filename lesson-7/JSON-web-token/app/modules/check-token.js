const app = require('./app');
const jwt = require('jsonwebtoken');

// POST { token: <token>}

// GET ?token=<token>

// header { x-access-token: <token> }

const getToken = req => req.body.token || req.query.token || req.headers['x-access-token'];

const checkToken = (req, res, next) => {
  const token = getToken(req);
  const secretKey = app.get('superSecret');

  if (!token) {
    return res.status(403).send({
      success: false,
      message: 'No token provided.'
    });
  }


  jwt.verify(token, secretKey, (err, decoded)  => {
    if (err) {
      return res.json({
        success: false,
        message: 'Failed to authenticate token.'
      });
    }

    req.decoded = decoded;
    next();
  });
};

module.exports = checkToken;