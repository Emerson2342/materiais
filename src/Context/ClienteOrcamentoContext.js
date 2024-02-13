import React, { createContext, useContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const ClienteOrcamentoContext = createContext();

//useMyContext
//MyContext
//MyContextProvider

export const useClienteOrcamentoContext = () => {
    return useContext(ClienteOrcamentoContext);
};

export const ClienteOrcamentoContextProvider = ({ children }) => {
    const [clienteOrcamento, setClienteOrcamento] = useState([]);

    // Carregar os dados do AsyncStorage quando o componente montar
    useEffect(() => {
        const loadAsyncData = async () => {
            try {
                const storedData = await AsyncStorage.getItem("clienteOrcamento");
                if (storedData) {
                    setClienteOrcamento(JSON.parse(storedData));
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
                await AsyncStorage.setItem(
                    "clienteOrcamento",
                    JSON.stringify(clienteOrcamento)
                );
            } catch (error) {
                console.error("Erro ao salvar dados no AsyncStorage:", error);
            }
        };

        saveAsyncData();
    }, [clienteOrcamento]);

    return (
        <ClienteOrcamentoContext.Provider
            value={{ clienteOrcamento, setClienteOrcamento }}
        >
            {children}
        </ClienteOrcamentoContext.Provider>
    );
};
