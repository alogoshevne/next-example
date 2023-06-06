// middleware
const { me } = require('../db.json');

module.exports = (req, res, next) => {
  if (req.method === 'POST' && req.path.includes('/auth/signin')) {
    if (
      req.body.username === 'login@email.com' &&
      req.body.password === 'password'
    ) {
      res.status(200).json(me);
    } else {
      res.status(400).json({ 'FINAL_FORM/form-error': 'wrong credentials' });
    }

    return;
  }

  next();
};
