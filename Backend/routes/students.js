const express = require("express");
const router = express.Router();
const { getAllStudents, postStudents, deleteStudents, getStudentByID, updateStudent, getStudentsBySection, getStudentsByBranch } = require("../controllers/students");

router.get("/",(req,res) => {
    res.send(`Hello Shubham`);
});

router.get("/getAllStudents" , getAllStudents);

router.post("/post", postStudents);

router.delete("/delete/:enrollmentID", deleteStudents);

router.get("/getbyid/:enrollmentID" , getStudentByID);

router.put("/update/:enrollmentID" , updateStudent);

router.get("/getBySection/:sectionID", getStudentsBySection);

router.get("/getByBranch/:branchID", getStudentsByBranch);

module.exports = router;