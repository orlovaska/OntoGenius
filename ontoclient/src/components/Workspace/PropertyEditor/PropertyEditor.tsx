import React, { useEffect, useState } from "react";
import ClassService from "../../../services/ClassService";
import { Divider } from "@mui/material";
import PropertyTreeView from "./PropertyTreeView";
import { IProperty } from "../../../models/IProperty";
import PropertyService from "../../../services/PropertyService";
import PropertyGraph from "../Graphical/PropertyGraph";
import PropertyTreeActionButtons from "./PropertyTreeActionButtons";

interface IClassHierarchyProps {
    ontologyId: number;
}

const PropertyEditor: React.FC<IClassHierarchyProps> = (props) => {
    const [properties, setProperties] = useState<IProperty[]>([]);
    const [selectedProperty, setSelectedProperty] = React.useState<IProperty>(
        properties[0]
    );

    //TODO убрать управление диалогами отсюда, сейчас на скорую руку
    const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

    const openAddDialog = () => {
        setIsAddDialogOpen(true);
    };

    const openDeleteConfirmDialog = () => {
        setIsDeleteDialogOpen(true);
    };

    const closeAddDialog = () => {
        setIsAddDialogOpen(false);
    };

    const closeDeleteConfirmDialog = () => {
        setIsDeleteDialogOpen(false);
    };

    useEffect(() => {
        const fetchClasses = async () => {
            if (props.ontologyId) {
                try {
                    PropertyService.getPropertiesByOntologyId(
                        props.ontologyId
                    ).then((response) => {
                        setProperties(response.data.properties);
                        if (response.data.properties.length > 0) {
                            setSelectedProperty(response.data.properties[0]);
                        }
                    });
                } catch (error) {
                    //TODO - сделать обработку ошибок
                    console.error("Ошибка при получении классов:", error);
                }
            }
        };

        fetchClasses();
    }, []);

    //TODO - вынести методы в контроллер
    //Если не передаем id, то передаем выбранный из дерева
    const deleteSelectedPropertyRecursively = (id?: number) => {
        const deletedClassId = id ? id : selectedProperty.id;
        console.log("Сработал PropertyService.deleteProperty: id: ", deletedClassId);
        if (deletedClassId) {
            PropertyService.deleteProperty(deletedClassId)
                .then((response) => {
                    if (response.status === 200) {
                        const newProperties = deleteClassRecursiveFromArray(
                            deletedClassId,
                            [...properties]
                        );
                        console.log("newClasses: ", newProperties);

                        setProperties(newProperties);
                    } else {
                        console.error("Ошибка при удаления класса");
                    }
                })
                .catch((error) => {
                    console.error("Ошибка при удаления класса:", error);
                });
        }
    };

    const deleteClassRecursiveFromArray = (
        idForDelete: number,
        classes: IProperty[]
    ): IProperty[] => {
        const deletedClasses: number[] = [idForDelete];

        const deleteChildren = (id: number) => {
            for (const cls of classes) {
                if (cls.parentPropertyId === id) {
                    deleteChildren(cls.id);
                    deletedClasses.push(cls.id);
                }
            }
        };

        deleteChildren(idForDelete);

        return classes.filter((cls) => !deletedClasses.includes(cls.id));
    };

    //Если не передаем parentId, то передаем выбранный из дерева
    const addProperty = (
        name: string,
        domainClassId: number,
        rangeClassId: number,
        parentId?: number
    ) => {
        const newPropertyParentId = parentId ? parentId : selectedProperty.id;
        console.log("Сработал ClassService.addClass");
        console.log("newPropertyParentId: ", newPropertyParentId);
        PropertyService.addProperty(
            props.ontologyId,
            name,
            newPropertyParentId,
            domainClassId,
            rangeClassId
        )
            .then((response) => {
                if (response.status === 200) {
                    const newProperty: IProperty = {
                        id: response.data,
                        domainClassId: domainClassId,
                        rangeClassId: rangeClassId,
                        name: name,
                        ontologyId: props.ontologyId,
                        parentPropertyId: newPropertyParentId,
                    };
                    setProperties([...properties, newProperty]);
                } else {
                    console.error("Ошибка при добавлении класса");
                }
            })
            .catch((error) => {
                console.error("Ошибка при отправке запроса на сервер:", error);
            });
    };

    return (
        <div style={{ display: "flex", height: "100%" }}>
            <div
                style={{
                    border: "2px solid #333",
                    width: 360,
                    minWidth: 360,
                    maxWidth: 360,
                    margin: 5,
                }}
            >
                <PropertyTreeActionButtons
                    deleteProperty={deleteSelectedPropertyRecursively}
                    addProperty={(
                        name: string,
                        domainClassId: number,
                        rangeClassId: number
                    ) => addProperty(name, domainClassId, rangeClassId)}
                    currentProperty={selectedProperty}
                />
                <Divider style={{ marginBottom: "5px", marginTop: "2px" }} />
                <PropertyTreeView
                    properties={properties}
                    onChangeSelectedNode={(selectedClass) =>
                        setSelectedProperty(selectedClass)
                    }
                />
            </div>
            <div style={{ height: "100%", width: "100%" }}>
                <PropertyGraph
                    properties={properties}
                    // TODO - убрать в контроллер управления диалогами
                    addProperty={(
                        parentId,
                        name: string,
                        domainClassId: number,
                        rangeClassId: number
                    ) =>
                        addProperty(name, domainClassId, rangeClassId, parentId)
                    }
                    deleteProperty={(id) =>
                        deleteSelectedPropertyRecursively(id)
                    }
                />
            </div>
        </div>
    );
};

export default PropertyEditor;
