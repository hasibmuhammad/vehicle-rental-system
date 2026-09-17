import { Pool } from "pg";
import config from ".";

export const pool = new Pool({
  connectionString: config.CONNECTION_STR,
});

const initDB = async () => {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS users(
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL UNIQUE,
        password VARCHAR(255) NOT NULL,
        phone VARCHAR(20) NOT NULL,
        role VARCHAR(10) NOT NULL DEFAULT 'customer'
    )
  `);

  await pool.query(`
      CREATE TABLE IF NOT EXISTS vehicles(
          id SERIAL PRIMARY KEY,
          vehicle_name VARCHAR(255) NOT NULL,
          type VARCHAR(20) NOT NULL,
          registration_number VARCHAR(255) UNIQUE NOT NULL,
          daily_rent_price INT NOT NULL,
          availability_status VARCHAR(20) NOT NULL DEFAULT 'available'
      )
    `);

  await pool.query(`
        CREATE TABLE IF NOT EXISTS bookings(
            id SERIAL PRIMARY KEY,
            customer_id INT NOT NULL REFERENCES users(id),
            vehicle_id INT NOT NULL REFERENCES vehicles(id),
            rent_start_date DATE NOT NULL,
            rent_end_date DATE NOT NULL,
            total_price INT NOT NULL,
            status VARCHAR(20) NOT NULL DEFAULT 'active'
        )
      `);
};

export default initDB;
