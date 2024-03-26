import React from "react";
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { IClass } from "../../../models/IClass";
import { IProperty } from "../../../models/IProperty";

interface IConfirmDeletionDialogProps {
    entityName: string
    isOpen: boolean;
    onDeletionConfirm: () => void;
    onClose: () => void;
}

const ConfirmDeletionDialog: React.FC<IConfirmDeletionDialogProps> = (
    props
) => {
    const onConfirm = () => {
        props.onDeletionConfirm();
        props.onClose();
    };


    return (
        <Dialog
            open={props.isOpen}
            onClose={props.onClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">
                {"Вы уверены, что хотите удалить это свойство?"}
            </DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    При удалении элемента "{props.entityName}" все дочерние элементы будут удалены. Это действие
                    нельзя будет отменить. 
                </DialogContentText>
                <DialogContentText id="alert-dialog-description">
                    Пожалуйста, подтвердите ваш выбор.
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={onConfirm}>Отмена</Button>
                <Button onClick={onConfirm} autoFocus>
                    Удалить
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default ConfirmDeletionDialog;
