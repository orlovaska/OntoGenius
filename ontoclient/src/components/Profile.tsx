import React, { useState } from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import { IUser } from "../models/IUser";
import { useAppSelector } from "../hooks/redux";
import AuthService from "../services/AuthService";
import { userSlice } from "../store/reducers/UserSlice";
import LogoutButton from "./LogoutButton";

// interface IProfileProps {
//   user: IUser
// }

const Profile: React.FC = () => {
    const { user } = useAppSelector((state) => state.userReducer);
    const [email, setEmail] = useState<string | undefined>(user?.email);
    const [username, setUsername] = useState<string | undefined>(
        user?.username
    );
    const [isEditingEmail, setIsEditingEmail] = useState<boolean>(false);
    const [isEditingUsername, setIsEditingUsername] = useState<boolean>(false);
    const [isChanged, setIsChanged] = useState<boolean>(false);

    const handleEditEmail = () => {
        setIsEditingEmail(true);
    };

    const handleEditUsername = () => {
        setIsEditingUsername(true);
    };

    const handleEmailChange = (value: string) => {
        setEmail(value);
        setIsChanged(true);
    };

    const handleUsernameChange = (value: string) => {
        setUsername(value);
        setIsChanged(true);
    };

    const handleSaveChanges = () => {
        if (username && email && user?.id) {
            AuthService.updateUser(user?.id, username, email)
                .then((response) => {})
                .catch((error) => {
                    console.log("AuthService запрос. Ошибка", error);
                });
        }
        setIsChanged(false);
    };

    return (
        <Box width={400} height={300} padding={2}>
            <div style={{display: "flex"}}>

            <Typography variant="h5" gutterBottom>
                Профиль
            </Typography>
            <div style={{marginLeft: 30}}>
                
            <LogoutButton/>
            </div>
            </div>
            <Box marginBottom={2}>
                <Typography>Email:</Typography>
                {isEditingEmail ? (
                    <Box display="flex" alignItems="center">
                        <TextField
                            value={email}
                            onChange={(e) => handleEmailChange(e.target.value)}
                            fullWidth
                        />
                    </Box>
                ) : (
                    <Box display="flex" alignItems="center">
                        <Typography>{email}</Typography>
                        <Button
                            style={{ margin: 10, fontSize: 10 }}
                            onClick={handleEditEmail}
                        >
                            Редактировать
                        </Button>
                    </Box>
                )}
            </Box>
            <Box marginBottom={2}>
                <Typography>Username:</Typography>
                {isEditingUsername ? (
                    <Box display="flex" alignItems="center">
                        <TextField
                            value={username}
                            onChange={(e) =>
                                handleUsernameChange(e.target.value)
                            }
                            fullWidth
                        />
                    </Box>
                ) : (
                    <Box display="flex" alignItems="center">
                        <Typography>{username}</Typography>
                        <Button
                            style={{ margin: 10, fontSize: 10 }}
                            onClick={handleEditUsername}
                        >
                            Редактировать
                        </Button>
                    </Box>
                )}
            </Box>
            {isChanged && (
                <Button onClick={handleSaveChanges} variant="contained">
                    Сохранить
                </Button>
            )}
        </Box>
    );
};

export default Profile;
