const mysql = require("mysql2");
const dotenv = require("dotenv");

dotenv.config();

const db = mysql.createPool({
    host : process.env.HOST_NAME,
    user : process.env.USER_NAME,
    password : process.env.PASSWORD,
    database : process.env.DATABASE
});

exports.getAllStudents = (req,res) => {
    const sqlGet = "Select * from student_db";
    db.query(sqlGet,(err,result) => {
        if(err){
            console.log(err);
        }
        else{
            res.send(result);
        }
    })
};

exports.postStudents = (req,res) => {
    const { first_name , last_name , email , enrollment, branch , section } = req.body;
    const sqlInsert = "INSERT INTO student_db(enrollment,first_name,last_name,email,branch,section) VALUES (?,?,?,?,?,?)";
    db.query(sqlInsert , [enrollment,first_name,last_name,email,branch,section] , (err,result) => {
        if(err){
            console.log(err);
            return res.status(400).json({message : `Student Already Present`});
        }
        return res.json({message : `Students Added Succesfully !!`});
    });
};

exports.deleteStudents = (req,res) => {
    const { enrollmentID } = req.params;
    const sqlDelete = "DELETE FROM student_db WHERE enrollment=?";
    db.query(sqlDelete , enrollmentID , (err,result) => {
        if(err){
            console.log(err);
        }
        res.json({message : `Students Deleted Succesfully !!`});
    });
};

exports.getStudentByID =  (req,res) => {
    const {enrollmentID} = req.params;
    const sqlGet = "SELECT * FROM student_db WHERE enrollment=?";
    db.query(sqlGet,enrollmentID,(err,result) => {
        if(err){
            console.log(err);
        }
        else{
            res.send(result);
        }
    })
};

exports.updateStudent =  (req,res) => {
    const {enrollmentID} = req.params;
    const { first_name , last_name , email , branch , section } = req.body;
    const sqlUpdate = "UPDATE student_db SET first_name = ? , last_name = ? , email = ?, branch = ? , section = ? WHERE enrollment = ?";
    db.query(sqlUpdate,[first_name , last_name , email , branch , section , enrollmentID],(err,result) => {
        if(err){
            console.log(err);
        }
        else{
            res.send(result);
        }
    })
};

exports.getStudentsByBranch =  (req,res)=>{
    const { branchID } = req.params;
    const GetStudent = `SELECT * FROM student_db WHERE branch=?`;
    db.query(GetStudent , branchID , (err,result)=>{
        if(err){
            console.log(err);
        }
        else{
            res.send(result);
        }
    } )
};

exports.getStudentsBySection =  (req,res)=>{
    const { sectionID } = req.params;
    const GetStudent = `SELECT * FROM student_db WHERE section=?`;
    db.query(GetStudent , sectionID , (err,result)=>{
        if(err){
            console.log(err);
        }
        else{
            res.send(result);
        }
    } )
};
