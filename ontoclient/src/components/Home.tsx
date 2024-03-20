import React from 'react';
import OntologyList from './OntologyList';
import BaseTreeView from './Workspace/BaseTreeView';
import ClassTreeView from './Workspace/ClassTreeView';
import GmailTreeView from './Workspace/BaseTreeView';

interface IHomeProps { }

const Home: React.FC<IHomeProps> = () => {

    const openOntology = () => {
        
    }
    
    return (
        <div>
            <OntologyList
            onOntologyClick={openOntology}/>
            <ClassTreeView ontologyId={6}/>
            {/* {tree} */}
        <>
            Hello world!
        </>
        </div>
    );
};

export default Home;


