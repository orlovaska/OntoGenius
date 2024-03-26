import React from "react";
import { Button } from "@mui/material";
import { ModelTypeEnum } from "../Workspace";
import OntologyService from "../../../services/OntologyService";
import FileDownloadIcon from "@mui/icons-material/FileDownload";

interface IDownloadReportButtonProps {
    ontologyId: number;
}

const DownloadReportButton: React.FC<IDownloadReportButtonProps> = (props) => {
    const downloadReport = () => {
        OntologyService.downloadReport(props.ontologyId);
    };

    return (
        <Button
            startIcon={<FileDownloadIcon sx={{ color: 'rgba(0, 0, 0, 0.54)' }}/>}
            variant="outlined"
            color="inherit"
            size="large"
            onClick={downloadReport} // Вызываем метод downloadReport при клике
            sx={{ marginRight: "8px", borderColor: "rgba(0, 0, 0, 0.12)" }} // Добавляем отступ справа
        />
    );
};

export default DownloadReportButton;
