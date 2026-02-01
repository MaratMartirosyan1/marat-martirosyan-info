const { Client } = require('pg');
require('dotenv').config();

async function createDatabase() {
  // Connect to postgres default database
  const client = new Client({
    host: process.env.DATABASE_HOST || 'localhost',
    port: parseInt(process.env.DATABASE_PORT, 10) || 5432,
    user: process.env.DATABASE_USER || 'postgres',
    password: process.env.DATABASE_PASSWORD || 'postgres',
    database: 'postgres', // Connect to default postgres database
  });

  try {
    await client.connect();
    console.log('Connected to PostgreSQL');

    // Check if database exists
    const result = await client.query(
      `SELECT 1 FROM pg_database WHERE datname = '${process.env.DATABASE_NAME || 'portfolio_db'}'`
    );

    if (result.rows.length === 0) {
      // Create the database
      await client.query(`CREATE DATABASE ${process.env.DATABASE_NAME || 'portfolio_db'}`);
      console.log(`Database '${process.env.DATABASE_NAME || 'portfolio_db'}' created successfully!`);
    } else {
      console.log(`Database '${process.env.DATABASE_NAME || 'portfolio_db'}' already exists.`);
    }

    await client.end();
    process.exit(0);
  } catch (error) {
    console.error('Error creating database:', error.message);
    process.exit(1);
  }
}

createDatabase();
