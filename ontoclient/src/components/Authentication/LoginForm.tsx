import React, { useState } from "react";
import { REGISTRATION_ROUTE } from "../../utils/consts";
import { Link } from "react-router-dom";
import { TextField, Button } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import AuthService from "../../services/AuthService";
import { userSlice } from "../../store/reducers/UserSlice";
import { isValidEmail, isValidPassword } from "../../utils/inputValidation";

interface ILoginProps {}

const LoginForm: React.FC<ILoginProps> = () => {
    const { t } = useTranslation("common");
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const dispatch = useAppDispatch();

    const handleSubmit = async () => {
        //debugger;
        if (!isValidPassword(password)) {
            return;
        }
        // TODO - сделать запрос на регистрацию
        AuthService.login(username, password)
            .then((response) => {
                const { login } = userSlice.actions;
                dispatch(login(response.data.user));
            })
            .catch((error) => {
                // setError(error);
                // setShowError(true);
                console.log("AuthService запрос. Ошибка", error);
            });
    };

    const handleUsernameChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        setUsername(event.target.value);
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
                <h2>{t("auth.login")}</h2>
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
                    id="password"
                    label={t("auth.password")}
                    type="password"
                    variant="outlined"
                    size="small"
                    sx={{ mb: 2 }} // Добавление отступа снизу
                />
                <Button
                    fullWidth
                    variant="contained"
                    color="primary"
                    size="small"
                    sx={{ mb: 2 }} // Добавление отступа снизу
                >
                    {t("auth.signIn")}
                </Button>
                <p>
                    {t("auth.notHaveAccountYet")}{" "}
                    <Link to={REGISTRATION_ROUTE}>{t("auth.signUp")}</Link>
                </p>
            </div>
        </div>
    );
};

export default LoginForm;
