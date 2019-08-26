const multer = require('multer');
const { uploadFile } = require('../../cloud-storage/service');

const storage = multer.memoryStorage();

// Применяем настройки
const upload = multer({ storage });

const saveImageMultipart = (req, res) => {
  const fileObject = req.file;

  uploadFile(fileObject)
    .then(imagePublicLink => {
      res.json({ status: 'success', src: imagePublicLink });
    })
    .catch(error => {
      res.json({ status: 'error', error });
    })

};

// добавляем промежуточный обработчик для post-multipart запросов
module.exports = () => [upload.single('file'), saveImageMultipart];