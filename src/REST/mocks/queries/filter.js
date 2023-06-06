module.exports = (data, key, value) => {
  return data.filter((item) => {
    if (Array.isArray(item[key])) {
      if (Array.isArray(value)) {
        if (typeof item[key][0] === 'object' && !Array.isArray(item[key][0])) {
          return value.every((val) =>
            item[key].some((item) => String(item.id) === String(val)),
          );
        }

        return value.every((val) =>
          item[key].map((item) => String(item)).includes(val),
        );
      }

      if (typeof item[key][0] === 'object' && !Array.isArray(item[key][0])) {
        return item[key].some((item) => String(item.id) === String(value));
      }

      return item[key].map((item) => String(item)).includes(value);
    }

    return String(item[key]) === value;
  });
};
