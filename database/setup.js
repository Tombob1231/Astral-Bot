const db = require("./database");

db.serialize(() => {

    db.run(`
        CREATE TABLE IF NOT EXISTS scrims (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            opponent TEXT NOT NULL,
            date TEXT NOT NULL,
            time TEXT NOT NULL,
            tournament TEXT NOT NULL,
            stream TEXT
        )
    `);

    db.run(`
        CREATE TABLE IF NOT EXISTS results (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            opponent TEXT NOT NULL,
            score TEXT NOT NULL,
            tournament TEXT NOT NULL,
            date TEXT NOT NULL
        )
    `);

    db.run(`
        CREATE TABLE IF NOT EXISTS roster (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            rank TEXT NOT NULL,
            role TEXT NOT NULL,
            player TEXT NOT NULL,
            epic TEXT NOT NULL,
            tracker TEXT NOT NULL
        )
    `);

    db.run(`
        CREATE TABLE IF NOT EXISTS staff (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            role TEXT NOT NULL,
            member TEXT NOT NULL
        )
    `);

    console.log("✅ Database tables are ready.");

});