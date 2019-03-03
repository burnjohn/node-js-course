const dbUser = "admin";
const dbPassword = "qwerty12345";

const config = {
  port: 8080,
  dbUser,
  dbPassword,
  databaseUrl: `mongodb://${ dbUser }:${ dbPassword }@ds159020.mlab.com:59020/marketplace-test`
};

module.exports = config;