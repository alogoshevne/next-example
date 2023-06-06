// middleware
const { profile, users_team, poolsLevels } = require('./db.json');
const baseurl = 'http://localhost:3001';

const withPagination = ({ req, db, limit = 10, dbTable }) => {
  const queryLimit = req.query.limit || limit;

  const path = req.path.split('/');
  const table = db.get(dbTable || path[1]);

  const data = table.value();
  const page = Number(req.query.page) || 1;
  const query = {
    ...req.query,
    page,
    limit: queryLimit,
  };
  const results = data.slice((page - 1) * queryLimit, page * queryLimit);
  let maxPages = Math.floor(data.length / queryLimit);
  if (maxPages < data.length / queryLimit) {
    maxPages++;
  }
  const nextUrlParams = new URLSearchParams();
  Object.entries(query).forEach(([key, value]) => {
    if (key === 'page' && page < maxPages) {
      nextUrlParams.set('page', `${page + 1}`);
    } else {
      nextUrlParams.set(key, value);
    }
  });
  const prevUrlParams = new URLSearchParams();
  Object.entries(query).forEach(([key, value]) => {
    if (key === 'page' && page > 1) {
      prevUrlParams.set('page', `${page - 1}`);
    } else {
      prevUrlParams.set(key, value);
    }
  });
  const previous =
    page === 1
      ? null
      : `${baseurl}/${
          dbTable ? req.path.substring(1, req.path.length - 1) : path[1]
        }/?${prevUrlParams.toString()}`;
  const next =
    maxPages > page
      ? `${baseurl}/${
          dbTable ? req.path.substring(1, req.path.length - 1) : path[1]
        }/?${nextUrlParams.toString()}`
      : null;

  return { count: data?.length, previous, next, results };
};

module.exports = (req, res, next, db) => {
  if (
    req.method === 'GET' &&
    req.path.split('/')[1] === 'news' &&
    req.path.split('/')[3] === 'read'
  ) {
    const table = db.get('news');
    const data = table.value();
    const slug = req.path.split('/')[2];
    const results = data.map((news) =>
      news.slug === slug ? { ...news, is_read: true } : news,
    );

    res.status(200).json(results);

    return;
  }

  if (req.method === 'POST' && req.path.includes('/login')) {
    if (req.body.username === 'login' && req.body.password === 'password') {
      res.status(200).json(profile);
    } else {
      res.status(400).json({ 'FINAL_FORM/form-error': 'wrong credentials' });
    }

    return;
  }

  if (req.method === 'GET' && req.path.includes('/users/team/')) {
    res.status(200).json(users_team);

    return;
  }

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

  if (req.method === 'GET' && req.path === '/products/') {
    const table = db.get('products');
    const data = table.value();
    res.status(200).json(data);

    return;
  }

  if (req.method === 'GET' && req.path.includes('/pools-levels/')) {
    res.status(200).json(poolsLevels);

    return;
  }

  if (req.method === 'GET' && req.path.includes('/dashboard/topCountries')) {
    const { type } = req.query;
    const query = !type || type === 'franchisees' ? 'franchisees' : 'merchants';
    const table = db.get(query);
    const data = table.value();
    res.status(200).json(data);

    return;
  }

  if (req.method === 'GET' && req.path.includes('/users/me')) {
    const table = db.get('me');
    const data = table.value();
    res.status(200).json(data);

    return;
  }

  if (req.method === 'GET' && req.path.includes('/pools/years')) {
    const table = db.get('poolYears');
    const data = table.value();
    res.status(200).json(data);

    return;
  }

  if (req.method === 'GET' && req.path === '/pools/yearStats/') {
    const { year } = req.query;
    let query = '';
    switch (year) {
      case '2022':
        query = 'poolsYearStats';
        break;
      case '2021':
        query = 'poolsYearStats2021';
        break;
      case '2020':
        query = 'poolsYearStats2020';
        break;
      case '2019':
        query = 'poolsYearStats2019';
        break;
      default:
        break;
    }
    const table = db.get(query);
    const data = table.value();
    res.status(200).json(data);

    return;
  }

  if (req.method === 'GET' && req.path === '/pools/') {
    const { year } = req.query;
    let query = '';
    switch (year) {
      case '2022':
        query = 'pools';
        break;
      case '2021':
        query = 'pools2021';
        break;
      case '2020':
        query = 'pools2020';
        break;
      case '2019':
        query = 'pools2019';
        break;
      default:
        break;
    }
    const table = db.get(query);
    const data = table.value();
    res.status(200).json(data);

    return;
  }

  if (req.method === 'GET' && req.path === '/dashboard/recentActivity/') {
    const { type } = req.query;
    const query =
      !type || type === 'newsAndMedia' ? 'newsAndMedia' : 'activityFeed';
    const response = withPagination({ req, db, dbTable: query });
    res.status(200).json(response);

    return;
  }

  if (req.method === 'GET' && req.path.includes('/dashboard/salesStats')) {
    const { type } = req.query;
    let query = '';
    switch (type) {
      case 'dailyWorkflowStats':
        query = 'dailyWorkflowStats';
        break;
      case 'weeklyWorkflowStats':
        query = 'weeklyWorkflowStats';
        break;
      case 'monthlyWorkflowStats':
        query = 'monthlyWorkflowStats';
        break;
      default:
        break;
    }
    const table = db.get(query);
    const data = table.value();
    res.status(200).json(data);

    return;
  }

  //must be on bottom
  if (req.method === 'GET' && req.path.split('/')[2] === '') {
    const results = withPagination({ req, db });
    res.status(200).json(results);

    return;
  }

  next();
};
