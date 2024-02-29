const { sql } = require("../config/database");

// Create ---------------------------------------------
const createUser = async (req, res) => {
  const { name, email, password, avatar_img } = req.body;

  const response =
    await sql`insert into users(name, email, password, avatar_img) values(${name}, ${email}, ${password}, ${avatar_img})`;

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
