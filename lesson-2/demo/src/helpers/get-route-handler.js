const getClearUrl = url => {
  // `/user/12345`
  const lastIndex = url.lastIndexOf('/');
  const idString = url.slice(lastIndex +1).trim();
  const idNumber = +idString;

  if (idNumber && lastIndex !== -1) {
    return url.slice(0, lastIndex);
  }

  return url;
};

const getRouteHandler = (routerConfig, url) => {
  const clearUrl = getClearUrl(url);

  return routerConfig[clearUrl];
};

module.exports = getRouteHandler;
