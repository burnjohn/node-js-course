const { Storage } = require('@google-cloud/storage');
const { keyFilenameSrc, bucketName } = require('./config');

const storage = new Storage({
  projectId: bucketName,
  keyFilename: keyFilenameSrc
});

let bucket = null;

const createBucket = () =>
  bucket.create()
    .then(() => {
      console.log('Bucket was successfully created')
    }).catch(error => {
      console.log('Error in creating bucket', error);
    });

bucket = storage.bucket(bucketName) || createBucket();

module.exports = bucket;
