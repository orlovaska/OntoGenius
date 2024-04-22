import React from 'react';
import { ToggleButton, ToggleButtonGroup } from '@mui/material';
import Workspace, { ModelTypeEnum } from '../Workspace/Workspace';
import SelectModelTypeButtons from '../Workspace/Navigation/SelectModelTypeButtons';
import NavigationBar from '../Workspace/Navigation/NavigationBar';

interface IOntologyEditorProps {
    ontologyId: number;
    clearOntology: () => void;
}

const OntologyEditor: React.FC<IOntologyEditorProps> = (props) => {
    const [selectedModelType, setSelectedModelType] = React.useState<ModelTypeEnum>(ModelTypeEnum.CLASS);

    const changeType = (newModelType: ModelTypeEnum) => {
        if (newModelType !== null) {
            setSelectedModelType(newModelType);
        }
    };

    return (
        <div>
            <NavigationBar ontologyId={props.ontologyId} onSelectModelType={changeType} clearOntology={props.clearOntology}/>
            <Workspace modelType={selectedModelType} ontologyId={props.ontologyId} />
        </div>
    );
};

export default OntologyEditor;
