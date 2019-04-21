const productsService = (() => {})();

const userService = ((products) => {
  const DEFAULT_USER = {
    name: 'Bob',
    email: 'bob@gmail.com',
    age: 40,
  };

  products.getProducts();

  class UserService {
    constructor(userId) {
      this.user = {
        ...DEFAULT_USER,
        userId
      };
    }

    saveNewUser(newUser) {
      this.user = newUser;
    }

    getUserFromDB() {
      return this.user;
    }
  }

  return UserService;
})(productsService);
