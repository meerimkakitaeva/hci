import React, { useEffect, useState } from 'react';
import {
    Box,
    TextField,
    Typography,
    Button,
    FormControlLabel,
    Radio,
    RadioGroup,
} from '@mui/material';
import { createTask, editTask, getOneTask } from '../features/tasks/tasksThunk';
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { useNavigate, useParams } from "react-router-dom";
import { ITask } from "../types";

const Form: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { tasks } = useAppSelector((state) => state.tasksStore);

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [priority, setPriority] = useState('low');
    const [date, setDate] = useState('');
    const [status, setStatus] = useState('not started');
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const fetchTask = async () => {
            if (id) {
                setIsLoading(true);
                const action = await dispatch(getOneTask(id));
                const fetchedTask = action.payload as ITask; // Явное указание типа ITask
                if (fetchedTask) {
                    setTitle(fetchedTask.title || '');
                    setDescription(fetchedTask.description || '');
                    setPriority(fetchedTask.priority || 'low');
                    setDate(fetchedTask.date || '');
                    setStatus(fetchedTask.status || 'not started');
                }
                setIsLoading(false);
            }
        };

        fetchTask();
    }, [id, dispatch]);

    const handleSubmit = async () => {
        const taskData: ITask = {
            _id: id || '',
            title,
            description,
            priority,
            date,
            status,
            user: {
                email: tasks[0].user.email,
                username: tasks[0].user.username,
                _id: tasks[0].user._id,
            }
        };

        try {
            if (id) {
                await dispatch(editTask(taskData));
                alert('Task updated successfully!');
            } else {
                await dispatch(createTask(taskData));
                alert('Task created successfully!');
            }
            navigate('/tasks');
        } catch (e) {
            alert('Failed to save the task');
        }
    };

    return (
        <Box
            sx={{
                maxWidth: 600,
                margin: '100px auto',
                padding: 3,
                border: '1px solid #ccc',
                borderRadius: 4,
                boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
                backgroundColor: '#fff',
            }}
        >
            <Typography variant="h6" sx={{ marginBottom: 2, fontWeight: 'bold' }}>
                {id ? 'Edit Task' : 'Add New Task'}
            </Typography>

            {isLoading ? (
                <Typography variant="body1" color="text.secondary">
                    Loading...
                </Typography>
            ) : (
                <>
                    <TextField
                        fullWidth
                        label="Title"
                        variant="outlined"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        sx={{ marginBottom: 2 }}
                    />

                    <TextField
                        fullWidth
                        type="date"
                        label="Date"
                        InputLabelProps={{ shrink: true }}
                        variant="outlined"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        sx={{ marginBottom: 2 }}
                    />

                    <Typography variant="subtitle1" sx={{ marginBottom: 1 }}>
                        Priority
                    </Typography>
                    <RadioGroup
                        row
                        value={priority}
                        onChange={(e) => setPriority(e.target.value)}
                    >
                        <FormControlLabel
                            value="extreme"
                            control={<Radio sx={{ color: 'red' }} />}
                            label="Extreme"
                        />
                        <FormControlLabel
                            value="moderate"
                            control={<Radio sx={{ color: 'blue' }} />}
                            label="Moderate"
                        />
                        <FormControlLabel
                            value="low"
                            control={<Radio sx={{ color: 'green' }} />}
                            label="Low"
                        />
                    </RadioGroup>

                    <Typography variant="subtitle1" sx={{ marginBottom: 1 }}>
                        Status
                    </Typography>
                    <RadioGroup
                        row
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                    >
                        <FormControlLabel
                            value="not started"
                            control={<Radio sx={{ color: 'gray' }} />}
                            label="Not Started"
                        />
                        <FormControlLabel
                            value="in progress"
                            control={<Radio sx={{ color: 'orange' }} />}
                            label="In Progress"
                        />
                        <FormControlLabel
                            value="completed"
                            control={<Radio sx={{ color: 'green' }} />}
                            label="Completed"
                        />
                    </RadioGroup>

                    <TextField
                        fullWidth
                        label="Task Description"
                        variant="outlined"
                        multiline
                        rows={4}
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        sx={{ marginBottom: 2 }}
                    />

                    <Button
                        fullWidth
                        variant="contained"
                        color="primary"
                        onClick={handleSubmit}
                        sx={{ textTransform: 'none' }}
                    >
                        {id ? 'Save Changes' : 'Create Task'}
                    </Button>
                </>
            )}
        </Box>
    );
};

export default Form;
