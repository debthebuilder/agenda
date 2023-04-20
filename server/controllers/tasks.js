const config = require("../config");

exports.addTask = (req, res) => {
    if(!req.body) {
        console.log("Body is empty!");
    }
    const values = [req.body];

    config.query("INSERT INTO tasks (title, description, done, tag, date, time) VALUES(?)", [values], 
    function(err, data, fields) {
        if(err){
            console.log(err);
        }
        res.status(200).json({
            status: "success",
            message: "Task created!",
        })
    })
};
exports.getAllTasks = (req, res) => {
    config.query("SELECT * FROM tasks", function(err, data, fields) {
        if(err){
            console.log(err);
        }
        res.status(200).json({
            status: "success",
            length: data?.length,
            data: data,
        })
    })
};