import React, { useState } from "react";
//@ts-ignore
import { Graph } from "react-d3-graph";
import ContextMenu from "../ClassEditor/ContextMenu";
import "./ClassGraph.css";
import { IProperty } from "../../../models/IProperty";
import AddClassDialog from "../Dialogs/AddClassDialog";
import ConfirmDeletionDialog from "../Dialogs/ConfirmDeletionDialog";
import AddPropertyDialog from "../Dialogs/AddPropertyDialog";

interface IClassGraphProps {
    properties: IProperty[];
    addProperty: (
        parentId: number,
        name: string,
        domainClassId: number,
        rangeClassId: number
    ) => void;
    deleteProperty: (id: number) => void;
}

const PropertyGraph: React.FC<IClassGraphProps> = (props) => {
    const [isContextMenuOpen, setContextMenuOpen] = useState<boolean>(false);
    const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
    const [selectedPropertyId, setSelectedClassId] = useState<number>();

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

    const myConfig = {
        staticGraphWithDragAndDrop: true, // Позволить перетаскивать узлы
        nodeHighlightBehavior: true,
        node: {
            size: {
                height: 20,
                width: 30,
             },
            color: "#8da9cc",
            highlightStrokeColor: "blue",
            labelProperty: "label",
        },
        link: {
            highlightColor: "lightblue",
            // color: "rgb(100, 100, 100)",
        },
        collapsible: false,
        directed: true,
        d3: {
            // Параметры раскладки
            alphaTarget: 0.05, // Целевая альфа (управляет скоростью анимации)
            gravity: -200, // Гравитация (отрицательное значение отталкивает узлы)
            linkLength: 50, // Длина связей
            linkStrength: 2, // Сила связей
            // disableLinkForce: false, // Отключить силу связей
        },
        // width: "1000px",
        // height: "100px"
    };

    // Функция для преобразования данных о классах в формат узлов графа
    // const getNodes = (classes: IClass[]) => {
    //     return classes.map((cls, index) => ({
    //         symbolType: "circle",
    //         id: cls.id.toString(), // Преобразуйте id в строку, так как id должен быть строкой
    //         label: cls.name,
    //         // width: calculateNodeWidth(getClassDepth(cls)), // Рассчитываем ширину узла на основе его уровня
    //         // height: calculateNodeHeight(getClassDepth(cls)), // Рассчитываем высоту узла на основе его уровня
    //         y: getClassDepth(cls), // Используйте имя класса в качестве метки
    //     }));
    // };
    const calculateNodeX = (level: number, horizontalSpacing: number) => {
        // Рассчитываем координату x на основе уровня вложенности и смещения
        return level * horizontalSpacing + 200;
    };

    const calculateNodeY = (nodeIndex: number, verticalSpacing: number) => {
        // Рассчитываем координату y на основе индекса узла и вертикального смещения
        return nodeIndex * verticalSpacing + 200;
    };

    const getNodes = (classes: IProperty[]) => {
        const horizontalSpacing = 50;
        const verticalSpacing = 50;
        const nodes: any = [];

        classes.forEach((cls, index) => {
            console.log({
                x: calculateNodeX(getClassDepth(cls), horizontalSpacing),
                y: calculateNodeY(index, verticalSpacing),
                name: cls.name,
                level: getClassDepth(cls),
            });

            nodes.push({
                symbolType: "square",
                id: cls.id.toString(),
                label: cls.name,
                x: calculateNodeX(getClassDepth(cls), horizontalSpacing), // Рассчитываем координату x
                y: calculateNodeY(index, verticalSpacing), // Рассчитываем координату y
            });
        });

        return nodes;
    };

    const getClassDepth = (cls: IProperty): number => {
        if (cls.parentPropertyId === null) {
            // Если parentId равен null, это корневой узел, его глубина равна 0
            return 0;
        } else {
            // Рекурсивно вызываем getClassDepth для родительского класса и увеличиваем результат на 1
            const parentClass = props.properties.find(
                (c) => c.id === cls.parentPropertyId
            );
            if (parentClass) {
                return getClassDepth(parentClass) + 1;
            } else {
                return 0; // Если родительский класс не найден, возвращаем 0
            }
        }
    };

    // Функция для преобразования данных о классах в формат связей графа
    const getLinks = (classes: IProperty[]) => {
        const links: { source: string; target: string }[] = [];

        classes.forEach((cls) => {
            if (cls.parentPropertyId !== null) {
                links.push({
                    source: cls.parentPropertyId?.toString(),
                    target: cls.id.toString(),
                });
            }
        });

        return links;
    };

    // Создайте узлы и связи на основе данных из пропсов
    const nodes = getNodes(props.properties);
    const links = getLinks(props.properties);
    const focusedNodeId: string = props.properties
        .filter((cls) => cls?.parentPropertyId == null)[0]
        ?.id.toString();
    console.log("focusedNodeId: ", focusedNodeId);

    const data = {
        nodes: nodes,
        links: links,
        // focusedNodeId: focusedNodeId,
    };

    const openContextMenu = (event: Event, nodeId: number) => {
        event.preventDefault();
        setSelectedClassId(nodeId);

        setContextMenuOpen(true);
        setAnchorEl(event.currentTarget as HTMLElement);
    };

    const closeContextMenu = () => {
        setContextMenuOpen(false);
    };

    return (
        <div
            style={{
                border: "2px solid #333",
                margin: 5,
                height: "90vh",
            }}
        >
            {selectedPropertyId ? (
                <>
                    <AddPropertyDialog
                        parentProperty={
                            props.properties.filter(
                                (cls) => cls.id == selectedPropertyId
                            )[0]
                        }
                        isOpen={isAddDialogOpen}
                        addProperty={(
                            name: string,
                            domainClassId: number,
                            rangeClassId: number
                        ) =>
                            props.addProperty(
                                selectedPropertyId,
                                name,
                                domainClassId,
                                rangeClassId
                            )
                        }
                        onClose={closeAddDialog}
                    />

                    <ConfirmDeletionDialog
                        entityName={
                            props.properties.filter(
                                (cls) => cls.id == selectedPropertyId
                            )[0].name
                        }
                        isOpen={isDeleteDialogOpen}
                        onDeletionConfirm={() =>
                            props.deleteProperty(selectedPropertyId)
                        }
                        onClose={closeDeleteConfirmDialog}
                    />
                </>
            ) : null}
            <ContextMenu
                isOpen={isContextMenuOpen}
                ontologyId={0}
                addClass={openAddDialog}
                deleteClass={() => {
                    closeContextMenu();
                    openDeleteConfirmDialog();
                }}
                onClose={closeContextMenu}
                anchorEl={anchorEl}
            />
            <div className="graph-container" style={{ height: "100%" }}>
                <Graph
                    // style={{ minHeight: "600px", minWidth: "600px" }}
                    id="graph-id"
                    data={data} // Передайте узлы и связи в компонент Graph
                    config={myConfig}
                    onRightClickNode={(event: Event, nodeId: number) =>
                        openContextMenu(event, nodeId)
                    }
                />
            </div>
        </div>
    );
};

export default PropertyGraph;
