const { bucketName } = require('./config');
const bucket = require('./index');

const getPublicUrl = filename => {
  return `https://storage.googleapis.com/${bucketName}/${filename}`;
};

const uploadFile = fileData => new Promise(
  (resolve, reject) => {
    const fileName = fileData.originalname;
    const file = bucket.file(fileName);

    const stream = file.createWriteStream({
      metadata: {
        contentType: fileData.mimetype
      },
      gzip: true,
      public: true,
      resumable: false
    });

    stream.on('error', (err) => {
      reject(err);
    });

    stream.on('finish', () => {

      file.makePublic().then(() => {
        resolve(getPublicUrl(fileName));
      });
    });

    stream.end(fileData.buffer);
});

module.exports = {
  uploadFile
};