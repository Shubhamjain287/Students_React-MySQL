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

app.get("/",(Req,res) => {
    res.send(`Hello Shubham`);
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
    const { first_name , last_name , email , enrollment, branch , section } = req.body;
    const sqlInsert = "INSERT INTO students_db(enrollment,first_name,last_name,email,branch,section) VALUES (?,?,?,?,?,?)";
    db.query(sqlInsert , [enrollment,first_name,last_name,email,branch,section] , (err,result) => {
        if(err){
            console.log(err);
            return res.status(400).json({message : `Student Already Present`});
        }
        return res.json({message : `Students Added Succesfully !!`});
    });
});

app.delete("/api/delete/:enrollmentID",(req,res) => {
    const { enrollmentID } = req.params;
    const sqlDelete = "DELETE FROM students_db WHERE enrollment=?";
    db.query(sqlDelete , enrollmentID , (err,result) => {
        if(err){
            console.log(err);
        }
        res.json({message : `Students Deleted Succesfully !!`});
    });
});

app.get("/api/getbyid/:enrollmentID" , (req,res) => {
    const {enrollmentID} = req.params;
    const sqlGet = "SELECT * FROM students_db WHERE enrollment=?";
    db.query(sqlGet,enrollmentID,(err,result) => {
        if(err){
            console.log(err);
        }
        else{
            res.send(result);
        }
    })
});

app.put("/api/update/:enrollmentID" , (req,res) => {
    const {enrollmentID} = req.params;
    const { first_name , last_name , email , branch , section } = req.body;
    const sqlUpdate = "UPDATE students_db SET first_name = ? , last_name = ? , email = ?, branch = ? , section = ? WHERE enrollment = ?";
    db.query(sqlUpdate,[first_name , last_name , email , branch , section , enrollmentID],(err,result) => {
        if(err){
            console.log(err);
        }
        else{
            res.send(result);
        }
    })
});

app.get("/api/getBySection/:sectionID", (req,res)=>{
    const { sectionID } = req.params;
    const GetStudent = `SELECT * FROM students_db WHERE section=?`;
    db.query(GetStudent , sectionID , (err,result)=>{
        if(err){
            console.log(err);
        }
        else{
            res.send(result);
        }
    } )
});

app.get("/api/getByBranch/:branchID", (req,res)=>{
    const { branchID } = req.params;
    const GetStudent = `SELECT * FROM students_db WHERE branch=?`;
    db.query(GetStudent , branchID , (err,result)=>{
        if(err){
            console.log(err);
        }
        else{
            res.send(result);
        }
    } )
});

app.listen(PORT, ()=> {
    console.log(`Server is Running in the PORT ${PORT}`);
})