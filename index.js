import express from "express";
import mysql from "mysql";
import cors from "cors";

const app = express();

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "rpg"
})

app.use(express.json());
app.use(cors());

app.get("/", (req,res) => {
    res.json("This is the backend");
});

app.get("/npcs", (req, res) => {
    const query = "SELECT * FROM npcs";
    db.query(query, (err, data) =>{
        if(err) return res.json(err);
        return res.json(data);
    });
});

app.post("/npcs", (req, res) => {
    const query = "INSERT INTO npcs (`name`, `profession`) VALUES (?)";
    const values = [
        req.body.name,
        req.body.profession,
        ];
    db.query(query,[values], (err, data) => {
        if(err) return res.json(err);
        return res.json("The npcs was successfully created!");
    })
})

app

app.listen(8800, () => {
    console.log("Connected!");
});