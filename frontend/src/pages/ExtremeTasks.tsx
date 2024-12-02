import React, { useEffect } from "react";
import { Box, Grid, Typography } from "@mui/material";
import {useAppDispatch, useAppSelector} from "../app/hooks";
import {fetchTasks} from "../features/tasks/tasksThunk";
import TaskCard from "../features/tasks/components/TaskCard";


const ExtremeTasks = () => {
    const { tasks } = useAppSelector((state) => state.tasksStore);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(fetchTasks());
    }, [dispatch]);

    const extremeTasks = tasks.filter((task) => task.priority === "extreme");

    return (
        <Box sx={{ padding: "20px", backgroundColor: "#f9f9f9", minHeight: "100vh" }}>
            <Typography variant="h6" fontWeight="medium" gutterBottom sx={{ color: "#F24E1E"}}>
                Extreme Priority Tasks
            </Typography>
            <Grid container spacing={2}>
                {extremeTasks.length > 0 ? (
                    extremeTasks.map((task) => (
                        <Grid item xs={12} key={task._id}>
                            <TaskCard {...task} />
                        </Grid>
                    ))
                ) : (
                    <Typography variant="h6">No tasks with extreme priority</Typography>
                )}
            </Grid>
        </Box>
    );
};

export default ExtremeTasks;