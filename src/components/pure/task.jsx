import React , {useEffect} from 'react';
import { LEVELS } from '../../models/levels';
import PropTypes from 'prop-types';
import { Task } from '../../models/task.class';
import '../../styles/task.scss'


const TaskComponent = ({task, complete, remove}) => {
    
    useEffect(() => {
        console.log("created task");
        return () => {
            console.log(`task: ${task.name} is going to`);
        };
    }, [task]);

    //funcion para retornar un badge dependiendo del level de la task
    function taskLevelBadge() {
        switch (task.level) {
            case LEVELS.NORMAL:
                return(
                    <h6 className='mb-0'>
                        <span className='badge bg-primary'>
                            {task.level}
                        </span>
                    </h6>
                )
            case LEVELS.URGENT:
                return(
                    <h6 className='mb-0'>
                        <span className='badge bg-warning'>
                            {task.level}
                        </span>
                    </h6>
                )
            case LEVELS.BLOCKING:
                return(
                    <h6 className='mb-0'>
                        <span className='badge bg-danger'>
                            {task.level}
                        </span>
                    </h6>
                )    

        
            default:
                break;
        }
    }

    function taskCompletedIcon() {
        if (task.completed) {
            return (<i onClick={()=> complete(task)} className='bi-toggle-on task-action' style={{color:'green'}}></i>)
        }
        else{
            return (<i onClick={()=> complete(task)} className='bi-toggle-off task-action' style={{color:'grey'}}></i>)
        }
    }

    const taskCompletedStyle = {
        color: "gray",
        textDecoration: "line-through"
    }
    const taskPendingStyle = {
        fontWeight: "bold",
        color: "tomato"
    }
    return (
        <tr className='fw-normal' style={task.completed ? taskCompletedStyle : taskPendingStyle}>
            <th className='ms-2'>
                <span>{task.name}</span>
            </th>
            <td className='Align-middle'>
                <span> {task.description} </span>
            </td>
            <td className='Align-middle'>
                {taskLevelBadge()}
            </td>
            <td className='Align-middle'>
                {taskCompletedIcon()}
                <i onClick={()=> remove(task)} className='bi-trash task-action' style={{color:'red'}}></i>
            </td>
        </tr>
       
    );
};


TaskComponent.propTypes = {
    task : PropTypes.instanceOf(Task)
};


export default TaskComponent;
