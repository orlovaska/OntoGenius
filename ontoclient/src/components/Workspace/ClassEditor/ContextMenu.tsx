import * as React from "react";
import { ModelTypeEnum } from "../Workspace";
import { ContentCut } from "@mui/icons-material";
import { MenuItem, ListItemIcon, ListItemText, Menu } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";

interface IContextMenuProps {
    isOpen: boolean;
    // modelType: ModelTypeEnum;
    ontologyId: number;
    addClass: () => void;
    deleteClass: () => void;
    onClose: () => void;
    anchorEl: null | HTMLElement;
}

const ContextMenu: React.FC<IContextMenuProps> = (props) => {
    return (
        <div>
            <Menu
            
                // style={{maxWidth: 150, maxHeight: 300}}
                anchorEl={props.anchorEl}
                onMouseLeave={props.onClose}
                open={props.isOpen}
                onClose={props.onClose}
            >
                <MenuItem onClick={props.addClass}>
                    <ListItemIcon>
                        <AddIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText>Добавить дочерний</ListItemText>
                </MenuItem>
                <MenuItem onClick={props.deleteClass}>
                    <ListItemIcon>
                        <DeleteIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText>Удалить</ListItemText>
                </MenuItem>
            </Menu>
        </div>
    );
};

export default ContextMenu;
