import React, { useState } from "react";
import { Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import { IClass } from "../../../models/IClass";
import ConfirmDeletionDialog from "../Dialogs/ConfirmDeletionDialog";
import { IProperty } from "../../../models/IProperty";
import AddPropertyDialog from "../Dialogs/AddPropertyDialog";
import EditIcon from "@mui/icons-material/Edit";
import EditPropertyDialog from "../Dialogs/EditPropertyDialog";

interface IClassTreeActionButtonsProps {
    //TODO свойства для диалога добавления, убрать в контроллер после
    currentProperty: IProperty;
    editProperty: (
        name: string,
        parentPropertyId: number,
        domainClassId: number,
        rangeClassId: number
    ) => void;
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
    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

    const openEditDialog = () => {
        setIsEditDialogOpen(true);
    };

    const closeEditClassDialog = () => {
        setIsEditDialogOpen(false);
    };

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

            <Button startIcon={<EditIcon />} onClick={openEditDialog} />

            <EditPropertyDialog
                currentProperty={props.currentProperty}
                isOpen={isEditDialogOpen}
                editProperty={(name, parentClassId) => props.editProperty(name, parentClassId, props.currentProperty.domainClassId, props.currentProperty.rangeClassId)}
                onClose={closeEditClassDialog}
            />
        </div>
    );
};

export default PropertyTreeActionButtons;
