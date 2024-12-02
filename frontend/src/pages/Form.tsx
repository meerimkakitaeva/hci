import React from 'react';
import {
    Box,
    TextField,
    Typography,
    Button,
    FormControlLabel,
    Radio,
    RadioGroup,
} from '@mui/material';

const Form = () => {
    return (
        <Box
            sx={{
                maxWidth: 600,
                margin: '100px auto',
                padding: 3,
                border: '1px solid #ccc',
                borderRadius: 4,
                boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
                backgroundColor: '#fff',
            }}
        >
            <Typography variant="h6" sx={{ marginBottom: 2, fontWeight: 'bold' }}>
                Add New Task
            </Typography>

            <TextField
                fullWidth
                label="Title"
                variant="outlined"
                sx={{ marginBottom: 2 }}
            />

            <TextField
                fullWidth
                type="date"
                label="Date"
                InputLabelProps={{ shrink: true }}
                variant="outlined"
                sx={{ marginBottom: 2 }}
            />

            <Typography variant="subtitle1" sx={{ marginBottom: 1 }}>
                Priority
            </Typography>
            <RadioGroup row>
                <FormControlLabel
                    value="Extreme"
                    control={<Radio sx={{ color: 'red' }} />}
                    label="Extreme"
                />
                <FormControlLabel
                    value="Moderate"
                    control={<Radio sx={{ color: 'blue' }} />}
                    label="Moderate"
                />
                <FormControlLabel
                    value="Low"
                    control={<Radio sx={{ color: 'green' }} />}
                    label="Low"
                />
            </RadioGroup>


            <TextField
                fullWidth
                label="Task Description"
                variant="outlined"
                multiline
                rows={4}
                sx={{ marginBottom: 2 }}
            />

            <Button
                fullWidth
                variant="contained"
                color="primary"
                sx={{ textTransform: 'none' }}
            >
                Done
            </Button>
        </Box>
    );
};

export default Form;
