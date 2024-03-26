import React, { useEffect } from "react";
import ClassTreeActionButtons from "./ClassTreeActionButtons";
import { IClass } from "../../../models/IClass";
import ClassService from "../../../services/ClassService";
import ClassGraph from "../Graphical/ClassGraph";
import { isParenthesizedTypeNode } from "typescript";
import { Divider } from "@mui/material";
import ClassTreeView from "./ClassTreeView";

interface IClassHierarchyProps {
    ontologyId: number;
}

const ClassEditor: React.FC<IClassHierarchyProps> = (props) => {
    const [classes, setClasses] = React.useState<IClass[]>([]);
    const [selectedClass, setSelectedClass] = React.useState<IClass>(
        classes[0]
    );

    useEffect(() => {
        const fetchClasses = async () => {
            if (props.ontologyId) {
                try {
                    ClassService.getClassesByOntologyId(props.ontologyId).then(
                        (response) => {
                            setClasses(response.data.classes);
                            if (response.data.classes.length > 0) {
                                setSelectedClass(response.data.classes[0]);
                            }
                        }
                    );
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
    const deleteSelectedClassRecursively = (id?: number) => {
        console.log("Сработал ClassService.deleteClass");
        const deletedClassId = id ? id : selectedClass.id;
        if (deletedClassId) {
            ClassService.deleteClass(deletedClassId)
                .then((response) => {
                    if (response.status === 200) {
                        const newClasses = deleteClassRecursiveFromArray(
                            deletedClassId,
                            [...classes]
                        );
                        console.log("newClasses: ", newClasses);

                        setClasses(newClasses);
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
        classes: IClass[]
    ): IClass[] => {
        const deletedClasses: number[] = [idForDelete];

        const deleteChildren = (id: number) => {
            for (const cls of classes) {
                if (cls.parentClassId === id) {
                    deleteChildren(cls.id);
                    deletedClasses.push(cls.id);
                }
            }
        };

        deleteChildren(idForDelete);

        return classes.filter((cls) => !deletedClasses.includes(cls.id));
    };

    //Если не передаем parentId, то передаем выбранный из дерева
    const addClass = (name: string, parentId?: number) => {
        console.log("Сработал ClassService.addClass");

        ClassService.addClass(
            props.ontologyId,
            name,
            parentId ? parentId : selectedClass.id
        )
            .then((response) => {
                if (response.status === 200) {
                    const newClass: IClass = {
                        id: response.data.addedClassId,
                        name: name,
                        parentClassId: parentId ? parentId : selectedClass.id,
                    };
                    setClasses([...classes, newClass]);
                } else {
                    console.error("Ошибка при добавлении класса");
                }
            })
            .catch((error) => {
                console.error("Ошибка при отправке запроса на сервер:", error);
            });
    };


    const editClass = (name: string, classId?: number) => {
        console.log("Сработал ClassService.updateClass");

        const newClassId = classId ? classId : selectedClass.id
        if (!newClassId) {
            return;
        }

        ClassService.updateClass(
            props.ontologyId,
            name,
            newClassId
        )
            .then((response) => {
                if (response.status === 200) {
                    const updatedClass: IClass = { 
                        // Создаем объект обновленного класса
                        id: newClassId, // Используем тот же ID
                        name: name,
                        parentClassId: classId ? classId : selectedClass.id,
                    };
                    const updatedClasses = classes.map((cls) => cls.id === newClassId ? updatedClass : cls); // Обновляем массив классов
                    setClasses(updatedClasses);
                } else {
                    console.error("Ошибка при обновлении класса");
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
                <ClassTreeActionButtons
                    deleteClass={deleteSelectedClassRecursively}
                    addClass={(name) => addClass(name)}
                    editClass={(name) => editClass(name)}
                    currentClass={selectedClass}
                />
                <Divider style={{ marginBottom: "5px", marginTop: "2px"}} />
                <ClassTreeView
                    classes={classes}
                    onChangeSelectedNode={(selectedClass: IClass) =>
                        setSelectedClass(selectedClass)
                    }
                />
            </div>
            <div style={{ height: "100%", width: "100%"  }}>
                <ClassGraph
                    classes={classes}
                    // TODO - убрать в контроллер управления диалогами
                    addClass={(parentId, name) => addClass(name, parentId)}
                    deleteClass={(id) => deleteSelectedClassRecursively(id)}
                />
            </div>
        </div>
    );
};

export default ClassEditor;
