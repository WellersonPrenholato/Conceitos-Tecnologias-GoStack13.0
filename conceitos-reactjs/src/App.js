import React, { useState, useEffect } from 'react';
import api from './services/api';

import './App.css';
// import backgroundImage from './assets/background.jpg';

import Header from './components/Header';

/**
 * Componente
 * Propriedade: 
 * Estado e Imutabilidade
 */

function App(){
    const [projects, setProjects] = useState([]);

    // useState retorna um array com duas posições 
    // 1. Variável com o seu valor inicial
    // 2. Uma função para atualizarmos esse valor

    useEffect (() => {
      api.get('projects').then(response => {
        setProjects(response.data);
        // console.log(response);
      })
    }, []);

    async function handleAddProject(){
      // projects.push(`Novo Projeto ${Date.now()}`);
      // setProjects([...projects, `Novo Projeto ${Date.now()}`]);
      // console.log(projects);
      const response = await api.post('projects', {
        "title":`Novo Projeto ${Date.now()}`,
        "owner": "Wellerson"
      });

      const project = response.data;

      setProjects([...projects, project]);
    }

    return (
      <>
        <Header title="Projects" />

        {/* <img width={500} src={backgroundImage} /> */}
            <ul>
              {projects.map(project => <li key={project.id}>{project.title}</li>)}
            </ul>

            <button type="button" onClick={handleAddProject}>Adicionar projeto</button>
      </>
    );
}

export default App;