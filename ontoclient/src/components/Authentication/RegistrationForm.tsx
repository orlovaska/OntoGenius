import axios from "axios";
import React, { useState } from "react";
import { LoginResponse } from "../../models/response/LoginResponse";
import AuthService from "../../services/AuthService";
import { AUTH_CONTROLLER_ROUTE, LOGIN_ROUTE } from "../../utils/consts";
import TextField from "@mui/material/TextField";
import { useTranslation } from "react-i18next";
import { Button, Container } from "@mui/material";
import "./RegistrationForm.css";
import { BrowserRouter, Link, Navigate } from "react-router-dom";
import { isValidEmail, isValidPassword } from "../../utils/inputValidation";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { userSlice } from "../../store/reducers/UserSlice";
import { useNavigate } from "react-router-dom";

interface IRegistrationFormProps {}

const RegistrationForm: React.FC<IRegistrationFormProps> = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const { t } = useTranslation("common");
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    //TODO сделать обработку ошибок
    const [showError, setShowError] = useState<boolean>(false);
    const [error, setError] = useState<string>("");

    const handleUsernameChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        setUsername(event.target.value);
    };

    const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(event.target.value);
    };

    const handleSubmit = async () => {
        //debugger;
        if (!isValidEmail(email)) {
            return;
        }
        if (!isValidPassword(password)) {
            return;
        }
        // TODO - сделать запрос на регистрацию
        AuthService.registration(username, email, password)
            .then((response) => {
                AuthService.login(username, password).then((response) => {
                    const { login } = userSlice.actions;
                    dispatch(login(response.data.user));
                });
            })
            .catch((error) => {
                setError(error);
                setShowError(true);
                console.log("AuthService запрос. Ошибка", error);
            });
    };

    const handlePasswordChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        setPassword(event.target.value);
    };

    const redirectToLogin = () => {
        navigate(LOGIN_ROUTE, { replace: true });
    };

    return (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                minHeight: "100vh",
            }}
        >
            <div
                style={{
                    width: "300px",
                    padding: "20px",
                    backgroundColor: "#f0f0f0",
                    textAlign: "center",
                }}
            >
                <h2>{t("auth.registration")}</h2>
                <TextField
                    fullWidth
                    id="username"
                    label={t("auth.username")}
                    variant="outlined"
                    size="small"
                    onChange={handleUsernameChange}
                    sx={{ mb: 2 }} // Добавление отступа снизу
                />
                <TextField
                    fullWidth
                    id="email"
                    label={t("auth.email")}
                    variant="outlined"
                    size="small"
                    onChange={handleEmailChange}
                    sx={{ mb: 2 }} // Добавление отступа снизу
                />
                <TextField
                    fullWidth
                    id="password"
                    label={t("auth.password")}
                    variant="outlined"
                    size="small"
                    onChange={handlePasswordChange}
                    sx={{ mb: 2 }} // Добавление отступа снизу
                />
                <Button
                    fullWidth
                    variant="contained"
                    color="primary"
                    size="small"
                    onClick={handleSubmit}
                    sx={{ mb: 2 }} // Добавление отступа снизу
                >
                    {t("auth.signUp")}
                </Button>
                <p>
                    {t("auth.alreadyHaveAccount")}{" "}
                    <Link to={LOGIN_ROUTE}>{t("auth.signIn")}</Link>
                </p>
            </div>
        </div>
    );
};

export default RegistrationForm;
