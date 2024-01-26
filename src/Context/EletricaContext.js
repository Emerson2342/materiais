import React, { createContext, useContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const EletricaContext = createContext();

//useMyContext
//MyContext
//MyContextProvider

export const useEletricaContext = () => {
    return useContext(EletricaContext);
};

export const EletricaContextProvider = ({ children }) => {
    const [eletrica, setEletrica] = useState([
        { tipo: "Eletrica", produto: "Cabo Flex 1,5 mm² 100m Amarelo", valor: 195.99, quantidade: 1 },
        { tipo: "Eletrica", produto: "Cabo Flex 1,5 mm² 100m Branco", valor: 195.99, quantidade: 1 },
        { tipo: "Eletrica", produto: "Cabo Flex 1,5 mm² 100m Preto", valor: 195.99, quantidade: 1 },
        { tipo: "Eletrica", produto: "Caixa de Luz PVC Amarela 3x3", valor: 6.99, quantidade: 1 },
        { tipo: "Eletrica", produto: "Caixa de Derivação Amarela 4x2", valor: 2.99, quantidade: 1 },
        { tipo: "Eletrica", produto: "Caneleta PVC 20mmx10mmx2m", valor: 8.99, quantidade: 1 },
        { tipo: "Eletrica", produto: "Disjuntor Bipolar 25A", valor: 57.99, quantidade: 1 },
        { tipo: "Eletrica", produto: "Eletroduto Flex PVC 20mm", valor: 112.99, quantidade: 1 },
        { tipo: "Eletrica", produto: "Interruptor Simples 10A", valor: 7.99, quantidade: 1 },
        { tipo: "Eletrica", produto: "Tomada 2P + T 10A ", valor: 13.99, quantidade: 1 },
        { tipo: "Eletrica", produto: "Pino Macho 20A", valor: 6.99, quantidade: 1 },
        { tipo: "Eletrica", produto: "Quadro de Distribuição 18/24 Disj", valor: 160.99, quantidade: 1 },

    ]);

    // Carregar os dados do AsyncStorage quando o componente montar
    useEffect(() => {
        const loadAsyncData = async () => {
            try {
                const storedData = await AsyncStorage.getItem("eletrica");
                if (storedData) {
                    setEletrica(JSON.parse(storedData));
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
                await AsyncStorage.setItem("eletrica", JSON.stringify(eletrica));
            } catch (error) {
                console.error("Erro ao salvar dados no AsyncStorage:", error);
            }
        };

        saveAsyncData();
    }, [eletrica]);

    return (
        <EletricaContext.Provider value={{ eletrica, setEletrica }}>
            {children}
        </EletricaContext.Provider>
    );
};
