import React, { createContext, useContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const OrcamentoContext = createContext();

//useMyContext
//MyContext
//MyContextProvider

export const useOrcamentoContext = () => {
    return useContext(OrcamentoContext);
};

export const OrcamentoContextProvider = ({ children }) => {
    const [orcamento, setOrcamento] = useState([]);

    // Carregar os dados do AsyncStorage quando o componente montar
    useEffect(() => {
        const loadAsyncData = async () => {
            try {
                const storedData = await AsyncStorage.getItem("orcamento");
                if (storedData) {
                    setOrcamento(JSON.parse(storedData));
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
                await AsyncStorage.setItem("orcamento", JSON.stringify(orcamento));
            } catch (error) {
                console.error("Erro ao salvar dados no AsyncStorage:", error);
            }
        };

        saveAsyncData();
    }, [orcamento]);

    return (
        <OrcamentoContext.Provider value={{ orcamento, setOrcamento }}>
            {children}
        </OrcamentoContext.Provider>
    );
};
