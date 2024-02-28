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
const createTransactions = async (req, res) => {
  const { title, amount, transcation_type, description } = req.body;
  const response =
    await sql`insert into users(title, amount, transcation_type, description) values(${title}, ${amount}, ${transcation_type}, ${description})`;

  res.json(response);
};

module.exports = {
  createTransactions,
};
