// fs.readFile - для чтения файлов https://nodejs.org/api/fs.html#fs_fs_readfile_path_options_callback
// fs.writeFile - для записи файлов https://nodejs.org/api/fs.html#fs_fs_writefile_file_data_options_callback
// fs.unlink - для удаления файла/папке https://nodejs.org/api/fs.html#fs_fs_unlink_path_callback
// fs.rename - для перемещения файла https://nodejs.org/docs/latest/api/fs.html#fs_fs_rename_oldpath_newpath_callback

const fs = require('fs');

const productsToAdd = [
  {
    "id": 19112836,
    "sku": 1120002,
    "name": "Крем-суп из тыквы",
    "description": "Портрет этой оранжевой похлебки украшает обложку книги «La Cuisine du Marché» Поля Бокюза. Бокюз, придумавший так называемую новую кухню, считал тыкву одной из основ этого миропорядка, а тыквенный суп — эдакой околоплодной водой гастрономии",
    "price": "80",
    "currency": "UAN",
    "creatorId": 1,
    "categories": ["soup"]
  },
  {
    "id": 19112837,
    "sku": 1120002,
    "name": "Томатный магрибский суп",
    "description": "Томатный магрибский суп особенно распространен в Марокко и Тунисе. Он весьма прост в приготовлении и сам по себе легкий — в основе томаты и куриный бульон. Кроме них в супе только необходимые специи, мед и лимон, которые все вместе и передают тот самый восточный колорит. Вкус супа всецело зависит от качества томатов",
    "price": "100",
    "currency": "UAN",
    "creatorId": 1,
    "categories": ["soup"]
  }
];

const productsPath = 'local-database/input-products.json';
const newProductsPath = 'local-database-new/output-products.json';

// fs.readFile(productsPath, 'utf8', (err, data) => {
//   const products = JSON.parse(data);
//
//   const newProducts = [...products, ...productsToAdd];
//
//   fs.writeFile(newProductsPath, JSON.stringify(newProducts), (err) => {
//     console.log('done');
//   })
//
// });

fs.rename(productsPath, newProductsPath, () => {
  console.log('done');
});