import mysql from 'mysql2/promise';
import fs from 'node:fs/promises';
import dotenv from 'dotenv';

dotenv.config();

async function runSchema() {
    console.log("Connecting to Aiven Database...");
    const connection = await mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        port: process.env.DB_PORT,
        ssl: { rejectUnauthorized: false },
        multipleStatements: true // Essential for running full SQL dumps
    });

    try {
        console.log("Reading schema.sql...");
        const schemaSQL = await fs.readFile('schema.sql', 'utf8');

        console.log("Executing SQL statements...");
        await connection.query(schemaSQL);

        console.log("✅ Successfully created tables in Aiven!");
    } catch (err) {
        console.error("❌ Error running schema:", err);
    } finally {
        await connection.end();
    }
}

runSchema();
