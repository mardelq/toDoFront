import React, { useState } from 'react';
import axios from 'axios';

const CreateTask = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [status, setStatus] = useState('TO DO');

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:8080/api/tasks', { title, description, status })
            .then(response => {
                console.log(response.data);
                setTitle('');
                setDescription('');
                setStatus('TO DO');
            })
            .catch(error => {
                console.error("Error adding task: ", error);
            });
    };

    return (
        <div>
            <h2 className="mb-3">Create Task</h2>
            <form onSubmit={handleSubmit} className="mb-3">
                <input
                    type="text"
                    className="form-control mb-2"
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                    placeholder="Enter task title"
                />
                <textarea
                    className="form-control mb-2"
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                    placeholder="Enter task description"
                />
                <select
                    className="form-control mb-2"
                    value={status}
                    onChange={e => setStatus(e.target.value)}
                >
                    <option value="TO DO">TO DO</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Done">Done</option>
                </select>
                <button type="submit" className="btn btn-primary">Add Task</button>
            </form>
        </div>
    );
};

export default CreateTask;