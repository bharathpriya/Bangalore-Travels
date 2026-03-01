import db from './db.js';

db.query("ALTER TABLE bookings ADD COLUMN travel_date DATE;", (err, results) => {
    if (err) {
        if (err.code === 'ER_DUP_FIELDNAME') {
            console.log("Column travel_date already exists.");
        } else {
            console.error(err);
        }
    } else {
        console.log("Added travel_date column to bookings table.");
    }
    process.exit();
});
