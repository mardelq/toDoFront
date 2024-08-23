import React, { useState } from 'react';
import axios from 'axios';
import { STATUS_OPTIONS } from './config';

const CreateTask = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [status, setStatus] = useState(STATUS_OPTIONS[0]);
    const [errors, setErrors] = useState({ title: '', description: '' });

    const handleSubmit = (e) => {
        e.preventDefault();
        let validationErrors = {};

        if (!title) {
            validationErrors.title = 'Title is required';
        }
        if (!description) {
            validationErrors.description = 'Description is required';
        }

        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        axios.post('http://localhost:8080/api/tasks', { title, description, status })
            .then(response => {
                console.log(response.data);
                setTitle('');
                setDescription('');
                setStatus(STATUS_OPTIONS[0]);
                setErrors({ title: '', description: '' });
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
                {errors.title && <div className="text-danger mb-2">{errors.title}</div>}
                <textarea
                    className="form-control mb-2"
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                    placeholder="Enter task description"
                />
                {errors.description && <div className="text-danger mb-2">{errors.description}</div>}
                <select
                    className="form-control mb-2"
                    value={status}
                    onChange={e => setStatus(e.target.value)}
                >
                    {STATUS_OPTIONS.map(option => (
                        <option key={option} value={option}>{option}</option>
                    ))}
                </select>
                <button type="submit" className="btn btn-primary">Add Task</button>
            </form>
        </div>
    );
};

export default CreateTask;