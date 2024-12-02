import React from "react";
import { AppBar, Box, InputAdornment, TextField, Toolbar, Typography, IconButton } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { onOpen } from "../features/tasks/tasksSlice";
import { useAppDispatch } from "../app/hooks";

const getCurrentDate = () => {
    const today = new Date();
    const day = today.getDate().toString().padStart(2, "0");
    const month = (today.getMonth() + 1).toString().padStart(2, "0");
    const year = today.getFullYear();
    return `${day}/${month}/${year}`;
};

const Header = () => {
    const dispatch = useAppDispatch();

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static" sx={{ backgroundColor: "white", color: "black", boxShadow: "none", padding: "10px 20px" }}>
                <Toolbar sx={{ justifyContent: "space-between" }}>
                    <Box>
                        <Typography variant="h5" fontWeight="bold">
                            Focusflow 🎯
                        </Typography>
                    </Box>

                    <Box sx={{ flexGrow: 1, mx: 2 }}>
                        <TextField
                            fullWidth
                            placeholder="Search your task here..."
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <SearchIcon />
                                    </InputAdornment>
                                ),
                                sx: { borderRadius: "20px", backgroundColor: "#f5f5f5" },
                            }}
                            variant="outlined"
                            sx={{ width: '80%' }}
                        />
                    </Box>

                    {/* Заменяем кнопку Add на иконку */}
                    <IconButton color="inherit" onClick={() => dispatch(onOpen())}>
                        <AddCircleIcon sx={{ fontSize: 35, color: "#FF6767", marginRight:"10px" }} />
                    </IconButton>

                    <Box sx={{ display: "flex", alignItems: "center", gap: "10px" }}>
                        <Box sx={{ color: "#3ABEFF", display: "flex", flexDirection: "column", alignItems: "center" }}>
                            <CalendarTodayIcon sx={{ fontSize: 24, color: "#FF6767" }} />
                            <Typography variant="body1">{getCurrentDate()}</Typography>
                        </Box>
                    </Box>
                </Toolbar>
            </AppBar>
        </Box>
    );
};

export default Header;
