import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import config from "../../config";
import { pool } from "../../config/db";

const signup = async (payload: Record<string, unknown>) => {
  const { name, email, password, phone, role } = payload;

  const hashedPassword = await bcrypt.hash(password as string, 10);

  const result = await pool.query(
    `INSERT INTO users(name, email, password, phone, role) VALUES($1, $2, $3, $4, $5) RETURNING id, name, email, phone, role`,
    [name, email, hashedPassword, phone, role],
  );

  return result;
};

const signin = async (payload: Record<string, unknown>) => {
  const { email, password } = payload;

  const result = await pool.query(`SELECT * FROM users WHERE email=$1`, [
    email,
  ]);

  console.log(result);

  if (result.rows.length === 0) {
    return null;
  }

  const user = result.rows[0];

  const match = bcrypt.compare(password as string, user.password);

  if (!match) {
    return null;
  }

  const token = jwt.sign(
    {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
    config.JWT_SECRET as string,
    {
      expiresIn: "7d",
    },
  );

  const { password: _, ...safeUser } = user;

  return { token, user: safeUser };
};

export const authService = {
  signup,
  signin,
};
