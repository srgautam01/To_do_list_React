import React from 'react';

import logo from './logo.svg';
import './App.css';
import Todo from "./components/Todo";
import Form from "./components/Form";
import FilterButton from "./components/FilterButton";

// function App(props): Functional React component

// Class React component
class App extends React.Component {
    state = {
        userInput: "",
        tasks: [
            { id: "todo-0", name: "Eat", completed: true },
            { id: "todo-1", name: "Sleep", completed: false },
            { id: "todo-2", name: "Repeat", completed: false }
        ],
        currentTab: "all", // all | active | completed
    }

    constructor(props) {
        super(props);

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleAdd = this.handleAdd.bind(this);
    }

    handleInputChange(e) {
        this.setState({
            userInput: e.target.value,
        })
    }

    handleAdd(e) {
        // prevent page from receiving on default OnClick action.
        e.preventDefault();

        this.addTask(this.state.userInput)
    }

    handleDelete(e, taskId) {
        e.preventDefault();

        if(confirm("Are you sure you want to delete this task?")){
            this.deleteTask(taskId);
        }
    }

    handleCurrentTabChange(e, tab){
        e.preventDefault();

        this.setState({
            currentTab: tab
        })
    }

    handleChangeCompletion(e, taskId) {
        // e.preventDefault();
        debugger;
        let newTasks = [];
        for(let i=0; i<this.state.tasks.length; i++) {
            const task = {
                ...this.state.tasks[i], // duplicate and create new Object
            };

            if (task.id === taskId) {
                // toggle
                task.completed = !task.completed;
            }

            newTasks.push(task);
        }

        this.setState({
            tasks: newTasks,
        });

    }

    addTask(name) {
        let randomId = Math.random().toString(36).substring(7);

        const task = {
            id: randomId,
            name: name,
            completed: false,
        };

        this.setState({
            tasks: [...this.state.tasks, task]
        })
    }

    deleteTask(taskId) {
        // const newTasks = this.state.tasks.filter(task => task.id !== taskId);
        let newTasks = [];
        for(let i=0; i<this.state.tasks.length; i++) {
            if (this.state.tasks[i].id !== taskId) {
                newTasks.push(this.state.tasks[i]);
            } else {
                // delete this item
            }
        }

        this.setState({
            tasks: newTasks,
        })
    }

    editTask(taskId, newName) {

    }

    render() {
        let tasksToShow = this.state.tasks.filter(task => {
            if (this.state.currentTab === "all") {
                return true;
            }
            if (this.state.currentTab === "active") {
                return !task.completed;
                // if (task.completed) {
                //     return false;
                // } else {
                //     return true;
                // }
            }

            if (this.state.currentTab === "completed") {
                return task.completed;

              // if (task.completed)
              //     return true;
              // else:
              //   return false;
            }
        });

        const taskList = tasksToShow.map(task => (
            <Todo
                id={task.id}
                name={task.name}
                completed={task.completed}
                key={task.id}

                onDelete={e => this.handleDelete(e, task.id)}
                onChangeCompletion={e => this.handleChangeCompletion(e, task.id)}
            />
        ));

        return (
            <div className="todoapp stack-large">
                <h1>Sundar's To Do List</h1>
                <form>
                    <h2 className="label-wrapper">
                        <label htmlFor="new-todo-input" className="label__lg">
                            Today's Plan.
                        </label>
                    </h2>
                    <input
                        type="text"
                        id="new-todo-input"
                        className="input input__lg"
                        name="text"
                        autoComplete="off"
                        value={this.state.userInput}
                        onChange={this.handleInputChange}
                    />
                    <button
                        type="submit"
                        className="btn btn__primary btn__lg"
                        onClick={this.handleAdd}
                    >
                        Please add your task.
                    </button>
                </form>
                <div className="filters btn-group stack-exception">
                    <button
                        type="button"
                        className="btn
                        toggle-btn" aria-pressed={this.state.currentTab === "all" ? "true" : "false"}
                        onClick={e => this.handleCurrentTabChange(e, "all")}
                    >
                        <span className="visually-hidden">Show </span>
                        <span>All</span>
                        <span className="visually-hidden"> tasks</span>
                    </button>
                    <button
                        type="button"
                        className="btn toggle-btn"
                        onClick={e => this.handleCurrentTabChange(e, "active")}
                        aria-pressed={this.state.currentTab === "active" ? "true" : "false"}>
                        <span className="visually-hidden">Show </span>
                        <span>Active</span>
                        <span className="visually-hidden"> tasks</span>
                    </button>
                    <button type="button" className="btn toggle-btn"
                            onClick={e => this.handleCurrentTabChange(e, "completed")}
                            aria-pressed={this.state.currentTab === "completed" ? "true" : "false"}>
                        <span className="visually-hidden">Show </span>
                        <span>Completed</span>
                        <span className="visually-hidden"> tasks</span>
                    </button>
                </div>
                <h2 id="list-heading">
                    My Remaining Tasks.
                </h2>
                {taskList.length === 0 && <div>No tasks.</div>}
                <ul
                    role="list"
                    className="todo-list stack-large stack-exception"
                    aria-labelledby="list-heading">
                    {taskList}

                    {/*<Todo className="Eat" name = "Eat" completed={true} id="todo-0" >*/}
                    {/*  <div className="c-cb">*/}
                    {/*    <input id="todo-0" type="checkbox" defaultChecked={true} />*/}
                    {/*    <label className="todo-label" htmlFor="todo-0">*/}
                    {/*      Eat*/}
                    {/*    </label>*/}
                    {/*  </div>*/}
                    {/*  <div className="btn-group">*/}
                    {/*    <button type="button" className="btn">*/}
                    {/*      Edit <span className="visually-hidden">Eat</span>*/}
                    {/*    </button>*/}
                    {/*    <button type="button" className="btn btn__danger">*/}
                    {/*      Delete <span className="visually-hidden">Eat</span>*/}
                    {/*    </button>*/}
                    {/*  </div>*/}
                    {/*</Todo>*/}
                    {/*<Todo className="sleep" name="Sleep" completed={false} id="todo-1">*/}
                    {/*  <div className="c-cb">*/}
                    {/*    <input id="todo-1" type="checkbox" />*/}
                    {/*    <label className="todo-label" htmlFor="todo-1">*/}
                    {/*      Sleep*/}
                    {/*    </label>*/}
                    {/*  </div>*/}
                    {/*  <div className="btn-group">*/}
                    {/*    <button type="button" className="btn">*/}
                    {/*      Edit <span className="visually-hidden">Sleep</span>*/}
                    {/*    </button>*/}
                    {/*    <button type="button" className="btn btn__danger">*/}
                    {/*      Delete <span className="visually-hidden">Sleep</span>*/}
                    {/*    </button>*/}
                    {/*  </div>*/}
                    {/*</Todo>*/}
                    {/*<Todo className="repeat" name="Repeat" completed={false} id="todo-2">*/}
                    {/*  <div className="c-cb">*/}
                    {/*    <input id="todo-2" type="checkbox" />*/}
                    {/*    <label className="todo-label" htmlFor="todo-2">*/}
                    {/*      Repeat*/}
                    {/*    </label>*/}
                    {/*  </div>*/}
                    {/*  <div className="btn-group">*/}
                    {/*    <button type="button" className="btn">*/}
                    {/*      Edit <span className="visually-hidden">Repeat</span>*/}
                    {/*    </button>*/}
                    {/*    <button type="button" className="btn btn__danger">*/}
                    {/*      Delete <span className="visually-hidden">Repeat</span>*/}
                    {/*    </button>*/}
                    {/*  </div>*/}
                    {/*</Todo>*/}
                </ul>
            </div>
        )
    }

}
export default App;
