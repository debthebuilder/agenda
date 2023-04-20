import React, { useState, useEffect, useContext } from "react";
import { Icon } from "@iconify/react";
import { AppContext } from "./context/Context";
import { Button, Empty, Logo, Modal, Task,  } from "./components";
import './App.css';


const API_URL = "http://localhost:3030";

function App() {
  const context = useContext(AppContext);
  const user = context.user;
  const [active, setActive] = useState(0);
  const [tasks, setTasks] = useState([]);
  const [modal, setModal] = useState(false);
  const [task, setTask] = useState({
    done: false,
  });

  useEffect(() => {
    fetch(`${API_URL}/getAll`, 
      {
        method: "POST",
        mode: "cors",
        cache: "no-cache",
        credentials: "same-origin",
        headers: {
          'Accept': 'application/json',
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
    })
    .then(res => res.json())
    .then(data => {
      setTasks(data.data)
    })
    .catch(err => console.log(err));
  }, []);

  const showTasks = () => {
    setActive(0);
  };

  const showHistory = () => {
    setActive(1);
  }
  const deleteTask = (event, key) => {    
    tasks.pop(key);
  }

  const addTask = () => {
    setModal(true);
  }

  const saveTask = (e) => {
    e.preventDefault();
    fetch(`${API_URL}/addTask`, {
      method: "POST",
      mode: "cors",
      cache: "no-cache",
      credentials: "same-origin",
      headers: {
        'Accept': 'application/json',
        "Content-Type": "application/json",
      },
      body: JSON.stringify(task),
    }).then(res => res.json())
    .then(data => console.log(data))
    .catch(err => console.log(err));
  }

  const handleChange = (e) => {
    setTask({...task,
      [e.target.name]: e.target.value
    });
  };
  const list = [
    { 
      id: 1,
      title: "Bake a cake for Nicole's birthday",
      description: "Stop at shoprite to get ingredients. Get enough ricedajdkakdjfadklfadfkjadfkadfkf",
      done: false,
      date: "2023-04-12",
      time: "18:00",
      category: "Family",
    },
    { 
      id: 1,
      title: "Bake a cake for Nicole's birthday",
      description: "Stop at shoprite to get ingredients. Get enough ricedajdkakdjfadklfadfkjadfkadfkf",
      done: false,
      
    },
  ];

  return (
    <>
      <header className='container header'>
        <div>
          <Logo />
          <p>{user[0]?.email}</p>
        </div>
        <div className="flex-center">
          <Button.Toggle />
          <Button.Sm label={"Log Out"} />
        </div>
        
      </header>
      <main>
        <section className='container'>
          <div className="flex-group">
            <h1 className="heading">My Tasks</h1>
            <Button.Icon label="Task" action={"add"} handleClick={addTask} />
          </div>
        
          <div className="grid">
            <Button.Category handleClick={""} title={"All"} />
            <Button.Category handleClick={""} title={"Work"} />
            <Button.Category handleClick={""} title={"Fitness"} />
            <Button.Category handleClick={""} title={"Beauty"} />
            <Button.Category handleClick={""} title={"Family"} />
            <Button.Category handleClick={""} title={"Social"} />
          </div>
          <Task.Container>
            {list.map((item, key) => {
              return(
                <Task.Item 
                key={key} 
                taskId={item.id} 
                title={item.title} 
                description={item.description} 
                date={item.date}
                time={item.time}
                category={item.category}
                done={item.done} deleteTask={e => deleteTask(e, key)}/>
              )
            })}

          </Task.Container> 
        </section>
        <Modal show={modal} close={() => {
          setModal(false);
        }}>
          <Task.New handleChange={handleChange} submit={saveTask} modal={setModal}/>
        </Modal>
      </main>
    </>
  );
}

export default App;
