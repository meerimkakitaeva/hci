import React, { useEffect, useState } from "react";
import {Box, CircularProgress, Grid, Stack, TextField, Typography} from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { fetchTasks } from "./tasksThunk";
import TaskCard from "./components/TaskCard";
import AssignmentOutlinedIcon from '@mui/icons-material/AssignmentOutlined';
import TaskOutlinedIcon from '@mui/icons-material/TaskOutlined';
import QueryStatsOutlinedIcon from '@mui/icons-material/QueryStatsOutlined';

const Tasks = () => {
    const { tasks } = useAppSelector((state) => state.tasksStore);
    const dispatch = useAppDispatch();

    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        dispatch(fetchTasks());
    }, [dispatch]);

    const completedTasks = tasks.filter((task) => task.status === "completed");
    const inProgressTasks = tasks.filter((task) => task.status === "in progress");
    const notStartedTasks = tasks.filter((task) => task.status === "not started");
    const totalTasks = tasks.length || 1;
    const completedPercentage = (completedTasks.length / totalTasks) * 100;
    const inProgressPercentage = (inProgressTasks.length / totalTasks) * 100;
    const notStartedPercentage = (notStartedTasks.length / totalTasks) * 100;

    // Фильтрация задач по запросу поиска
    const filteredTasks = tasks.filter((task) =>
        task.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <Box
            sx={{
                padding: "20px",
                minHeight: "100vh",
                display: "flex",
                gap: "20px",
            }}
        >
            <Box sx={{ flex: 6 }}>
                <TextField
                    fullWidth
                    placeholder="Search your task here..."
                    variant="outlined"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    sx={{
                        mb: 3,
                        backgroundColor: "#F8F8F8",
                    }}
                />


                <Box sx={{display: "flex"}}>
                    <AssignmentOutlinedIcon sx={{color: "#A1A3AB", marginRight: "5px"}} />
                    <Typography fontWeight="medium" gutterBottom sx={{color:"#F24E1E", fontSize: "16px"}}>
                        To-Do
                    </Typography>
                </Box>


                <Grid container spacing={2}>
                    {filteredTasks.length === 0 ? (
                        <Typography>No tasks found</Typography>
                    ) : (
                        filteredTasks.map((task) => (
                            <Grid item xs={12} key={task._id}>
                                <TaskCard {...task} />
                            </Grid>
                        ))
                    )}
                </Grid>
            </Box>

            <Box sx={{ flex: 4, display: "flex", flexDirection: "column", gap: "20px" }}>
                <Box sx={{ backgroundColor: "#fff", borderRadius: "12px", padding: "20px" }}>
                    <Box sx={{display: "flex"}}>
                        <QueryStatsOutlinedIcon sx={{color: "#A1A3AB", marginRight: "5px"}} />
                        <Typography fontWeight="medium" gutterBottom sx={{color:"#F24E1E", fontSize: "16px"}}>
                            Task Status
                        </Typography>
                    </Box>
                    <Stack direction="row" justifyContent="space-between">
                        <Box sx={{ position: "relative", display: "inline-flex", textAlign: "center" }}>
                            <CircularProgress
                                variant="determinate"
                                value={completedPercentage}
                                color="success"
                                size={80}
                                thickness={6}
                            />
                            <Box
                                sx={{
                                    top: 0,
                                    left: 0,
                                    bottom: 0,
                                    right: 0,
                                    position: "absolute",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                }}
                            >
                                <Typography variant="h6" component="div" color="green" fontWeight="bold">
                                    {`${Math.round(completedPercentage)}%`}
                                </Typography>
                            </Box>
                        </Box>
                        <Box sx={{ position: "relative", display: "inline-flex", textAlign: "center" }}>
                            <CircularProgress
                                variant="determinate"
                                value={inProgressPercentage}
                                color="info"
                                size={80}
                                thickness={6}
                            />
                            <Box
                                sx={{
                                    top: 0,
                                    left: 0,
                                    bottom: 0,
                                    right: 0,
                                    position: "absolute",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                }}
                            >
                                <Typography variant="h6" component="div" color="blue" fontWeight="bold">
                                    {`${Math.round(inProgressPercentage)}%`}
                                </Typography>
                            </Box>
                        </Box>
                        <Box sx={{ position: "relative", display: "inline-flex", textAlign: "center" }}>
                            <CircularProgress
                                variant="determinate"
                                value={notStartedPercentage}
                                color="error"
                                size={80}
                                thickness={6}
                            />
                            <Box
                                sx={{
                                    top: 0,
                                    left: 0,
                                    bottom: 0,
                                    right: 0,
                                    position: "absolute",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                }}
                            >
                                <Typography variant="h6" component="div" color="red" fontWeight="bold">
                                    {`${Math.round(notStartedPercentage)}%`}
                                </Typography>
                            </Box>
                        </Box>
                    </Stack>
                </Box>

                <Box sx={{ backgroundColor: "#fff", borderRadius: "12px", padding: "20px" }}>
                    <Box sx={{display: "flex"}}>
                        <TaskOutlinedIcon sx={{color: "#A1A3AB", marginRight: "5px"}} />
                        <Typography fontWeight="medium" gutterBottom sx={{color:"#F24E1E", fontSize: "16px"}}>
                            Completed Tasks
                        </Typography>
                    </Box>
                    {completedTasks.map((task) => (
                        <TaskCard key={task._id} {...task} />
                    ))}
                </Box>
            </Box>
        </Box>
    );
};

export default Tasks;
