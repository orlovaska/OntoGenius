import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { IClass } from "../../../models/IClass";
import { useEffect } from "react";

interface IConfirmDeletionDialogProps {
    currentClass: IClass;
    isOpen: boolean;
    editClass: (name: string, parentClassId: number) => void;
    onClose: () => void;
}

const EditClassDialog: React.FC<IConfirmDeletionDialogProps> = (props) => {
    const [name, setName] = React.useState<string>(props.currentClass?.name);

    useEffect(() => {
      setName(props.currentClass?.name);
    }, [props.currentClass]);

    return (
        <Dialog
            open={props.isOpen}
            onClose={props.onClose}
            PaperProps={{
                component: "form",
                onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
                    event.preventDefault();
                    const formData = new FormData(event.currentTarget);
                    const formJson = Object.fromEntries(
                        (formData as any).entries()
                    );

                    const name = formJson.Name;
                    // TODO - сделать выбор и передачу класса
                    props.editClass(name, props.currentClass.parentClassId);
                    props.onClose();
                },
            }}
        >
            <DialogTitle>
                Редактирование класса к {props.currentClass?.name}
            </DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Введите новое название класса.
                </DialogContentText>
                <TextField
                    autoFocus
                    required
                    margin="dense"
                    id="name"
                    name="Name"
                    label="Name"
                    value={name}
                    onChange={(newValue) => {
                        setName(newValue.target.value);
                    }}
                    fullWidth
                    variant="standard"
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={props.onClose}>Отмена</Button>
                <Button type="submit">Обновить</Button>
            </DialogActions>
        </Dialog>
    );
};

export default EditClassDialog;
