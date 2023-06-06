// middleware
const fetch = require('isomorphic-unfetch');

module.exports = (req, res, next, db) => {
  if (req.path.includes('/bulk/')) {
    if (req.method === 'DELETE') {
      const ids = req.query.ids.split(',');

      const path = req.path.replace('/bulk/', '/');
      ids.forEach((id) => {
        fetch(`${process.env.reactAPP_API_URL}${path}${id}`, {
          method: 'DELETE',
        });
      });
      res.status(200).json({
        message: 'success',
      });

      return;
    }
    if (req.method === 'PATCH') {
      const ids = req.query.ids.split(',');
      const data = req.body;

      const path = req.path.replace('/bulk/', '/');
      ids.forEach((id) => {
        fetch(`${process.env.reactAPP_API_URL}${path}${id}`, {
          method: 'PATCH',
          body: JSON.stringify(data),
          headers: {
            'Content-Type': 'application/json',
          },
        });
      });
      res.status(200).json({
        message: 'success',
      });

      return;
    }
  }

  if (req.method === 'PATCH' && req.path.includes('/todo/bulk/')) {
    const table = db.get('todo');
    const arr = req.query.ids.split(',');
    req.query.ids
      .split(',')
      .forEach((item) =>
        db._.updateById(table, item.id, { done: req.body.done }),
      );
    const data = table.value();
    const result = data.map((item) =>
      arr.some((id) => id === item.id)
        ? { ...item, done: req.body.done }
        : item,
    );
    res.status(200).json(result);

    return;
  }

  next();
};
