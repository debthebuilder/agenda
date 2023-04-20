const sql = require("../config");

const Task = function(task) {
    this.title = task.title;
    this.description = task.description;
    this.done = task.done;
    this.tag = task.tag;
    this.date = task.date;
    this.time = task.time;
}

Task.create = (newTask, result) => {
    sql.query("INSERT into tasks SET ?", newTask, (err, res) => {
        if(err){
            console.log("error: ", err);
            result(err, null);
            return;
        }
        console.log("Task created: ", res);
    })
};

Task.getAll = (title, result) => {
    let query = "SELECT * FROM tasks";
  
    if (title) {
      query += ` WHERE title LIKE '%${title}%'`;
    }
  
    sql.query(query, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
      console.log("tasks: ", res);
      result(null, res);
    });
};


Task.getAllDone = result => {
    sql.query("SELECT * FROM tasks WHERE done=true", (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
      console.log("tasks: ", res);
      result(null, res);
    });
  };


  Task.updateById = (id, tutorial, result) => {
    sql.query(
      "UPDATE task SET title = ?, description = ?, done = ? WHERE id = ?",
      [Task.title, Task.description, Task.done, id],
      (err, res) => {
        if (err) {
          console.log("error: ", err);
          result(null, err);
          return;
        }
  
        if (res.affectedRows == 0) {
          // not found Tutorial with the id
          result({ kind: "not_found" }, null);
          return;
        }
  
        console.log("updated task: ", { id: id, ...Task });
        result(null, { id: id, ...Task });
      }
    );
  };

