import React , {useState , useEffect} from 'react';
import { LEVELS } from '../../models/levels';
import { Task } from '../../models/task.class';
import TaskComponent from '../pure/task';
import '../../styles/task.scss';
import TaskForm from '../pure/forms/taskForm';


const TaskListComponent = () => {
    const defaultTask = new Task("example","default",false,LEVELS.NORMAL)
    const defaultTask2 = new Task("example","default",true,LEVELS.URGENT)
    const defaultTask3 = new Task("example","default",false,LEVELS.BLOCKING)
    //estado del componente
    const [tasks, setTasks] = useState([defaultTask, defaultTask2, defaultTask3]);
    const [loading, setLoading] = useState(true);
    //control del ciclo de vida
    useEffect(() => {
        console.log(" task state has been modified ");
        setLoading(false)
        return () => {
            console.log(" taskList component is going to unmount")
        };
    }, [tasks]);

    function completeTask(task){
        console.log('complete this task', task);
        const index= tasks.indexOf(task)
        //todas las tareas hasta el momento
        //hace un replica temporal de la lista
        const tempTask= [...tasks]
        tempTask[index].completed = !tempTask[index].completed
        //actualizamos el estado del componente y actualizamos
        // la iteracion de las tareas
        setTasks(tempTask)
    }
    
    function removeTask(task){
        console.log("remove");
        const index= tasks.indexOf(task)
        const tempTask= [...tasks]
        //se usa la funcion slice pasando por parametro el indice y la cantidad que se quiere eliminar
        tempTask.splice(index,1)
        setTasks(tempTask)  
    }

    function addTask(task){
        console.log("add");
        const tempTask= [...tasks]
        // se usa la funcion push para agregar la task a la list
        tempTask.push(task)
        setTasks(tempTask)
    }

    function Table () {
        return(
            <table>
                <thead>
                    <tr>
                        <th scope='col'>title</th>
                        <th scope='col'>description</th>
                        <th scope='col'>priority</th>
                        <th scope='col'>actions</th>
                    </tr>
                </thead>
                <tbody>
                    {tasks.map((task, index)=> {
                        return(
                            <TaskComponent 
                                key={index} 
                                task={task}
                                complete={completeTask}
                                remove={removeTask}
                                >
                            </TaskComponent>
                        )
                    })}  
                </tbody>
            </table>
        )
    }

    let taskTable;

    if(tasks.length > 0){
        taskTable= <Table></Table>
    }
    else{
        taskTable= <h3> no tenes tareas</h3>
    }

    const loadingStyle = {
        color: "grey"
    }
    return (
        <div>
            <div className='col-12'>
                <div className='card'>
                    <div className='card-header p-3'>
                        <h5>
                            your tasks:
                        </h5>
                    </div>
                    <div className='card-body' data-mdb-perfect-scrollbar='true' style= { {position:'relative', height:'400px'}}>
                        {loading ? (<p style={loadingStyle}>loading tasks...</p>) : taskTable}
                    </div>
                </div>
            </div>
            <TaskForm add={addTask} length={tasks.length}></TaskForm>
        </div>
    );
}

export default TaskListComponent;
