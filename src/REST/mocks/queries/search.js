module.exports = (data, search, query) => {
  const searchBy = query.search_by.split(',');

  // find in data by search_by fields and search value
  return data.filter((item) => {
    return searchBy.some((field) => {
      return item[field].toLowerCase().includes(search.toLowerCase());
    });
  });
};
