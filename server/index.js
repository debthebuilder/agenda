const express = require("express");
const cors = require("cors");
const router = require("./routes");
const config = require("./config");

const app = express();
const port = 3030;

const corsOptions = {
    origin: "http://localhost:3000"
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(
    express.urlencoded({
        extended: true
    })
);

app.get("/", (req, res) => {
    res.json({message: "ok"})
});

app.post("/addTask", (req, res) => {
     console.log(req.body);
    if(!req.body) {
        console.log("Body is empty!");
    }else{

    config.query(`INSERT INTO tasks (userId, title, description, done, tag, task_date, task_time) VALUES ('1', '${req.body.title}', '${req.body.description}', '${req.body.done}', '${req.body.tag}', '${req.body.date}', '${req.body.time}')`, 
    function(err, data, fields) {
        if(err){
            console.log(err);
        } else{
        res.status(200).json({
            status: "success",
            message: "Task created!",
        })
    }
    })
    }
});

app.post("/login", (req, res) => {

    const email = req.body.email;
    const password = req.body.password;

    config.query(`SELECT * FROM users WHERE email = '${email}' AND password = '${password}'`, 
    function(err, data) {
        if(data.length === 0){
            console.log(err);
            res.status(401).json({
                status: "error",
                message: "User not found!",
                
            })
        } else{
            console.log(data);
            res.status(200).json({
                status: "success",
                message: "User found!",
                data: data
            })
    }
    })
    
    
});
app.post("/getAll", (req, res) => {
    console.log("body: ", req.body);
    if(!req.body){
        console.log("Body is empty!");
    } else {
        const userId = req.body.id;
        console.log(userId);
        config.query(`SELECT * FROM tasks WHERE userId = ${userId}`, 
        function(err, data) {
            if(err){
                console.log(err);
            } else{
                console.log(data);
            res.status(200).json({
                status: "success",
                message: "Task created!",
                data: data
            })
        }
        })
    }
    
    
});

app.listen(port, () => {
    console.log("App is running")
});