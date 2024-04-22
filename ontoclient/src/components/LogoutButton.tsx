import React from "react";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { userSlice } from "../store/reducers/UserSlice";
import { useAppDispatch } from "../hooks/redux";
import { HOME_ROUTE, LOGIN_ROUTE } from "../utils/consts";
import ExitToAppIcon from '@mui/icons-material/ExitToApp';

interface IDownloadReportButtonProps {}

const LogoutButton: React.FC<IDownloadReportButtonProps> = (props) => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const handleSubmit = async () => {
        const { logout } = userSlice.actions;
        dispatch(logout());
        navigate(LOGIN_ROUTE, { replace: true });
    };

    return (
        <Button
            startIcon={<ExitToAppIcon sx={{ color: "rgba(0, 0, 0, 0.54)" }} />}
            variant="outlined"
            color="inherit"
            size="large"
            onClick={handleSubmit} // Вызываем метод downloadReport при клике
            sx={{
                marginRight: "8px",
                width: "20px",
                marginLeft: "10px",
                borderColor: "rgba(0, 0, 0, 0.12)",
            }} // Добавляем отступ справа
        />
    );
};

export default LogoutButton;
