// fs.readdir - для получения информации о папке https://nodejs.org/api/fs.html#fs_fs_readdir_path_options_callback
// fs.mkdir - для создания папки https://nodejs.org/api/fs.html#fs_fs_mkdir_path_options_callback
// fs.stat - для получения информации о файле/папке https://nodejs.org/docs/latest/api/fs.html#fs_fs_stat_path_options_callback

const fs = require('fs');

const files = fs.readdirSync(__dirname);

const fileData = fs.statSync(files[0]);

console.log(fileData.size);