import React, { useRef } from 'react';
import propTypes from 'prop-types';
import { LEVELS } from '../../../models/levels';
import { Task } from '../../../models/task.class';

const TaskForm = ({add, length}) => {

    const nameRef= useRef('')
    const descriptionRef= useRef('')
    const levelRef= useRef(LEVELS.NORMAL)

    function addTask(e){
        e.preventDefault()
        const newTask = new Task(
            nameRef.current.value,
            descriptionRef.current.value,
            false,
            levelRef.current.value
        )
        add(newTask)
    }

    const normalStyle = {
        color: "blue",
        fontWeight: "bold"
    }

    const urgentStyle = {
        color: "yellow",
        fontWeight: "bold"
    }

    const blockingStyle = {
        color: "tomato",
        fontWeight: "bold"
    }

    return (
        <form onSubmit={addTask} className='d-flex justify-content-center align-items-center mb-4'>
            <div className='form-outline flex-fill'>
                <input ref={nameRef} id='inputName' type='text' className='form-control form-control-lg' required autoFocus placeholder='newTask'></input>
                <input ref={descriptionRef} id='inputDescription' type='text' className='form-control form-control-lg' required placeholder='description'></input>
                <select style={normalStyle} ref={levelRef} defaultValue={LEVELS.NORMAL} className='form-control form-control-lg' id='selectLevel'>
                    <option  value={LEVELS.NORMAL}>
                        NORMAL
                    </option>
                    <option  value={LEVELS.URGENT}>
                        URGENT
                    </option>
                    <option  value={LEVELS.BLOCKING}>
                        BLOCKING
                    </option>
                </select>
                <button type='submit' className='btn btn-success btn-lg ms-2'>
                {length>0 ? "add new task" : "create your first task"}
            </button>
            </div> 
        </form>
    );
}

TaskForm.propTypes= {
    add:propTypes.func.isRequired,
    length: propTypes.number.required
}

export default TaskForm;
