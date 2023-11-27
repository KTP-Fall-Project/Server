const express = require("express");
const db = require("./postgres");
const app = express();
const pgp = require("pg-promise")();

db.connect()
    .then((obj) => {
        console.log("Database connection successful"); // you can view this message in the docker compose logs
        obj.done(); // success, release the connection;
    })
    .catch((error) => {
        console.log("ERROR:", error.message || error);
    });

app.get("/", (req, res) => {
    res.send("Hello, World!");
});

const port = 3000;
app.listen(port, async () => {
    console.log(`Server is running on port ${port}`);

    try {
        await db.any(
            `INSERT INTO members (identikey, firstname, lastname, nickname, email, phone) 
            VALUES ('maka2202', 'Matayay', 'Karuna', 'Tai', 'maka2202@colorado.edu', '(719)-480-1645');`
        );

        await db.any(
            `INSERT INTO points (id, coffeechats, events, projectGrade, total, pledge_id)
            VALUES (1, 8, 10, 85, 103, 'maka2202');`
        );

        await db.any(
            `INSERT INTO projects (id, numMembers, deadline, description) 
            VALUES (1, 4, '2023-11-27', 'Database for the KTP portal');`
        );

        await db.any(
            `INSERT INTO memberdata (id, picture, membertype, birthday, graduationDate, pledgeClass, major, member_id, group_id, points_id)
            VALUES (1, 'example.jpg', 'P', '2003-11-13', '2026-05-10', 'Alpha', 'Computer Science', 'maka2202', 1, 1);`
        );

        console.log("Insert successful");
    } catch (err) {
        console.log(err);
    }
});
