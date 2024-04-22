import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { IClass } from '../../../models/IClass';

interface IConfirmDeletionDialogProps {
    isOpen: boolean;
    addOntology: (name: string) => void;
    onClose: () => void;
}


const AddOntologyDialog: React.FC<IConfirmDeletionDialogProps> = (
    props
) => {

  return (
      <Dialog
        open={props.isOpen}
        onClose={props.onClose}
        PaperProps={{
          component: 'form',
          onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
            event.preventDefault();
            const formData = new FormData(event.currentTarget);
            const formJson = Object.fromEntries((formData as any).entries());
            
            const name = formJson.Name;
            // TODO - сделать выбор и передачу класса
            props.addOntology(name)
            props.onClose();
          },
        }}
      >
        <DialogTitle>Добавление новой онтологии</DialogTitle>
        <DialogContent>
          <DialogContentText>
          Введите название нового онтологии в поле ниже.
          </DialogContentText>
          <TextField
            autoFocus
            required
            margin="dense"
            id="name"
            name="Name"
            label="Name"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={props.onClose}>Отмена</Button>
          <Button type="submit">Добавить</Button>
        </DialogActions>
      </Dialog>
  );
}

export default AddOntologyDialog;
