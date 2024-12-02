import React, {useEffect} from "react";
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
    Typography
} from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CategoryIcon from "@mui/icons-material/Category";
import SettingsIcon from "@mui/icons-material/Settings";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import LogoutIcon from "@mui/icons-material/Logout";
import {useAppDispatch, useAppSelector} from "../app/hooks";
import {fetchTasks} from "../features/tasks/tasksThunk";
import {useNavigate} from "react-router-dom";

const menuItems = [
    {text: "Dashboard", icon: <DashboardIcon/>, link: "#"},
    {text: "Vital Task", icon: <CheckCircleIcon/>, link: "#"},
    {text: "My Task", icon: <CheckCircleIcon/>, link: "#"},
    {text: "Task Categories", icon: <CategoryIcon/>, link: "#"},
    {text: "Settings", icon: <SettingsIcon/>, link: "#"},
    {text: "Help", icon: <HelpOutlineIcon/>, link: "#"},
];

const Sidebar = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const {tasks, fetchLoading} = useAppSelector((state) => state.tasksStore);

    useEffect(() => {
        const token = localStorage.getItem("token");

        if (!token) {
            navigate("/");
        }

        dispatch(fetchTasks());
    }, []);

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
            <Box sx={{textAlign: "center", padding: "20px"}}>
                <Avatar
                    alt="User Name"
                    src="https://w7.pngwing.com/pngs/244/76/png-transparent-avatar-male-man-person-profile-user-website-website-internet-icon.png" // Замените на URL аватара
                    sx={{width: 80, height: 80, margin: "0 auto"}}
                />
                {tasks
                    .map((item) => (
                        <div
                            draggable={true}
                            key={item._id}
                        >
                            {item.user.username}
                        </div>
                    ))}
                <Typography variant="body2" sx={{color: "#A5A5A5"}}>
                    {tasks
                        .map((item) => (
                            <div
                                draggable={true}
                                key={item._id}
                            >
                                {item.user.email}
                            </div>
                        ))}
                </Typography>
            </Box>
            <Divider sx={{borderColor: "#4D4D65"}}/>
            <List>
                {menuItems.map((item, index) => (
                    <ListItem key={index} disablePadding>
                        <ListItemButton sx={{color: "white"}}>
                            <ListItemIcon sx={{color: "white"}}>{item.icon}</ListItemIcon>
                            <ListItemText primary={item.text}/>
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>

            <Box sx={{position: "absolute", bottom: 20, width: "100%"}}>
                <Divider sx={{borderColor: "#4D4D65"}}/>
                <ListItemButton sx={{justifyContent: "center", color: "white"}}>
                    <ListItemIcon sx={{color: "white"}}>
                        <LogoutIcon/>
                    </ListItemIcon>
                    <ListItemText primary="Logout"/>
                </ListItemButton>
            </Box>
        </Drawer>
    );
};

export default Sidebar;
