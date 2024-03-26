import React from "react";
import OntologyList from "./OntologyList";
import ClassTreeView from "./Workspace/ClassEditor/ClassTreeView";
import ClassEditor from "./Workspace/ClassEditor/ClassEditor";
import Workspace, { ModelTypeEnum } from "./Workspace/Workspace";
import OntologyEditor from "./OntologyEditor";
import OntologyService from "../services/OntologyService";
import { log } from "console";

interface IHomeProps {}

const Home: React.FC<IHomeProps> = () => {
    const [ontologyId, setOntologyId] = React.useState<number>(6);

    //TODO - поменять после
    // const [ontologyId, setOntologyId] = React.useState<number>();

    // OntologyService.downloadReport(6).then((response) => {
    //     console.log("downloadReport response: ", response);
    //     console.log("downloadReport response.data: ", response.data);
    //   });

    return (
        <div>
            {ontologyId ? (
                <OntologyEditor ontologyId={ontologyId} />
            ) : (
                <OntologyList onOntologyClick={setOntologyId} />
            )}
        </div>
    );
};

export default Home;
