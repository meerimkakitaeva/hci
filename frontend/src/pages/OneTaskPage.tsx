import React, { useEffect } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import { selectOneTask, taskLoading } from "../features/tasks/tasksSlice";
import { deleteTask, fetchTasks, getOneTask } from "../features/tasks/tasksThunk";
import { Box, CircularProgress, Typography } from '@mui/material';
import OneTask from "../features/tasks/components/OneTask";
import { useAppDispatch, useAppSelector } from "../app/hooks";

const OneTaskPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const dispatch = useAppDispatch();
    const task = useAppSelector(selectOneTask);
    const isLoading = useAppSelector(taskLoading);
    const navigate = useNavigate();

    useEffect(() => {
        if (id) {
            dispatch(getOneTask(id));
        }
    }, [dispatch, id]);

    const onDelete = async () => {
        if (window.confirm('Delete this task?')) {
            try {
                await dispatch(deleteTask(id!));
                alert('Deleted');
                dispatch(fetchTasks());
                navigate('/tasks');
            } catch (e) {
                alert('Not deleted');
            }
        }
    };

    const onEdit = () => {
        if (id) {
            navigate(`/tasks/edit/${id}`); // Переход на форму редактирования
        }
    };

    return (
        <Box
            sx={{
                maxWidth: 800,
                margin: '0 auto',
                padding: 3,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
            }}
        >
            {isLoading && <CircularProgress color="primary" />}

            {task ? (
                <OneTask task={task} onDelete={onDelete} onEdit={onEdit} />
            ) : (
                !isLoading && (
                    <Typography variant="h6" color="text.secondary">
                        Task not found or doesn't exist.
                    </Typography>
                )
            )}
        </Box>
    );
};

export default OneTaskPage;
