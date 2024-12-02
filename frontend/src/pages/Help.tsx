import React from "react";
import { Box, Typography, Button, Divider } from "@mui/material";

const Help: React.FC = () => {
    return (
        <Box sx={{ padding: 4, maxWidth: "1000px", margin: "auto" }}>
            <Typography variant="h4" gutterBottom>
                Help Center
            </Typography>
            <Typography variant="h5" sx={{ fontWeight: "bold" }} gutterBottom>
                Frequently Asked Questions (FAQ)
            </Typography>
            <Divider sx={{ marginBottom: 3 }} />
            <Box sx={{ marginBottom: 3 }}>
                <Typography variant="h6" gutterBottom>
                    1. How do I create a task?
                </Typography>
                <Typography variant="body1" paragraph>
                    To create a new task, click on the "Add" button in the top bar, fill out the task details, and hit save.
                </Typography>
            </Box>
            <Box sx={{ marginBottom: 3 }}>
                <Typography variant="h6" gutterBottom>
                    2. How can I delete a task?
                </Typography>
                <Typography variant="body1" paragraph>
                    You can delete a task by clicking the trash icon next to the task in the task list.
                </Typography>
            </Box>
            <Box sx={{ marginBottom: 3 }}>
                <Typography variant="h6" gutterBottom>
                    3. How do I edit a task?
                </Typography>
                <Typography variant="body1" paragraph>
                    To edit a task, click on the task and update the details. Don't forget to save your changes.
                </Typography>
            </Box>

            <Button variant="outlined" color="primary" sx={{ marginTop: 3 }} onClick={() => alert("Contact support")}>
                Contact Support
            </Button>
        </Box>
    );
};

export default Help;
