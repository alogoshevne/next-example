// middleware

module.exports = (req, res, next, db) => {
  if (req.method === 'DELETE' && req.path.includes('/todo/bulk/')) {
    const result = [];
    res.status(200).json(result);

    return;
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
