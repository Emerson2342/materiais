import React, { createContext, useContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const ClienteReciboContext = createContext();

//useMyContext
//MyContext
//MyContextProvider

export const useClienteReciboContext = () => {
    return useContext(ClienteReciboContext);
};

export const ClienteReciboContextProvider = ({ children }) => {
    const [clienteRecibo, setClienteRecibo] = useState([]);

    // Carregar os dados do AsyncStorage quando o componente montar
    useEffect(() => {
        const loadAsyncData = async () => {
            try {
                const storedData = await AsyncStorage.getItem("clienteRecibo");
                if (storedData) {
                    setClienteRecibo(JSON.parse(storedData));
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
                    "clienteRecibo",
                    JSON.stringify(clienteRecibo)
                );
            } catch (error) {
                console.error("Erro ao salvar dados no AsyncStorage:", error);
            }
        };

        saveAsyncData();
    }, [clienteRecibo]);

    return (
        <ClienteReciboContext.Provider
            value={{ clienteRecibo, setClienteRecibo }}
        >
            {children}
        </ClienteReciboContext.Provider>
    );
};
