module.exports = (data, key) => {
  return data.sort((a, b) => {
    return key.charAt(0) === '-'
      ? b[key.substring(1)] > a[key.substring(1)]
        ? 1
        : -1
      : a[key] > b[key]
      ? 1
      : -1;
  });
};
