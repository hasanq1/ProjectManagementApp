import React from 'react';
import Clients from '../components/Clients'
import AddClientModal from '../components/AddClientModal'
import Projects from '../components/Projects';

export default function Home() {
    return(
    <>
        <div className='d-flex gap-3 mb-4'>
            <AddClientModal />

        </div>
        <Projects />
        <hr/>
        <Clients />    
    
    </>
    );
}