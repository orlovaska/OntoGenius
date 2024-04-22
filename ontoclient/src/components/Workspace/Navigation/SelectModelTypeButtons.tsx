import React from 'react';
import { ToggleButton, ToggleButtonGroup } from '@mui/material';
import { ModelTypeEnum } from '../Workspace';

interface ISelectModelTypeButtonsProps {
    onSelectModelType: (modelType: ModelTypeEnum) => void;
}

const SelectModelTypeButtons: React.FC<ISelectModelTypeButtonsProps> = ({ onSelectModelType }) => {
    const [selectedModelType, setSelectedModelType] = React.useState<ModelTypeEnum>(ModelTypeEnum.CLASS);

    const handleModelTypeChange = (event: React.MouseEvent<HTMLElement>, newModelType: ModelTypeEnum | null) => {
        if (newModelType !== null) {
            setSelectedModelType(newModelType);
            onSelectModelType(newModelType);
        }
    };

    return (
        <ToggleButtonGroup
            value={selectedModelType}
            exclusive
            onChange={handleModelTypeChange}
            aria-label="model-type-selector"
            sx={{ margin: '10px' }} // Добавляем отступы
        >
            <ToggleButton
                value={ModelTypeEnum.CLASS}
                aria-label="class-model-button"
                size="small" // Уменьшаем размер кнопки
            >
                Классы
            </ToggleButton>
            <ToggleButton
                value={ModelTypeEnum.PROPERTY}
                aria-label="property-model-button"
                size="small" // Уменьшаем размер кнопки
            >
                Свойства
            </ToggleButton>
            <ToggleButton
                value={ModelTypeEnum.INSTANCE}
                aria-label="instance-model-button"
                size="small" // Уменьшаем размер кнопки
            >
                Экземпляры
            </ToggleButton>
        </ToggleButtonGroup>
    );
};

export default SelectModelTypeButtons;
