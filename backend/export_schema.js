import mysql from 'mysql2/promise';
import fs from 'node:fs/promises';

async function exportSchema() {
    const connection = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'bangalore_travels'
    });

    try {
        const [tables] = await connection.query('SHOW TABLES');
        let schemaSQL = '';

        for (const row of tables) {
            const tableName = Object.values(row)[0];
            const [[createTable]] = await connection.query(`SHOW CREATE TABLE ${tableName}`);
            schemaSQL += createTable['Create Table'] + ';\n\n';
        }

        await fs.writeFile('schema.sql', schemaSQL);
        console.log('Successfully exported schema to schema.sql');
    } catch (err) {
        console.error('Error exporting schema:', err);
    } finally {
        await connection.end();
    }
}

exportSchema();
