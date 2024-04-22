import axios from "axios";
import React, { useEffect } from "react";
import { t } from "i18next";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
// import Ontology from "./Ontology";
import OntologyService from "../../services/OntologyService";
import { useAppSelector } from "../../hooks/redux";
import { IOntology } from "../../models/IOntology";
// import { List } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { GetOntologyResponse } from "../../models/response/GetOntologiesResponse";
import DeleteIcon from "@mui/icons-material/Delete";

interface IOntologyListProps {
    ontologies: IOntology[]
    onOntologyClick: (id: number) => void;
    deleteOntology: (id: number) => void;
}

const OntologyList: React.FC<IOntologyListProps> = (props) => {
    const { t } = useTranslation("common");
    const [checked, setChecked] = React.useState([0]);

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

    const handleDeleteOntology = (event: React.MouseEvent<SVGSVGElement, MouseEvent>, id: number) => {
        event.stopPropagation();
        props.deleteOntology(id)
    }

    const emptyList: JSX.Element = <div style={{ height: 400, width: "40%", margin: "10px" }}>Пустой лист</div>;

    const columns: GridColDef[] = [
        { field: "id", headerName: "ID", width: 100 },
        { field: "name", headerName: "Name", width: 150 },
        { field: "ownerUsername", headerName: "Owner Username", width: 160 },
        {
            field: 'delete', // Указываем поле, которое будет использоваться для этого столбца
            headerName: 'Delete', // Заголовок столбца
            width: 100,
            renderCell: (params) => ( // Используем renderCell для настройки содержимого ячейки
                <DeleteIcon style={{ color: 'grey' }} onClick={(event: React.MouseEvent<SVGSVGElement, MouseEvent>) => handleDeleteOntology(event, params.row.id)} />
            ),
        },
    ];

    console.log(props.ontologies);
    
    return (
        <>
            {/* {ontologies?.length > 0 ? ( */}
                <div style={{ height: 400, width: "40%", margin: "10px", minWidth: 700}}>
                    <DataGrid
                        rows={props.ontologies}
                        columns={columns}
                        onRowClick={(row) => props.onOntologyClick((row.row as IOntology).id)}
                        onRowSelectionModelChange={(rowSelectionModel) => handleToggle(rowSelectionModel[0] as number)}
                        initialState={{
                            pagination: {
                              paginationModel: { page: 0, pageSize: 100 },
                            },
                          }}
                        // checkboxSelection
                    />
                </div>
            {/* ) : (
                emptyList
            )} */}
        </>
    );
};

export default OntologyList;
