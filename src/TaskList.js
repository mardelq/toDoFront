import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { STATUS_OPTIONS } from './config';

const TaskList = () => {
    const [tasks, setTasks] = useState([]);
    const [editingTask, setEditingTask] = useState(null);
    const [editTitle, setEditTitle] = useState('');
    const [editDescription, setEditDescription] = useState('');
    const [editStatus, setEditStatus] = useState('');
    const [errors, setErrors] = useState({ title: '', description: '' });

    useEffect(() => {
        axios.get('http://localhost:8080/api/tasks')
            .then(response => {
                setTasks(response.data);
            })
            .catch(error => {
                console.error("Error fetching data: ", error);
            });
    }, []);

    const handleEdit = (task) => {
        setEditingTask(task.id);
        setEditTitle(task.title);
        setEditDescription(task.description);
        setEditStatus(task.status);
    };

    const handleEditSubmit = (e) => {
        e.preventDefault();
        let validationErrors = {};

        if (!editTitle) {
            validationErrors.title = 'Title is required';
        }
        if (!editDescription) {
            validationErrors.description = 'Description is required';
        }

        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        axios.put(`http://localhost:8080/api/tasks/${editingTask}`, {
            title: editTitle,
            description: editDescription,
            status: editStatus
        })
            .then(response => {
                setTasks(tasks.map(task => task.id === editingTask ? response.data : task));
                setEditingTask(null);
                setErrors({ title: '', description: '' });
            })
            .catch(error => {
                console.error("Error editing task: ", error);
            });
    };

    const handleDelete = (taskId) => {
        axios.delete(`http://localhost:8080/api/tasks/${taskId}`)
            .then(() => {
                setTasks(tasks.filter(task => task.id !== taskId));
            })
            .catch(error => {
                console.error("Error deleting task: ", error);
            });
    };

    const renderTasks = (status) => {
        return tasks.filter(task => task.status === status).map(task => (
            <li className="list-group-item" key={task.id}>
                {editingTask === task.id ? (
                    <form onSubmit={handleEditSubmit}>
                        <input
                            type="text"
                            className="form-control mb-2"
                            value={editTitle}
                            onChange={e => setEditTitle(e.target.value)}
                            placeholder="Enter task title"
                        />
                        {errors.title && <div className="text-danger mb-2">{errors.title}</div>}
                        <textarea
                            className="form-control mb-2"
                            value={editDescription}
                            onChange={e => setEditDescription(e.target.value)}
                            placeholder="Enter task description"
                        />
                        {errors.description && <div className="text-danger mb-2">{errors.description}</div>}
                        <select
                            className="form-control mb-2"
                            value={editStatus}
                            onChange={e => setEditStatus(e.target.value)}
                        >
                            {STATUS_OPTIONS.map(option => (
                                <option key={option} value={option}>{option}</option>
                            ))}
                        </select>
                        <button type="submit" className="btn btn-primary">Save</button>
                        <button type="button" className="btn btn-secondary" onClick={() => setEditingTask(null)}>Cancel</button>
                    </form>
                ) : (
                    <>
                        <h3>{task.title}</h3>
                        <p>{task.description}</p>
                        <p>Status: {task.status}</p>
                        <button className="btn btn-warning" onClick={() => handleEdit(task)}>Edit</button>
                        <button className="btn btn-danger" onClick={() => handleDelete(task.id)}>Delete</button>
                    </>
                )}
            </li>
        ));
    };

    return (
        <div>
            <h2 className="mb-3">Tasks</h2>
            <div className="row">
                {STATUS_OPTIONS.map(status => (
                    <div className="col" key={status}>
                        <h3>{status}</h3>
                        <ul className="list-group">
                            {renderTasks(status)}
                        </ul>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TaskList;