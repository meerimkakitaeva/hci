import React from "react";
import { Box, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

interface TaskCardProps {
    _id: string;
    title: string;
    description?: string;
    priority?: string;
    status?: string;
    date?: string;
    user: {
        username: string;
        email: string;
    };
}

const TaskCard: React.FC<TaskCardProps> = ({ _id, title, description, priority, status, date }) => {
    const navigate = useNavigate();

    const getPriorityColor = (priority: string | undefined) => {
        switch (priority) {
            case "extreme":
                return "red";
            case "moderate":
                return "blue";
            case "low":
                return "green";
            default:
                return "black";
        }
    };

    const getStatusColor = (status: string | undefined) => {
        switch (status) {
            case "completed":
                return "green";
            case "in progress":
                return "blue";
            default:
                return "grey";
        }
    };

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                backgroundColor: "#fff",
                borderRadius: "12px",
                boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                padding: "16px",
                marginBottom: "16px",
                cursor: "pointer"
            }}
            onClick={() => navigate(`/tasks/${_id}`)}
        >
            <Typography variant="h6" fontWeight="bold">
                {title}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ marginBottom: "8px" }}>
                {description ? (description.length > 100 ? `${description.substring(0, 100)}...` : description) : "No description"}
            </Typography>
            <Box sx={{display: "flex"}}>
                <Typography variant="caption" sx={{ marginRight: "20px" }} >
                    Priority: <span style={{ color: getPriorityColor(priority) }}>{priority || "N/A"}</span>
                </Typography>
                <Typography variant="caption" sx={{ marginRight: "20px" }}>
                    Status: <span style={{ color: getStatusColor(status) }}>{status || "N/A"}</span>
                </Typography>
                <Typography variant="caption" color="text.secondary">
                    Due date: {date || "N/A"}
                </Typography>
            </Box>
        </Box>
    );
};

export default TaskCard;
