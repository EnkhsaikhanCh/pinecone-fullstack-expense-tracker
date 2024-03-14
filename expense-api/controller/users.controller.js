const { sql } = require("../config/database");
const { v4: uuidv4 } = require("uuid");
const bcrypt = require("bcryptjs");

// Create ---------------------------------------------
const createUser = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    // 1. Check duplicate username
    const users =
      await sql`SELECT * FROM users WHERE username=${username} OR email=${email}`;
    if (users.length > 0) {
      res.status(200).json({ message: "Already registered." });
      return;
    }

    // 2. password validation
    if (password.length < 8) {
      res
        .status(200)
        .json({ message: "Password must be at least 8 characters" });
      return;
    }

    // 3. register user
    const hash = bcrypt.hashSync(password, 10);
    await sql`insert into users(id, username, email, password) values(${uuidv4()}, ${username}, ${email}, ${hash})`;

    // 4. success response
    res.status(200).json({ message: "Successfully registered" });
  } catch (error) {
    console.error("Error creating user:", error);
    res
      .status(500)
      .json({ message: "An error occurred while registering the user." });
  }
};

// Read ---------------------------------------------
const getUser = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    // 1. check if username exist
    const users =
      await sql`SELECT * FROM users WHERE username=${username} OR email=${email}`;
    if (users.length === 0) {
      res.status(400).json({ message: "Username or password is not correct" });
      return;
    }

    // 2. password check
    const user = users[0];
    if (!bcrypt.compareSync(password, user.password)) {
      res.status(400).json({ message: "Username or password is not correct" });
      return;
    }

    // 3. success response
    res.status(200).json({ message: "Login Success" });
  } catch (error) {
    console.error("Error authenticating user:", error);
    res
      .status(500)
      .json({ message: "An error occurred while authenticating the user." });
  }
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
