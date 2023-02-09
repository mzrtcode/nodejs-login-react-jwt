import pool from "../db.js";
import jwt from "jsonwebtoken";
import { decrypt, encrypt } from "../helpers/handleBcrypt.js";

export const createUser = async (req, res) => {
  try {
    const { username, password } = req.body;
    const encryptedPassword = await encrypt(password, 10);
    const [result] = await pool.query(
      "INSERT INTO users (username, password, role) VALUES (?,?,?)",
      [username, encryptedPassword, "visitor"]
    );
    if ((result.affectedRows = 1)) {
      console.log(result);
      res.json({ message: "USER REGISTERED" });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error });
  }
};

export const logUser = async (req, res) => {
  try {
    const { username, password } = req.body;

    const [result] = await pool.query(
      "SELECT * FROM users WHERE username = ? ",
      [username]
    );

    if (result.length !== 1)
      return res.json({ message: "Invalid user or password" });

    const userObject = result[0];

    const checkPassword = await decrypt(password, userObject.password);

    if (!checkPassword) {
      console.log(password, userObject.password);
      return res.json({ message: "Invalid user or password" });
    } else {
      const user = { id: userObject.id, username, role: userObject.role };

      const token = jwt.sign(user, "JWTSECRETTOP", {
        expiresIn: "10m",
      });

      res.json({ auth: true, token });
    }
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
};

export const getProfile = async (req, res) => {
  res.json(req.user);
};
