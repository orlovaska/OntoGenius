import React from "react";
import ClassEditor from "./ClassEditor/ClassEditor";
import PropertyEditor from "./PropertyEditor/PropertyEditor";

export enum ModelTypeEnum {
    CLASS,
    PROPERTY,
    INSTANCE,
}

interface IWorkspaceProps {
    modelType: ModelTypeEnum;
    ontologyId: number;
}

const Workspace: React.FC<IWorkspaceProps> = (props) => {
    const renderContent = () => {
        switch (props.modelType) {
            case ModelTypeEnum.CLASS:
                return (
                    <div>
                        <ClassEditor ontologyId={props.ontologyId} />
                    </div>
                );
            case ModelTypeEnum.PROPERTY:
                return (
                    <div>
                        <PropertyEditor ontologyId={props.ontologyId} />
                    </div>
                );
            case ModelTypeEnum.INSTANCE:
                return <div>Режим экземпляра</div>;
            default:
                return <div>Неизвестный режим</div>;
        }
    };

    return <div style={{ height: "100%" }}>{renderContent()}</div>;
};

export default Workspace;
