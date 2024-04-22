import React, { useEffect, useState } from "react";
import OntologyList from "./OntologyEditor/OntologyList";
import ClassTreeView from "./Workspace/ClassEditor/ClassTreeView";
import ClassEditor from "./Workspace/ClassEditor/ClassEditor";
import Workspace, { ModelTypeEnum } from "./Workspace/Workspace";
import OntologyEditor from "./OntologyEditor/OntologyEditor";
import OntologyService from "../services/OntologyService";
import { log } from "console";
import Profile from "./Profile";
import AddOntologyDialog from "./Workspace/Dialogs/AddOntologyDialog";
import { IOntology } from "../models/IOntology";
import { useAppSelector } from "../hooks/redux";
import { Button } from "@mui/material";

interface IHomeProps {}

const Home: React.FC<IHomeProps> = () => {
    // const [ontologyId, setOntologyId] = React.useState<number>(6);
    const { user } = useAppSelector((state) => state.userReducer);

    //TODO - поменять после
    const [ontologyId, setOntologyId] = React.useState<number | null>();
    const [isAddOntologyDialogOpen, setIsAddDialogOpen] = useState(false);
    const [ontologies, setOntologies] = React.useState<IOntology[]>([]);

    useEffect(() => {
        const fetchOntologies = async () => {
            if (user?.id) {
                try {
                    OntologyService.getOntologiesByUserId(user.id).then(
                        (response) => {
                            setOntologies(response.data.ontologies);
                        }
                    );
                } catch (error) {
                    //TODO сделать обработку ошибок
                    console.error("Ошибка при получении онтологий:", error);
                }
            }
        };

        fetchOntologies(); // Вызовите функцию при монтировании компонента
    }, [user]);

    const openAddDialog = () => {
        setIsAddDialogOpen(true);
    };

    const closeAddDialog = () => {
        setIsAddDialogOpen(false);
    };

    const deleteOntology = (id: number) => {
        if (user?.id) {
            OntologyService.deleteOntology(user?.id)
            .then((response) => {
                if (response.status === 200) {
                     const newOntologies = ontologies.filter((cls) => cls.id != id)
                    console.log("newClasses: ", newOntologies);

                    setOntologies(newOntologies);
                } else {
                    console.error("Ошибка при удаления класса");
                }
            })
            .catch((error) => {
                console.error("Ошибка при удаления класса:", error);
            });
        }
    };

    const addOntology = (name: string) => {
        if (user?.id) {
            OntologyService.addOntology(user?.id, name, "")
                .then((response) => {
                    if (response.status === 200) {
                        const newOntology: IOntology = {
                            id: response.data?.addedOntologyId,
                            name: name,
                            ownerUsername: user?.username,
                        };
                        setOntologies([...ontologies, newOntology]);
                    } else {
                        console.error("Ошибка при добавлении класса");
                    }
                })
                .catch((error) => {
                    console.error("Ошибка при отправке запроса на сервер:", error);
                });
        }
    };

    console.log("ontologyId: ", ontologyId);

    return (
        <div>
            {ontologyId ? (
                <OntologyEditor
                    ontologyId={ontologyId}
                    clearOntology={() => setOntologyId(null)}
                />
            ) : (
                <div style={{ display: "flex", margin: 20 }}>
                    <div style={{border: '1px solid rgb(224, 224, 224)', marginTop: 10, borderRadius: 4, height: 400}}>
                        <AddOntologyDialog
                            isOpen={isAddOntologyDialogOpen}
                            addOntology={addOntology}
                            onClose={closeAddDialog}
                        />
                        <Profile />
                        
                        <Button style={{marginLeft: 50}} variant="contained" onClick={openAddDialog}>Добавить онтологию</Button>
                    </div>
                    <OntologyList
                    deleteOntology={(id) => deleteOntology(id)}
                        ontologies={ontologies}
                        onOntologyClick={setOntologyId}
                    />
                </div>
            )}
        </div>
    );
};

export default Home;
