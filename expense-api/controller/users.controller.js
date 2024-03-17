const { sql } = require("../config/database");
const { v4: uuidv4 } = require("uuid");
const bcrypt = require("bcryptjs");

const handleError = (error, res) => {
  console.log(error);
  res.status(500).json({ meassage: "An internal error occurred." });
};

// Create ---------------------------------------------
const createUser = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    // 1. Check duplicate username
    const users =
      await sql`SELECT * FROM users WHERE username=${username} OR email=${email}`;
    if (users.length > 0) {
      return res
        .status(400)
        .json({ message: "Username or email already exists." });
    }

    // 2. password validation
    if (password.length < 8) {
      return res
        .status(400)
        .json({ message: "Password must be at least 8 characters" });
    }

    // 3. register user
    const hash = bcrypt.hashSync(password, 10);
    await sql`insert into users(id, username, email, password) values(${uuidv4()}, ${username}, ${email}, ${hash})`;

    // 4. success response
    res.status(200).json({ message: "Successfully registered" });
  } catch (error) {
    handleError(error, res);
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
    handleError(error, res);
  }
};

// Update ---------------------------------------------
const updateUser = async (req, res) => {
  const { id } = req.params;
  const { username, email, password, avatar_img } = req.body;

  try {
    const userExists = await sql`SELECT * FROM users WHERE id=${id}`;
    if (userExists.length === 0) {
      return res.status(404).json({ message: "User not found." });
    }
    const hash = password
      ? bcrypt.hashSync(password, 10)
      : userExists[0].password;
    await sql`SELECT users SET username=${username}, email=${email}, password=${hash} avatar_img=${avatar_img}, WHERE id=${id}`;
    res.status(200).json({ message: "User updated successfully." });
  } catch (error) {
    handleError(error, res);
  }
};

// List Users ---------------------------------------------
const listUsers = async (req, res) => {
  try {
    const users = await sql`SELECT * FROM users`;

    res.status(200).json(users);
  } catch (error) {
    handleError(error, res);
  }
};

module.exports = {
  createUser,
  getUser,
  updateUser,
  listUsers,
};
