import axios from "axios";
import React, { useEffect } from "react";
import { t } from "i18next";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
// import Ontology from "./Ontology";
import OntologyService from "../services/OntologyService";
import { useAppSelector } from "../hooks/redux";
import { IOntology } from "../models/IOntology";
// import { List } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { GetOntologyResponse } from "../models/response/GetOntologiesResponse";

interface IOntologyListProps {
    onOntologyClick: (id: number) => void;
}

const OntologyList: React.FC<IOntologyListProps> = (props) => {
    const { t } = useTranslation("common");
    const { user } = useAppSelector((state) => state.userReducer);
    const [checked, setChecked] = React.useState([0]);
    const [ontologies, setOntologies] = React.useState<IOntology[]>([]);

    useEffect(() => {
        const fetchOntologies = async () => {
            if (user?.id) {
                try {
                    OntologyService.getOntologiesByUserId(user.id).then((response) => {
                      setOntologies(response.data.ontologies);
                    });
                } catch (error) {
                    //TODO сделать обработку ошибок
                    console.error("Ошибка при получении онтологий:", error);
                }
            }
        };

        fetchOntologies(); // Вызовите функцию при монтировании компонента
    }, [user]);

    const handleToggle = (value: number) => {
        const currentIndex = checked.indexOf(value);
        const newChecked = [...checked];

        if (currentIndex === -1) {
            newChecked.push(value);
        } else {
            newChecked.splice(currentIndex, 1);
        }

        setChecked(newChecked);
    };

    const emptyList: JSX.Element = <div style={{ height: 400, width: "40%", margin: "10px" }}>Пустой лист</div>;

    const columns: GridColDef[] = [
        { field: "id", headerName: "ID", width: 100 },
        { field: "name", headerName: "Name", width: 150 },
        { field: "ownerUsername", headerName: "Owner Username", width: 160 },
    ];

    return (
        <>
            {ontologies?.length > 0 ? (
                <div style={{ height: 400, width: "40%", margin: "10px" }}>
                    <DataGrid
                        rows={ontologies}
                        columns={columns}
                        onRowClick={(row) => props.onOntologyClick((row.row as IOntology).id)}
                        onRowSelectionModelChange={(rowSelectionModel) => handleToggle(rowSelectionModel[0] as number)}
                        initialState={{
                            pagination: {
                              paginationModel: { page: 0, pageSize: 100 },
                            },
                          }}
                        checkboxSelection
                    />
                </div>
            ) : (
                emptyList
            )}
        </>
    );
};

export default OntologyList;
