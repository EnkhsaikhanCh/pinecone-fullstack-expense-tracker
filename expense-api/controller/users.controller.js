const postgres = require("postgres");
require("dotenv").config();

let { PGHOST, PGDATABASE, PGUSER, PGPASSWORD, ENDPOINT_ID } = process.env;

const sql = postgres({
  host: PGHOST,
  database: PGDATABASE,
  username: PGUSER,
  password: PGPASSWORD,
  port: 5432,
  ssl: "require",
  connection: {
    options: `project=${ENDPOINT_ID}`,
  },
});

// Create ---------------------------------------------
const createUser = async (req, res) => {
  const { name, email, password, avatar_img } = req.body;

  const response =
    await sql`insert into users(name, email, password, avatar_img) values(${name}, ${email}, ${password}, ${avatar_img})`;

  res.json(response);
};

module.exports = {
  createUser,
};
