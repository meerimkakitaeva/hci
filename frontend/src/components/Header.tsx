import React from "react";
import { AppBar, Box, Toolbar, Typography, IconButton } from "@mui/material";
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
            <AppBar
                position="fixed"
                sx={{
                    top: 0,
                    left: 0,
                    width: "100%",
                    backgroundColor: "#F8F8F8",
                    color: "black",
                    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.15)",
                    padding: "10px 20px",
                    zIndex: 1200,
                }}
            >
                <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
                    <Box>
                        <Typography variant="h5" fontWeight="bold">
                            Focusflow 🎯
                        </Typography>
                    </Box>

                    <IconButton color="inherit" onClick={() => dispatch(onOpen())}>
                        <AddCircleIcon sx={{ fontSize: 35, color: "#FF6767", marginRight: "10px" }} />
                    </IconButton>

                    <Box sx={{ display: "flex", alignItems: "center", gap: "10px" }}>
                        <Box sx={{ color: "#3ABEFF", display: "flex", flexDirection: "column", alignItems: "center" }}>
                            <CalendarTodayIcon sx={{ fontSize: 24, color: "#FF6767" }} />
                            <Typography variant="body1">{getCurrentDate()}</Typography>
                        </Box>
                    </Box>
                </Toolbar>
            </AppBar>

            <Box sx={{ marginTop: "80px" }}>
            </Box>
        </Box>
    );
};

export default Header;
