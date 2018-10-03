
const getUser = (request, response) => {
  const id = request.params.id;

  response.set("Content-Type", "application/json");

  response.status(200);
  response.json({ userId: id });
};

module.exports = getUser;
