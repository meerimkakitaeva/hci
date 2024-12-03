import {Box, Divider, IconButton, Typography} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import {ITask} from "../../../types";

interface OneTaskProps {
    task: ITask;
    onDelete: () => void;
    onEdit: () => void;
}

const OneTask: React.FC<OneTaskProps> = ({ task, onDelete, onEdit }) => {
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
                width: 700,
                margin: '0 auto',
                padding: 3,
                border: '1px solid #ccc',
                borderRadius: 4,
                boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
                color: '#747474',
            }}
        >
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    marginBottom: 2,
                }}
            >
                <Box
                    component="img"
                    src="https://www.cflowapps.com/wp-content/uploads/2021/12/diffnce_job_task_process.jpeg"
                    alt="Task"
                    sx={{ width: 150, height: 100, borderRadius: 2, objectFit: 'cover' }}
                />
                <Box sx={{ marginLeft: 2, display: "flex", flexDirection: "column" }}>
                    <Typography variant="h6" sx={{ marginBottom: 1 }}>
                        {task.title}
                    </Typography>
                    <Typography variant="caption">
                        Priority: <span style={{ color: getPriorityColor(task.priority) }}>{task.priority || "N/A"}</span>
                    </Typography>
                    <Typography variant="caption">
                        Status: <span style={{ color: getStatusColor(task.status) }}>{task.status || "N/A"}</span>
                    </Typography>
                    <Typography variant="caption" sx={{ color: '#aaa' }}>
                        Due date: {task.date || 'No Date'}
                    </Typography>
                </Box>
            </Box>

            <Divider sx={{ marginBottom: 2, backgroundColor: '#444' }} />
            <Typography variant="body1" sx={{ marginBottom: 2 }}>
                {task.description || 'No description provided.'}
            </Typography>

            <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                <IconButton color="error" sx={{ marginRight: 1 }} onClick={onDelete}>
                    <DeleteIcon />
                </IconButton>
                <IconButton color="primary" onClick={onEdit}>
                    <EditIcon />
                </IconButton>
            </Box>
        </Box>
    );
};

export default OneTask;
