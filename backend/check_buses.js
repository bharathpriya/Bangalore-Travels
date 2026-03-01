import db from './db.js';

db.query("DESCRIBE bookings;", (err, results) => {
    if (err) console.error(err);
    else console.table(results);
    process.exit();
});
