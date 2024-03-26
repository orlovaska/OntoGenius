import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { ModelTypeEnum } from './Workspace';

interface IActionControllerProps {
    modelType: ModelTypeEnum
    ontologyId: number
}


const ActionController: React.FC<IActionControllerProps> = (
    props
) => {

  return (
    <></>
  );
}

export default ActionController;
