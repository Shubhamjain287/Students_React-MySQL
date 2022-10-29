const express = require("express");
const app = express();
const bodyparser = require("body-parser");
const cors = require("cors");
const router = require("./routes/students");

const PORT = process.env.PORT || 2800;

app.use(cors());
app.use(express.json());
app.use(bodyparser.urlencoded({extended : true}));
app.use(`/api`,router);

app.listen(PORT, ()=> {
    console.log(`Server is Running in the PORT ${PORT}`);
})