import { useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = 'http://localhost:5000/tasks';

const useTasks = () => {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchTasks();
    }, []);

    const fetchTasks = async () => {
        try {
            const response = await axios.get(API_URL);
            setTasks(response.data);
        } catch (error) {
            console.error('Error fetching tasks:', error);
        } finally {
            setLoading(false);
        }
    };

    const addTask = async (taskData) => {
        try {
            await axios.post(API_URL, taskData);
            fetchTasks();
        } catch (error) {
            console.error('Error adding task:', error);
        }
    };

    const updateTaskStatus = async (id, status) => {
        try {
            await axios.patch(`${API_URL}/${id}/status`, { status });
            fetchTasks();
        } catch (error) {
            console.error('Error updating task:', error);
        }
    };

    return { tasks, loading, addTask, updateTaskStatus };
};

export default useTasks;
