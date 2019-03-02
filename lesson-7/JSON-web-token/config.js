const dbUser = "admin";
const dbPassword = "qwerty12345";

const config = {
  secret: 'secret-key',
  database: `mongodb://${ dbUser }:${ dbPassword }@ds159020.mlab.com:59020/marketplace-test`
};

module.exports = config;