import React, { createContext, useContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const EsgotoContext = createContext();

//useMyContext
//MyContext
//MyContextProvider

export const useEsgotoContext = () => {
    return useContext(EsgotoContext);
};

export const EsgotoContextProvider = ({ children }) => {
    const [esgoto, setEsgoto] = useState([
        { tipo: "Esgoto", produto: "Caixa Gordura 300mmx100mm", valor: 350.99, quantidade: 1 },
        { tipo: "Esgoto", produto: "Cap PVC Esgoto 1.1/2' 40mm", valor: 3.99, quantidade: 1 },
        { tipo: "Esgoto", produto: "Cap PVC Esgoto 4' 100mm", valor: 10.99, quantidade: 1 },
        { tipo: "Esgoto", produto: "Curva Curta 90º PVC Esgoto 3' 75mm", valor: 26.99, quantidade: 1 },
        { tipo: "Esgoto", produto: "Curvar 45º PVC Esgoto 4' 100mm", valor: 46.99, quantidade: 1 },
        { tipo: "Esgoto", produto: "Joelho 90º PVC Esgoto 6' 150mm", valor: 57.99, quantidade: 1 },
        { tipo: "Esgoto", produto: "Jução Red PVD Esgoto 6' 150 mm x 4' 100mm", valor: 68.99, quantidade: 1 },
        { tipo: "Esgoto", produto: "Luva de Correr PVD Esgoto 2' 50mm", valor: 15.99, quantidade: 1 },
        { tipo: "Esgoto", produto: "Caixa de Fundo", valor: 25.99, quantidade: 1 },

    ]);

    // Carregar os dados do AsyncStorage quando o componente montar
    useEffect(() => {
        const loadAsyncData = async () => {
            try {
                const storedData = await AsyncStorage.getItem("esgoto");
                if (storedData) {
                    setEsgoto(JSON.parse(storedData));
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
                await AsyncStorage.setItem("esgoto", JSON.stringify(esgoto));
            } catch (error) {
                console.error("Erro ao salvar dados no AsyncStorage:", error);
            }
        };

        saveAsyncData();
    }, [esgoto]);

    return (
        <EsgotoContext.Provider value={{ esgoto, setEsgoto }}>
            {children}
        </EsgotoContext.Provider>
    );
};
