import React, { useEffect } from "react";
import {
    Avatar,
    Box,
    Divider,
    Drawer,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Typography,
} from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CategoryIcon from "@mui/icons-material/Category";
import SettingsIcon from "@mui/icons-material/Settings";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import LogoutIcon from "@mui/icons-material/Logout";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { fetchTasks } from "../features/tasks/tasksThunk";
import { useNavigate, useLocation } from "react-router-dom";

const menuItems = [
    { text: "Dashboard", icon: <DashboardIcon />, link: "/tasks" },
    { text: "Vital Task", icon: <CheckCircleIcon />, link: "/vital-task" },
    { text: "My Task", icon: <CheckCircleIcon />, link: "/my-task" },
    { text: "Task Categories", icon: <CategoryIcon />, link: "/task-categories" },
    { text: "Settings", icon: <SettingsIcon />, link: "/settings" },
    { text: "Help", icon: <HelpOutlineIcon />, link: "/help" },
];

const Sidebar = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const { tasks } = useAppSelector((state) => state.tasksStore);

    useEffect(() => {
        const token = localStorage.getItem("token");

        if (!token) {
            navigate("/");
        }

        dispatch(fetchTasks());
    }, [dispatch, navigate]);

    return (
        <Drawer
            variant="permanent"
            sx={{
                width: 250,
                flexShrink: 0,
                "& .MuiDrawer-paper": {
                    width: 250,
                    boxSizing: "border-box",
                    backgroundColor: "#1E1E2F",
                    color: "white",
                },
            }}
        >
            <Box sx={{ textAlign: "center", padding: "20px" }}>
                <Avatar
                    alt="User Avatar"
                    src="https://w7.pngwing.com/pngs/244/76/png-transparent-avatar-male-man-person-profile-user-website-website-internet-icon.png"
                    sx={{ width: 80, height: 80, margin: "0 auto" }}
                />
                {tasks.length > 0 && (
                    <>
                        <Typography variant="h6" sx={{ marginTop: "10px", fontWeight: "bold" }}>
                            {tasks[0]?.user?.username || "User Name"}
                        </Typography>
                        <Typography variant="body2" sx={{ color: "#A5A5A5" }}>
                            {tasks[0]?.user?.email || "user@example.com"}
                        </Typography>
                    </>
                )}
            </Box>
            <Divider sx={{ borderColor: "#4D4D65" }} />
            <List>
                {menuItems.map((item, index) => (
                    <ListItem key={index} disablePadding>
                        <ListItemButton
                            onClick={() => navigate(item.link)}
                            sx={{
                                position: "relative",
                                color: location.pathname === item.link ? "white" : "#A5A5A5",
                                backgroundColor: location.pathname === item.link ? "#333344" : "transparent",
                                "&::before": {
                                    content: '""',
                                    position: "absolute",
                                    left: 0,
                                    top: 0,
                                    height: "100%",
                                    width: "5px",
                                    backgroundColor: location.pathname === item.link ? "#FF6767" : "transparent",
                                },
                                "&:hover": {
                                    backgroundColor: "#444455",
                                },
                            }}
                        >
                            <ListItemIcon
                                sx={{
                                    color: location.pathname === item.link ? "white" : "#A5A5A5",
                                }}
                            >
                                {item.icon}
                            </ListItemIcon>
                            <ListItemText primary={item.text} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
            <Box sx={{ position: "absolute", bottom: 20, width: "100%" }}>
                <Divider sx={{ borderColor: "#4D4D65" }} />
                <ListItemButton
                    onClick={() => {
                        localStorage.removeItem("token");
                        navigate("/");
                    }}
                    sx={{
                        justifyContent: "center",
                        color: "white",
                    }}
                >
                    <ListItemIcon sx={{ color: "white" }}>
                        <LogoutIcon />
                    </ListItemIcon>
                    <ListItemText primary="Logout" />
                </ListItemButton>
            </Box>
        </Drawer>
    );
};

export default Sidebar;
