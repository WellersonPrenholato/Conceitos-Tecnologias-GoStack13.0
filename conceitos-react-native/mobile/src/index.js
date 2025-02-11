import React, { useState, useEffect } from 'react';
import { SafeAreaView, FlatList, Text, StyleSheet, StatusBar, TouchableOpacity } from 'react-native';

import api from './services/api';
/**
 * Não possuem valor semântico (significado)
 * Não possuem estilização própria
 * Todos componentes possuem por padrão "display: flex"
 * 
 * View é referente ao div, footer, header, main, section 
 * Text é referente ao p, span, strong, h1, h2, h3
 */
export default function App(){
    const [projects, setProjects] = useState([]);

    useEffect(()=>{
        api.get('projects').then(response => {
            console.log(response.data);
            setProjects(response.data);
        });
    } ,[]);

    async function handleAppProject(){
        const response = await api.post('projects',{
            title: `Novo Projeto ${Date.now()}`,
            owner: 'Wellerson Prenholato'
        });
        
        const project = response.data;

        setProjects([...projects, project]);
    }

    return (
        <>
            <StatusBar barStyle="light-content" backgroundColor="#7159c1" />

            <SafeAreaView style={styles.container}> 
                <FlatList
                    data={projects}
                    keyExtractor={project => project.id}
                    renderItem={({ item: project }) => (
                        <Text style={styles.project}>{project.title}</Text>
                    )}
                />
                <TouchableOpacity 
                    activeOpacity={0.6} 
                    style={styles.button} 
                    onPress={handleAppProject}
                >
                    <Text style={styles.buttonText}> Adicionar projeto</Text>
                </TouchableOpacity>
            </SafeAreaView>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#7159c1',
        // justifyContent:'center',
        // alignItems:'center',
    },
    project:{
        color:'#FFF',
        fontSize: 30,
        // fontWeight:'bold',
    },
    button:{
        backgroundColor:'#FFF',
        margin: 20,
        height: 50,
        borderRadius: 4,
        justifyContent: 'center',
        alignItems:'center',
    },
    buttonText:{
        fontWeight: 'bold',
        fontSize: 20,
    }
});