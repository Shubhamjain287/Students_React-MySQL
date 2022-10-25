const express = require("express");
const app = express();
const mysql = require("mysql2");
const bodyparser = require("body-parser");
const cors = require("cors");

const PORT = process.env.PORT || 2800;

app.use(cors());
app.use(express.json());
app.use(bodyparser.urlencoded({extended : true}));

const db = mysql.createPool({
    host : "localhost",
    user : "root",
    password : "root",
    database : "crud_students"
});

app.get("/api/getAllStudents" , (req,res) => {
    const sqlGet = "Select * from students_db";
    db.query(sqlGet,(err,result) => {
        if(err){
            console.log(err);
        }
        else{
            res.send(result);
        }
    })
});

app.post("/api/post",(req,res) => {
    const { name , email , id , section } = req.body;
    const sqlInsert = "INSERT INTO students_db(id,name,email,section) VALUES (?,?,?,?)";
    db.query(sqlInsert , [id,name,email,section] , (err,result) => {
        if(err){
            console.log(err);
        }
        res.status(202).json({message : `Students Added Succesfully !!`});
    });
});

app.delete("/api/delete/:id",(req,res) => {
    const { id } = req.params;
    const sqlDelete = "DELETE FROM students_db WHERE id=?";
    db.query(sqlDelete , id , (err,result) => {
        if(err){
            console.log(err);
        }
        res.status(202).json({message : `Students Deleted Succesfully !!`});
    });
});

app.get("/api/getbyid/:id" , (req,res) => {
    const {id} = req.params;
    const sqlGet = "SELECT * FROM students_db WHERE id=?";
    db.query(sqlGet,id,(err,result) => {
        if(err){
            console.log(err);
        }
        else{
            res.send(result);
        }
    })
});

app.put("/api/update/:id" , (req,res) => {
    const {id} = req.params;
    const { name , email , section } = req.body;
    const sqlUpdate = "UPDATE students_db SET name = ? , email = ?, section = ? WHERE id = ?";
    db.query(sqlUpdate,[name,email,section,id],(err,result) => {
        if(err){
            console.log(err);
        }
        else{
            res.send(result);
        }
    })
});

app.get("/",(Req,res) => {
    // const sqlInsert = "INSERT INTO students_db(id,name,email,section) VALUES ('0832CS201157','Shubham Jain','Shubhamjainpvt28@gmail.com','C Section')";
    // db.query(sqlInsert,(err,result) => {
    //     if(err){
    //         console.log(err);
    //     }
    //     else{
    //         console.log(result);
    //     }
    // })
    res.send(`Hello Shubham`);
});

app.listen(PORT, ()=> {
    console.log(`Server is Running in the PORT ${PORT}`);
})