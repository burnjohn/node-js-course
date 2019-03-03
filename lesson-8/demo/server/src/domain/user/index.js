const getAll = require('getAll');
const get = require('get');
const deleteUser = require('delete');
const update = require('update');
const create = require('create');

export default {
  getAllUser: getAll,
  getUser: get,
  deleteUser,
  updateUser: update,
  createUser: create,
}
