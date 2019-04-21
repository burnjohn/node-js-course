// path.join - соединяет все строки с путями в 1 строку  https://nodejs.org/dist/latest-v10.x/docs/api/path.html#path_path_join_paths
// path.parse - парсит строку адреса в обьект https://nodejs.org/dist/latest-v10.x/docs/api/path.html#path_path_parse_path
// path.format - превращает обьект с параметрами в строку адреса  https://nodejs.org/dist/latest-v10.x/docs/api/path.html#path_path_format_pathobject

const path = require('path');

const newDirectoryName = 'local-database';

const productsPath = path.join(__dirname, '..', 'fs-module', newDirectoryName,'output-products.json');

const newProductsPath = path.format({
  root: '/',
  dir: __dirname,
  ext: '.txt',
  name: Date.now()
});

console.log(newProductsPath);