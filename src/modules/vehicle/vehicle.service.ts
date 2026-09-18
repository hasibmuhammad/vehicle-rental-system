import { pool } from "../../config/db";

const createVehicle = async (payload: Record<string, unknown>) => {
  const {
    vehicle_name,
    type,
    registration_number,
    daily_rent_price,
    availability_status,
  } = payload;

  const result = await pool.query(
    `INSERT INTO vehicles(vehicle_name, type, registration_number, daily_rent_price, availability_status) VALUES($1, $2, $3, $4, $5) RETURNING *`,
    [
      vehicle_name,
      type,
      registration_number,
      daily_rent_price,
      availability_status,
    ],
  );

  return result;
};

const getVehicles = async () => {
  const result = await pool.query(`SELECT * FROM vehicles`);

  return result;
};

const getVehicle = async (vehicleId: string) => {
  const result = await pool.query(`SELECT * FROM vehicles WHERE id=$1`, [
    vehicleId,
  ]);

  return result;
};

const deleteVehicle = async (vehicleId: string) => {
  const result = await pool.query(`DELETE FROM vehicles WHERE id=$1`, [
    vehicleId,
  ]);

  return result;
};

const updateVehicle = async (payload: Record<string, unknown>) => {
  const { vehicleId, ...fields } = payload;

  const entries = Object.entries(fields).filter(
    ([, value]) => value !== undefined,
  );

  const setClause = entries
    .map(([key], index) => `${key}=$${index + 1}`)
    .join(", ");

  const values = entries.map(([, value]) => value);

  const result = await pool.query(
    `UPDATE vehicles SET ${setClause} WHERE id=$${entries.length + 1} RETURNING *`,
    [...values, vehicleId],
  );

  return result;
};

export const vehicleService = {
  createVehicle,
  getVehicles,
  getVehicle,
  deleteVehicle,
  updateVehicle,
};
