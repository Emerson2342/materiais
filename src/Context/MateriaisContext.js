import React, { createContext, useContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const MateriaisContext = createContext();

//useMyContext
//MyContext
//MyContextProvider

export const useMateriaisContext = () => {
    return useContext(MateriaisContext);
};

export const MateriaisContextProvider = ({ children }) => {
    const [materiais, setMateriais] = useState([
        { tipo: "Materiais", produto: "Caixa Gordura 300mmx100mm", valor: 350.99, quantidade: 1 },
        { tipo: "Materiais", produto: "Cap PVC Materiais 1.1/2' 40mm", valor: 3.99, quantidade: 1 },
        { tipo: "Materiais", produto: "Cap PVC Materiais 4' 100mm", valor: 10.99, quantidade: 1 },
        { tipo: "Materiais", produto: "Curva Curta 90º PVC Materiais 3' 75mm", valor: 26.99, quantidade: 1 },
    ]);

    // Carregar os dados do AsyncStorage quando o componente montar
    useEffect(() => {
        const loadAsyncData = async () => {
            try {
                const storedData = await AsyncStorage.getItem("materiais");
                if (storedData) {
                    setMateriais(JSON.parse(storedData));
                }
            } catch (error) {
                console.error("Erro ao carregar dados do AsyncStorage:", error);
            }
        };

        loadAsyncData();
    }, []);

    // Atualizar o AsyncStorage sempre que a lista for alterada
    useEffect(() => {
        const saveAsyncData = async () => {
            try {
                await AsyncStorage.setItem("materiais", JSON.stringify(materiais));
            } catch (error) {
                console.error("Erro ao salvar dados no AsyncStorage:", error);
            }
        };

        saveAsyncData();
    }, [materiais]);

    return (
        <MateriaisContext.Provider value={{ materiais, setMateriais }}>
            {children}
        </MateriaisContext.Provider>
    );
};
