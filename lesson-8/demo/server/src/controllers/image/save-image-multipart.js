const multer  = require('multer');
const fs = require('fs');
const path = require('path');
const util = require('util');

const renameFile = util.promisify(fs.rename);

const TEMP_IMAGE_FOLDER = path.join(__dirname, '../../../', 'assets');
const USER_IMAGE_FOLDER = path.join(__dirname, '../../../', 'data', 'user-images');

const storage = multer.diskStorage({
  // определяем папку куда сохранять временное изображение
  destination: (req, file, next) => {
    next(null, TEMP_IMAGE_FOLDER)
  },
  // определяем имя файла
  filename: (req, file, next) => {
    next(null, file.originalname)
  }
});

// Применяем настройки
const upload = multer({ storage });

const moveImage = (fileObject, userId) => {
  //  cоздаем папку для файлов пользователя
  const userImageFolderName = 'user-' + userId;
  const userImagePath =  path.join(USER_IMAGE_FOLDER, userImageFolderName);

  if (!fs.existsSync(userImagePath)){
    fs.mkdirSync(userImagePath);
  }

  const tempFilePath = path.join(TEMP_IMAGE_FOLDER, fileObject.originalname);
  const newFilePath = path.join(userImagePath, fileObject.originalname);

  return renameFile(tempFilePath, newFilePath).then(() => userImageFolderName);
};

const saveImageMultipart = (req, res) => {
  // Берем файл
  const fileObject = req.file;

  // Берем другие данные что пришли
  const userId = req.body.userId;

  moveImage(fileObject, userId)
    .then(userImageFolderName => {
      res.json({ status: 'was saved in folder: ' +  userImageFolderName });
    })

};

// добавляем промежуточный обработчик для post-multipart запросов
module.exports = () => [upload.single('file'), saveImageMultipart];