import React from "react";
import { AppBar, Toolbar, Typography, IconButton } from "@mui/material";
import { ArrowBack as ArrowBackIcon } from "@mui/icons-material";
import { ModelTypeEnum } from "../Workspace";
import OntologyService from "../../../services/OntologyService";
import SelectModelTypeButtons from "./SelectModelTypeButtons";
import DownloadReportButton from "./DownloadReportButton";
import BackButton from "./BackButton";
import LogoutButton from "../../LogoutButton";

interface INavigationBarProps {
    ontologyId: number;
    onSelectModelType: (modelType: ModelTypeEnum) => void;
    clearOntology: () => void;
}

const NavigationBar: React.FC<INavigationBarProps> = (props) => {
    return (
        <AppBar
            position="static"
            elevation={0}
            style={{ backgroundColor: "#f5f5f5" }}
        >
            <Toolbar>
                <BackButton clearOntology={props.clearOntology}/>
                <SelectModelTypeButtons
                    onSelectModelType={props.onSelectModelType}
                />
                <DownloadReportButton ontologyId={props.ontologyId} />
                <LogoutButton/>
            </Toolbar>
        </AppBar>
    );
};

export default NavigationBar;
