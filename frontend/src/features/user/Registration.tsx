import React, { useState } from "react";
import {
    Alert,
    AlertTitle,
    Box,
    Button,
    Checkbox,
    FormControl,
    FormControlLabel,
    TextField,
    Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { IUserMutation } from "../../types";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { signUp } from "./userThunk";

const Registration = () => {
    const dispatch = useAppDispatch();
    const { createLoading } = useAppSelector((state) => state.userStore);
    const navigate = useNavigate();

    const [userState, setUserState] = useState<IUserMutation>({
        username: "",
        email: "",
        password: "",
    });

    const [error, setError] = useState(false);
    const [agreeTerms, setAgreeTerms] = useState(false);

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value, name } = e.target;

        setUserState((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const onSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!agreeTerms) {
            setError(true);
            return;
        }

        setError(false);

        try {
            await dispatch(signUp(userState)).unwrap();
            navigate("/tasks");
        } catch (e) {
            setError(true);
        }

        setUserState({
            username: "",
            email: "",
            password: "",
        });
    };

    return (
        <Box
            sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100vh",
            }}
        >
            <Box
                sx={{
                    width: "600px",
                    backgroundColor: "#fff",
                    boxShadow: 3,
                    borderRadius: "10px",
                    padding: "30px",
                }}
            >
                <Typography variant="h4" sx={{ mb: 3, fontWeight: "bold", textAlign: "center" }}>
                    Sign Up
                </Typography>
                {error && (
                    <Alert severity="error" sx={{ mb: 2 }}>
                        <AlertTitle>Error</AlertTitle>
                        Please agree to the terms or check your input!
                    </Alert>
                )}
                <form onSubmit={onSubmit}>
                    <FormControl fullWidth sx={{ mb: 2 }}>
                        <TextField
                            name="username"
                            value={userState.username}
                            onChange={onChange}
                            label="Enter Username"
                            variant="outlined"
                            required
                        />
                    </FormControl>
                    <FormControl fullWidth sx={{ mb: 2 }}>
                        <TextField
                            name="email"
                            value={userState.email}
                            onChange={onChange}
                            label="Enter Email"
                            type="email"
                            variant="outlined"
                            required
                        />
                    </FormControl>
                    <FormControl fullWidth sx={{ mb: 2 }}>
                        <TextField
                            name="password"
                            value={userState.password}
                            onChange={onChange}
                            label="Enter Password"
                            type="password"
                            variant="outlined"
                            required
                        />
                    </FormControl>
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={agreeTerms}
                                onChange={() => setAgreeTerms(!agreeTerms)}
                                color="primary"
                            />
                        }
                        label="I agree to all terms"
                    />
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        fullWidth
                        sx={{
                            mt: 2,
                            backgroundColor: "#f44336",
                            "&:hover": { backgroundColor: "#d32f2f" },
                        }}
                        disabled={createLoading}
                    >
                        Register
                    </Button>
                </form>
                <Typography variant="body2" sx={{ mt: 2, textAlign: "center" }}>
                    Already have an account?{" "}
                    <span
                        style={{ color: "#007bff", cursor: "pointer" }}
                        onClick={() => navigate("/login")}
                    >
                        Sign In
                    </span>
                </Typography>
            </Box>
        </Box>
    );
};

export default Registration;
