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
    const { user } = useAppSelector((state) => state.userReducer);
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
                console.log("AuthService registration запрос", response);

                AuthService.login(username, password).then((response) => {
                    console.log("AuthService login запрос", response);
                    const { login } = userSlice.actions;
                    console.log("Был dispatch login");

                    dispatch(login(response.data.user));
                    console.log("user из store: ", user);
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
        navigate(LOGIN_ROUTE, {replace: true});
    };

    return (
        <div className="registration-form-container">
            <TextField
                id="outlined-basic"
                label={t("auth.username")}
                variant="outlined"
                size="small"
                onChange={handleUsernameChange}
            />
            <TextField
                id="outlined-basic"
                label={t("auth.email")}
                variant="outlined"
                size="small"
                onChange={handleEmailChange}
            />
            <TextField
                id="outlined-basic"
                label={t("auth.password")}
                variant="outlined"
                size="small"
                // type="password"
                onChange={handlePasswordChange}
            />
            <Button size="small" color="primary" onClick={handleSubmit}>
                {t("auth.signUp")}
            </Button>
            <p className="link-container">
                <label>{t("auth.alreadyHaveAccount")} </label>
                <Link to={LOGIN_ROUTE}>{t("auth.signIn")}</Link>
                <Button onClick={redirectToLogin}>{t("auth.signIn")}</Button>
            </p>
        </div>
    );
};

export default RegistrationForm;
