import React, {useEffect} from 'react';
import Label from "@mui/icons-material/Label";
import BaseTreeView from './BaseTreeView';
import TreeActionButtons from './TreeActionButtons';
import { IClass } from '../../models/IClass';
import ClassService from '../../services/ClassService';


interface IClassHierarchyProps { 
    ontologyId: number;
}

const ClassHierarchy: React.FC<IClassHierarchyProps> = (props) => {
    const [classes, setClasses] = React.useState<IClass[]>([]);


    useEffect(() => {
        const fetchClasses = async () => {
            if (props.ontologyId) {
                try {
                    ClassService.getClassesByOntologyId(props.ontologyId).then(
                        (response) => {
                            console.log(
                                "response.data.ontologies",
                                response.data.classes
                            );
                            // console.log("as GetOntologyResponse: ", response.data as Get);
                            // console.log("ontologies: ", (response.data as Get).ontologies as IClass[]);

                            setClasses(response.data.classes);
                        }
                    );
                } catch (error) {
                    //TODO сделать обработку ошибок
                    console.error("Ошибка при получении классов:", error);
                }
            }
        };

        fetchClasses(); // Вызовите функцию при монтировании компонента
    }, []);

    const deleteClass = () => {
        
    }

    const addClass = () => {
        
    }
    
    return (
        <div>
            <TreeActionButtons
            onDeleteButtonClick={deleteClass}
            onAddButtonClick={addClass}/>
        <BaseTreeView
                svgIcon={Label}>
        </BaseTreeView>
        </div>
    );
};

export default ClassHierarchy;


