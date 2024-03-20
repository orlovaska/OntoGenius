import axios from 'axios';
import React from 'react';
import { REGISTRATION_ROUTE } from '..//..//utils/consts';
import { TextField, Button } from '@mui/material';
import { t } from 'i18next';
// import "../LoginForm.css";
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';

interface ILoginProps { }

const LoginForm: React.FC<ILoginProps> = () => {
    const dispatch = useAppDispatch();
    const {user} = useAppSelector(state => state.userReducer);
    const { t } = useTranslation("common");
    // axios.post<any>(
    //     `/api${AUTH_CONTROLLER_ROUTE}/register`, { username: 'chelovekcelo', email: 'example@email.com', password: 'Password123!' },
    // )
    //     .then((response) => {
    //         console.log(response);
    //     })
    //     .catch((error) => {
    //         console.error('Error log:', error);
    //     });
    console.log("Login Form");
    
    return (
        <div className="login-form-container">
            <TextField
                id="outlined-basic"
                label={t("auth.username")}
                variant="outlined"
                size="small"
            />
            <TextField
                id="outlined-basic"
                label={t("auth.password")}
                variant="outlined"
                size="small"
            />
            <Button size="small" color="primary">
                {t("auth.signIn")}
            </Button>
            <p className="link-container">
              <label>{t("auth.notHaveAccountYet")} </label>
              <Link to={REGISTRATION_ROUTE}>{t("auth.signUp")}</Link>
            </p>
        </div>
    );
};

export default LoginForm;
