const { sql } = require("../config/database");
const { v4: uuidv4 } = require("uuid");

// Create ---------------------------------------------
const createUser = async (req, res) => {
  const { name, email, password } = req.body;

  const response =
    await sql`INSERT INTO users(id, name, email, password) VALUES(${uuidv4()}, ${name}, ${email}, ${password})`;

  res.json(response);
};

// Read ---------------------------------------------
const getUser = async (req, res) => {
  const result = await sql`select * from users`;
  res.json(result);
};

// Update ---------------------------------------------
const updateUser = async (req, res) => {
  const { id } = req.params;
  const { name, email, password, avatar_img } = req.body;

  const result =
    await sql`UPDATE tasks SET users = ${name}, ${email}, ${password}, ${avatar_img} WHERE id = ${id}`;
  res.json(result);
};

module.exports = {
  createUser,
  getUser,
  updateUser,
};
