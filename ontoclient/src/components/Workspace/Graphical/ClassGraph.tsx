import React, { useState } from "react";
//@ts-ignore
import { Graph } from "react-d3-graph";
import { IClass } from "../../../models/IClass";
import ContextMenu from "../ClassEditor/ContextMenu";
import "./ClassGraph.css";
import AddClassDialog from "../Dialogs/AddClassDialog";
import ConfirmDeletionDialog from "../Dialogs/ConfirmDeletionDialog";

interface IClassGraphProps {
    classes: IClass[];
    addClass: (parentId: number, name: string) => void;
    deleteClass: (id: number) => void;
}

const ClassGraph: React.FC<IClassGraphProps> = (props) => {
    const [isContextMenuOpen, setContextMenuOpen] = useState<boolean>(false);
    const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
    const [selectedClassId, setSelectedClassId] = useState<number>();

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
        return nodeIndex * verticalSpacing;
    };

    const getNodes = (classes: IClass[]) => {
        const horizontalSpacing = 50;
        const verticalSpacing = 50;
        const nodes: any = [];

        classes.forEach((cls, index) => {
            // console.log({
            //     x: calculateNodeX(getClassDepth(cls), horizontalSpacing),
            //     y: calculateNodeY(index, verticalSpacing),
            //     name: cls.name,
            //     level: getClassDepth(cls),
            // });

            nodes.push({
                symbolType: "circle",
                id: cls.id.toString(),
                label: cls.name,
                x: calculateNodeX(getClassDepth(cls), horizontalSpacing), // Рассчитываем координату x
                y: calculateNodeY(index, verticalSpacing), // Рассчитываем координату y
            });
        });

        return nodes;
    };

    const getClassDepth = (cls: IClass): number => {
        if (cls.parentClassId === null) {
            // Если parentId равен null, это корневой узел, его глубина равна 0
            return 0;
        } else {
            // Рекурсивно вызываем getClassDepth для родительского класса и увеличиваем результат на 1
            const parentClass = props.classes.find(
                (c) => c.id === cls.parentClassId
            );
            if (parentClass) {
                return getClassDepth(parentClass) + 1;
            } else {
                return 0; // Если родительский класс не найден, возвращаем 0
            }
        }
    };

    // Функция для преобразования данных о классах в формат связей графа
    const getLinks = (classes: IClass[]) => {
        const links: { source: string; target: string }[] = [];

        classes.forEach((cls) => {
            if (cls.parentClassId !== null) {
                links.push({
                    source: cls.parentClassId?.toString(),
                    target: cls.id.toString(),
                });
            }
        });

        return links;
    };

    // Создайте узлы и связи на основе данных из пропсов
    const nodes = getNodes(props.classes);
    const links = getLinks(props.classes);
    const focusedNodeId: string = props.classes
        .filter((cls) => cls?.parentClassId == null)[0]
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

    
    const closeContextMenuAndOpenDialog = () => {
        closeContextMenu();
        setIsDeleteDialogOpen(true)
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
            {selectedClassId ? (
                <>
                    <AddClassDialog
                        currentClass={props.classes.filter((cls) => cls.id == selectedClassId)[0]}
                        isOpen={isAddDialogOpen}
                        addClass={(name) => props.addClass(selectedClassId, name)}
                        onClose={closeAddDialog}
                    />

                    <ConfirmDeletionDialog
                        entityName={props.classes.filter((cls) => cls.id == selectedClassId)[0]?.name}
                        isOpen={isDeleteDialogOpen}
                        onDeletionConfirm={() => props.deleteClass(selectedClassId)}
                        onClose={closeDeleteConfirmDialog}
                    />
                </>
            ) : null}
            <ContextMenu
                isOpen={isContextMenuOpen}
                ontologyId={0}
                addClass={() => setIsAddDialogOpen(true)}
                deleteClass={closeContextMenuAndOpenDialog}
                onClose={closeContextMenu}
                anchorEl={anchorEl}
            />
            <div className="graph-container" style={{ height: "100%" }}>
                <Graph
                    id="graph-id"
                    data={data}
                    config={myConfig}
                    onRightClickNode={(event: Event, nodeId: number) =>
                        openContextMenu(event, nodeId)
                    }
                />
            </div>
        </div>
    );
};

export default ClassGraph;
