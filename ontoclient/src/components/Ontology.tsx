import axios from 'axios';
import React from 'react';
import { ListItem, IconButton, ListItemIcon, ListItemButton, Checkbox, ListItemText } from '@mui/material';
import { t } from 'i18next';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { IOntology } from '../models/IOntology';

interface IOntologyProps {
    ontology: IOntology
    handleToggle: (value: number) => void;
}

const Ontology: React.FC<IOntologyProps> = (props) => {
    const { t } = useTranslation("common");
    console.log("Ontology.tsx");

    return (
        <ListItem
            key={props.ontology.id}
            secondaryAction={
                <IconButton edge="end" aria-label="comments">
                </IconButton>
            }
            disablePadding
        >
            <ListItemButton role={undefined} onClick={() => props.handleToggle(props.ontology.id)} dense>
                <ListItemIcon>
                    <Checkbox
                        edge="start"
                        checked={true}
                        tabIndex={-1}
                        disableRipple
                        inputProps={{ 'aria-labelledby': props.ontology.name }}
                    />
                </ListItemIcon>
                <ListItemText id={props.ontology.id.toString()} primary={props.ontology.name} />
            </ListItemButton>
        </ListItem>
    );
};

export default Ontology;
