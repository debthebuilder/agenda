import React, { useState }  from "react";
import { Icon } from '@iconify/react';
import { Button } from "../Button";
import { Form } from "../Form";
import "./Task.css";

export const Task = {
    Container: ({children}) => {
        return(
            <div id='tasks'>
                {children}
            </div>
        )
    },
    Item: ({title, description, category, done, date, time, editTask, deleteTask, taskId}) => {
        return(
          
          <div className="task" id={taskId} >
              <div className='flex-start'>
                  <input type="checkbox" checked={done === false ? false : true}></input>
                  <div className='content'>
                    <input 
                    className='task-title'
                    type='text' 
                    value={title} 
                    onChange={editTask}
                    />
                    {description ?
                    <textarea className='task-desc' rows={"auto"}>{description}</textarea>
                    : null}
                    <div className='other'>
                      
                      <div className='reminder'>
                        {date ? 
                        <div className='task-tag'>
                          <Icon icon="ic:outline-date-range" width={18}  />
                          <span className='cat'>{date}</span>
                        </div>
                        : null }
                        { time ?
                        <div className='task-tag'>
                          <Icon icon="material-symbols:nest-clock-farsight-analog-outline-rounded" width={18} />
                          <span className='cat'>{time}</span>
                          </div>
                        : null }
                        
                      </div>
                      {category ? 
                      <span className='task-cat'>#{category}</span>
                      : null }
                    </div>
                  </div>
              </div>             
              <Button.Icon action={"delete"} handleClick={deleteTask} />
          </div>
        )
    },

    New: ({handleChange, submit, modal}) => {
      const [cat, setCat] = useState(false);
        return(
            <>
              <div className="flex-group">
                <h2>New Task</h2>
                <button onClick={() => {modal(false);}}><Icon icon="material-symbols:close-rounded" width={20} /></button>
              </div>
              <Form.Container>
                <Form.Input label={"Title"} type={'text'} name={'title'} handleChange={handleChange} />
                <Form.Input label={"Description"} type={'text'} name={'description'} handleChange={handleChange} />
                <div className="form-group">
                  <label>Category</label>
                  <div className="auto-grid">
                    <input name="category" className="category" type="button" value={"Work"} onClick={handleChange} />
                    <input name="category" className="category" type="button" value={"Fitness"}  onClick={handleChange} />
                    <input name="category" className="category" type="button" value={"Family"} onClick={handleChange} />
                    <input name="newCategory" className="category" type="button" value={"New Tag"} onClick={(() => {setCat(!cat)})} />
                  </div>
                  {cat ?
                  <Form.Input type={'text'} name={'category'} handleChange={handleChange} />
                  : null }
                </div>
                <h3 className='mt-5'>Set Reminder</h3>
                <div className="flex-group">
                  <Form.Input label={"Date"} type={'date'} name={'date'} handleChange={handleChange} />
                  <Form.Input label={"Time"} type={'time'} name={'time'} handleChange={handleChange} />
                </div>
                <Button.Sm label={"Add Task"} type={"submit"} handleClick={{submit}} />
              </Form.Container>
            </>
        )
    }
}