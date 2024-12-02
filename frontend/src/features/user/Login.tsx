import React, {useEffect, useState} from "react";
import {Alert, AlertTitle, Box, FormControl, TextField, Typography,} from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import {useLocation, useNavigate} from "react-router-dom";
import SendIcon from "@mui/icons-material/Send";
import {IUserLogin} from "../../types";
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {signIn} from "./userThunk";

const InputField = ({
                        name,
                        value,
                        onChange,
                        label,
                        type = "text",
                    }: {
    name: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    label: string;
    type?: string;
}) => (
    <FormControl fullWidth sx={{mb: 2}}>
        <TextField
            name={name}
            value={value}
            onChange={onChange}
            label={label}
            variant="outlined"
            type={type}
            required
        />
    </FormControl>
);

const Login = () => {
    const {pathname} = useLocation();
    const dispatch = useAppDispatch();
    const {createLoading} = useAppSelector((state) => state.userStore);
    const navigate = useNavigate();
    const [error, setError] = useState(false);
    const [userState, setUserData] = useState<IUserLogin>({
        username: "",
        password: "",
    });

    useEffect(() => {
        setError(false);
    }, [pathname]);

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {value, name} = e.target;
        setUserData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const onSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(false);

        if (pathname === "/login") {
            try {
                await dispatch(signIn(userState)).unwrap();
                navigate("/tasks");
            } catch (e) {
                setError(true);
            }
        }

        setUserData({
            username: "",
            password: "",
        });
    };

    const onClickLink = () => {
        if (pathname === "/") {
            navigate("/login");
        } else {
            navigate("/");
        }
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
                <Typography variant="h4" sx={{mb: 3, fontWeight: "bold", textAlign: "center"}}>
                    {pathname === "/login" ? "Sign In" : "Sign Up"}
                </Typography>
                {error && (
                    <Alert severity="error" sx={{mb: 2}}>
                        <AlertTitle>Error</AlertTitle>
                        Wrong username or password
                    </Alert>
                )}
                <form onSubmit={onSubmit}>
                    <InputField
                        name="username"
                        value={userState.username}
                        onChange={onChange}
                        label="Enter Username"
                    />
                    <InputField
                        name="password"
                        value={userState.password}
                        onChange={onChange}
                        label="Enter Password"
                        type="password"
                    />
                    <LoadingButton
                        type="submit"
                        variant="contained"
                        color="primary"
                        fullWidth
                        sx={{
                            mt: 2,
                            backgroundColor: "#f44336",
                            "&:hover": {backgroundColor: "#d32f2f"},
                        }}
                        loading={createLoading}
                        loadingPosition="end"
                        endIcon={<SendIcon/>}
                    >
                        {pathname === "/login" ? "Login" : "Sign Up"}
                    </LoadingButton>
                </form>
                <Typography variant="body2" sx={{mt: 2, textAlign: "center"}}>
                    {pathname === "/login" ? (
                        <>
                            Don't have an account?{" "}
                            <span
                                onClick={onClickLink}
                                style={{color: "#007bff", cursor: "pointer"}}
                            >
                Sign Up
              </span>
                        </>
                    ) : (
                        <>
                            Already have an account?{" "}
                            <span
                                onClick={onClickLink}
                                style={{color: "#007bff", cursor: "pointer"}}
                            >
                Sign In
              </span>
                        </>
                    )}
                </Typography>
            </Box>
        </Box>
    );
};

export default Login;
