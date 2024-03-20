import React from 'react';
import { Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

interface ITreeActionButtonsProps {
    onAddButtonClick: () => void; // Метод для обработки нажатия кнопки добавления
    // onDeleteButtonClick: (itemId: number) => void; // Метод для обработки нажатия кнопки удаления с передачей ID элемента
    onDeleteButtonClick: () => void; // Метод для обработки нажатия кнопки удаления с передачей ID элемента
}


const TreeActionButtons: React.FC<ITreeActionButtonsProps> = (props) => {

    const openOntology = () => {
        
    }
    
    return (
        <div>
            <Button
            startIcon={<AddIcon/>}
            onClick={props.onAddButtonClick}/>
            <Button
            startIcon={<AddIcon/>}
            onClick={props.onDeleteButtonClick}/>
        <>
            Hello world!
        </>
        </div>
    );
};

export default TreeActionButtons;


