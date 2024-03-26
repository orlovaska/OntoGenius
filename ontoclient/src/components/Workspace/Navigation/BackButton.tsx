import React from "react";
import { Button } from "@mui/material";
import { ModelTypeEnum } from "../Workspace";
import OntologyService from "../../../services/OntologyService";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

interface IDownloadReportButtonProps {
    // ontologyId: number;
}

const BackButton: React.FC<IDownloadReportButtonProps> = (props) => {
    const goBack = () => {};

    return (
        <Button
            startIcon={<ArrowBackIcon sx={{ color: 'rgba(0, 0, 0, 0.54)' }}/>}
            variant="outlined"
            color="inherit"
            size="large"
            onClick={goBack} // Вызываем метод downloadReport при клике
            sx={{
                marginRight: "8px",
                width: "20px",
                marginLeft: "10px",
                borderColor: "rgba(0, 0, 0, 0.12)",
            }} // Добавляем отступ справа
        />
    );
};

export default BackButton;
