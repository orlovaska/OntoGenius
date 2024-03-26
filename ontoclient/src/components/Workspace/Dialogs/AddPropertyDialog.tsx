import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Autocomplete from "@mui/material/Autocomplete";
import { IClass } from "../../../models/IClass";
import { useEffect, useState } from "react";
import ClassService from "../../../services/ClassService";
import { IProperty } from "../../../models/IProperty";

interface IConfirmDeletionDialogProps {
    parentProperty: IProperty;
    isOpen: boolean;
    addProperty: (
        name: string,
        domainClassId: number,
        rangeClassId: number
    ) => void;
    onClose: () => void;
}

const AddPropertyDialog: React.FC<IConfirmDeletionDialogProps> = (props) => {
    const [classes, setClasses] = useState<IClass[]>([]);
    const [selectedDomainClass, setSelectedDomainClass] =
        useState<IClass | null>(null);
    const [selectedRangeClass, setSelectedRangeClass] = useState<IClass | null>(
        null
    );
    const [name, setName] = useState<string>("");

    useEffect(() => {
        const fetchClasses = async () => {
            if (props.parentProperty?.ontologyId) {
                try {
                    ClassService.getClassesByOntologyId(props.parentProperty?.ontologyId).then(
                        (response) => {
                            setClasses(response.data.classes);
                        }
                    );
                } catch (error) {
                    //TODO - сделать обработку ошибок
                    console.error("Ошибка при получении классов:", error);
                }
            }
        };

        fetchClasses();
    }, [props.parentProperty]);

    const handleAddProperty = () => {
        if (selectedDomainClass && selectedRangeClass) {
            props.addProperty(
                name,
                selectedDomainClass.id,
                selectedRangeClass.id
            );
            setSelectedDomainClass(null)
            setSelectedRangeClass(null)
            setName("")
            props.onClose();
        }
    };

    return (
        <Dialog open={props.isOpen} onClose={props.onClose}>
            <DialogTitle>
                Добавление дочернего свойства к {props.parentProperty?.name}
            </DialogTitle>
            <DialogContent>
                <TextField
                    autoFocus
                    required
                    margin="dense"
                    id="name"
                    name="Название"
                    label="Название"
                    fullWidth
                    variant="standard"
                    value={name}
                    onChange={(newValue) => {
                        setName(newValue.target.value);
                    }}
                />

                <Autocomplete
                    options={classes}
                    getOptionLabel={(option) => option.name}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            label="Исходный класс *"
                            variant="standard"
                        />
                    )}
                    value={selectedDomainClass}
                    onChange={(event, newValue) => {
                        setSelectedDomainClass(newValue);
                    }}
                    filterOptions={(options, { inputValue }) =>
                        options.filter((option) =>
                            option.name
                                .toLowerCase()
                                .includes(inputValue.toLowerCase())
                        )
                    }
                />

                <Autocomplete
                    options={classes}
                    getOptionLabel={(option) => option.name}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            label="Целевой класс *"
                            variant="standard"
                        />
                    )}
                    value={selectedRangeClass}
                    onChange={(event, newValue) => {
                        setSelectedRangeClass(newValue);
                    }}
                    filterOptions={(options, { inputValue }) =>
                        options.filter((option) =>
                            option.name
                                .toLowerCase()
                                .includes(inputValue.toLowerCase())
                        )
                    }
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={props.onClose}>Отмена</Button>
                <Button type="submit" onClick={handleAddProperty}>
                    Добавить
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default AddPropertyDialog;
