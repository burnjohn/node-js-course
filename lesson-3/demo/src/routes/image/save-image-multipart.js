const multer = require('multer');
const fs = require('fs');
const path = require('path');
const util = require('util');

const renameFile = util.promisify(fs.rename);

const TEMPORARY_IMAGE_FOLDER = path.join(__dirname, '../../../', 'assets');
const USER_IMAGE_FOLDER = path.join(__dirname, '../../../', 'data', 'user-images');

const storage = multer.diskStorage({
  // определяем временную папку куда сохранить изображение
  destination: (req, file, next) => {
    next(null, TEMPORARY_IMAGE_FOLDER)
  },
  // определяем имя файла
  filename: (req, file, next) => {
    next(null, file.originalname)
  }
});

// Применяем настройки
const upload = multer(storage);

const createUserFolder = (filePath) => {
  if (!fs.existsSync(filePath)){
    fs.mkdirSync(filePath);
  }
};

const moveImage = (fileObject, userId) => {
  //  cоздаем папку для файлов пользователя
  const userImageFolderName = 'user-' + userId;
  const userImagePath =  path.join(USER_IMAGE_FOLDER, userImageFolderName);

  createUserFolder(userImagePath);

  const pathToTemporaryImage = path.join(TEMPORARY_IMAGE_FOLDER, fileObject.originalname);
  const pathToRegularImage = path.join(userImagePath, fileObject.originalname);

  return renameFile(pathToTemporaryImage, pathToRegularImage)
    .then(() => {
      return userImageFolderName;
    })
    .catch((error) => console.log(error))
};

const saveImageMultipart = (req, res) => {
  // Берем файл
  const fileObject = req.file;

  // Берем другие данные что пришли
  // const userId = req.body.userId;
  const userId = '1234';

  moveImage(fileObject, userId)
    .then(userImageFolderName => {
      res.json({ status: 'was saved in folder: ' +  userImageFolderName });
    });
};

// добавляем промежуточный обработчик для post-multipart запросов
module.exports = () => [upload.single('image'), saveImageMultipart];