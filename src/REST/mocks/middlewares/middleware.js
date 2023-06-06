// middleware
const excluded = require('../excluded_query_keys.json');
const filter = require('../queries/filter.js');
const baseurl = process.env.reactAPP_API_URL;
const normalizedPath = require('path').join(__dirname, '../queries');
const queryFiles = require('fs').readdirSync(normalizedPath);
const fns = {};

queryFiles.forEach((queryFile) => {
  const key = queryFile.split('.')[0];
  if (key !== 'filter') fns[key] = require(`../queries/${queryFile}`);
});

const withQuery = (data, query) => {
  Object.keys(query).forEach((key) => {
    if (fns[key]) {
      data = fns[key](data, query[key], query);
    }
    if (!excluded.includes(key)) {
      data = filter(data, key, query[key]);
    }
  });

  return data;
};

const createPrevUrl = (req, page, page_size) => {
  if (page === 1) return null;
  delete req.query.search_by;
  const query = {
    ...req.query,
    page,
    page_size,
  };
  const urlParams = new URLSearchParams();
  Object.entries(query).forEach(([key, value]) => {
    if (key === 'page' && page > 1) {
      urlParams.set('page', `${page - 1}`);
    } else {
      urlParams.set(key, value);
    }
  });

  return `${baseurl}${req.path}?${urlParams.toString()}`;
};

const createNextUrl = (req, page, page_size, maxPages) => {
  if (page >= maxPages) return null;
  delete req.query.search_by;
  const query = {
    ...req.query,
    page,
    page_size,
  };
  const urlParams = new URLSearchParams();
  Object.entries(query).forEach(([key, value]) => {
    if (key === 'page' && page < maxPages) {
      urlParams.set('page', `${page + 1}`);
    } else {
      urlParams.set(key, value);
    }
  });

  return `${baseurl}${req.path}?${urlParams.toString()}`;
};

const withPagination = ({ req, db, page_size = 10 }) => {
  const queryLimit = req.query.page_size || page_size;
  const path = req.path.split('/');
  const table = db.get(path[1]);
  const tableData = table.value();

  const data = withQuery(tableData, req.query);

  if (req.query.all === '' || !Array.isArray(data)) {
    return data;
  }

  const page = Number(req.query.page) || 1;

  const results = data.slice((page - 1) * queryLimit, page * queryLimit);
  let maxPages = Math.floor(data.length / queryLimit);

  if (maxPages < data.length / queryLimit) {
    maxPages++;
  }

  const next = createNextUrl(req, page, queryLimit, maxPages);
  const previous = createPrevUrl(req, page, queryLimit);

  return { count: data?.length, previous, next, results };
};

module.exports = (req, res, next, db) => {
  if (req.method === 'GET') {
    const results = withPagination({ req, db });
    res.status(200).json(results);

    return;
  }

  next();
};
