import React, { createContext, useContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const ReciboContext = createContext();

//useMyContext
//MyContext
//MyContextProvider

export const useReciboContext = () => {
    return useContext(ReciboContext);
};

export const ReciboContextProvider = ({ children }) => {
    const [recibo, setRecibo] = useState([]);

    // Carregar os dados do AsyncStorage quando o componente montar
    useEffect(() => {
        const loadAsyncData = async () => {
            try {
                const storedData = await AsyncStorage.getItem("recibo");
                if (storedData) {
                    setRecibo(JSON.parse(storedData));
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
                await AsyncStorage.setItem("recibo", JSON.stringify(recibo));
            } catch (error) {
                console.error("Erro ao salvar dados no AsyncStorage:", error);
            }
        };

        saveAsyncData();
    }, [recibo]);

    return (
        <ReciboContext.Provider value={{ recibo, setRecibo }}>
            {children}
        </ReciboContext.Provider>
    );
};
