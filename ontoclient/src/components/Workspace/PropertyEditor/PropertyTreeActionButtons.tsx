import React, { useState } from "react";
import { Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import { IClass } from "../../../models/IClass";
import ConfirmDeletionDialog from "../Dialogs/ConfirmDeletionDialog";
import { IProperty } from "../../../models/IProperty";
import AddPropertyDialog from "../Dialogs/AddPropertyDialog";

interface IClassTreeActionButtonsProps {
    //TODO свойства для диалога добавления, убрать в контроллер после
    currentProperty: IProperty;
    addProperty: (
        name: string,
        domainClassId: number,
        rangeClassId: number
    ) => void; // Метод для обработки нажатия кнопки добавления
    // onDeleteButtonClick: (itemId: number) => void; // Метод для обработки нажатия кнопки удаления с передачей ID элемента
    deleteProperty: () => void; // Метод для обработки нажатия кнопки удаления с передачей ID элемента
}

const PropertyTreeActionButtons: React.FC<IClassTreeActionButtonsProps> = (
    props
) => {
    const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

    const openAddDialog = () => {
        setIsAddDialogOpen(true);
    };

    const openDeleteConfirmDialog = () => {
        setIsDeleteDialogOpen(true);
    };

    const closeAddDialog = () => {
        setIsAddDialogOpen(false);
    };

    const closeDeleteConfirmDialog = () => {
        setIsDeleteDialogOpen(false);
    };

    console.log("currentProperty: ", props.currentProperty);
    
    return (
        // <div style={{backgroundColor: "rgb(224, 224, 224)"}}>
        <div>
            <Button startIcon={<AddIcon />} onClick={openAddDialog} />

            <AddPropertyDialog
                parentProperty={props.currentProperty}
                isOpen={isAddDialogOpen}
                addProperty={props.addProperty}
                onClose={closeAddDialog}
            />

            <Button
                startIcon={<DeleteIcon />}
                onClick={openDeleteConfirmDialog}
            />

            <ConfirmDeletionDialog
                entityName={props.currentProperty?.name}
                isOpen={isDeleteDialogOpen}
                onDeletionConfirm={props.deleteProperty}
                onClose={closeDeleteConfirmDialog}
            />
        </div>
    );
};

export default PropertyTreeActionButtons;
