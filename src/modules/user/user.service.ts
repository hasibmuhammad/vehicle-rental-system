import { pool } from "../../config/db";

const getUsers = async () => {
  const result = await pool.query(
    `SELECT id, name, email, phone, role FROM users`,
  );

  return result;
};

const updateUser = async (payload: Record<string, unknown>) => {
  const { userId, ...fields } = payload;

  const entries = Object.entries(fields).filter(
    ([key, value]) => value !== undefined,
  );

  const setClause = entries
    .map(([key], index) => `${key}=$${index + 1}`)
    .join(",");

  const values = entries.map(([, value]) => value);

  const result = await pool.query(
    `UPDATE users SET ${setClause} WHERE id=$${entries.length + 1} RETURNING id, name, email, phone, role`,
    [...values, userId],
  );

  return result;
};

export const userService = {
  getUsers,
  updateUser,
};
