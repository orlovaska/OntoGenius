import React, { useState } from "react";
import { Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import { IClass } from "../../../models/IClass";
import ConfirmDeletionDialog from "../Dialogs/ConfirmDeletionDialog";
import AddClassDialog from "../Dialogs/AddClassDialog";
import EditIcon from "@mui/icons-material/Edit";
import EditClassDialog from "../Dialogs/EditClassDialog";

interface IClassTreeActionButtonsProps {
    currentClass: IClass;
    addClass: (name: string) => void; // Метод для обработки нажатия кнопки добавления
    editClass: (name: string, parentClassId: number) => void; // Метод для обработки нажатия кнопки добавления
    deleteClass: () => void; // Метод для обработки нажатия кнопки удаления с передачей ID элемента
}

const ClassTreeActionButtons: React.FC<IClassTreeActionButtonsProps> = (
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

    return (
        // <div style={{backgroundColor: "rgb(224, 224, 224)"}}>
        <div>
            <Button startIcon={<AddIcon />} onClick={openAddDialog} />

            <AddClassDialog
                currentClass={props.currentClass}
                isOpen={isAddDialogOpen}
                addClass={props.addClass}
                onClose={closeAddDialog}
            />

            <Button
                startIcon={<DeleteIcon />}
                onClick={openDeleteConfirmDialog}
            />

            <ConfirmDeletionDialog
                entityName={props.currentClass?.name}
                isOpen={isDeleteDialogOpen}
                onDeletionConfirm={props.deleteClass}
                onClose={closeDeleteConfirmDialog}
            />
            <Button
                startIcon={<EditIcon />}
                onClick={openEditDialog}
            />

            <EditClassDialog
                currentClass={props.currentClass}
                isOpen={isEditDialogOpen}
                editClass={props.editClass}
                onClose={closeEditClassDialog}
            />
        </div>
    );
};

export default ClassTreeActionButtons;
