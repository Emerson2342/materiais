import React, { createContext, useContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const AguaQuenteContext = createContext();

//useMyContext
//MyContext
//MyContextProvider

export const useAguaQuenteContext = () => {
    return useContext(AguaQuenteContext);
};

export const AguaQuenteContextProvider = ({ children }) => {
    const [aguaQuente, setAguaQuente] = useState([
        { tipo: "AguaQuente", produto: "Conector Latão com Solda 3/4'", valor: 11.99, quantidade: 1 },
        { tipo: "AguaQuente", produto: "Cotovelo 45º 3/4'", valor: 14.99, quantidade: 1 },
        { tipo: "AguaQuente", produto: "Cotovelo 45º cobre 15mm", valor: 17.99, quantidade: 1 },
        { tipo: "AguaQuente", produto: "Te Cobre 22mm", valor: 38.99, quantidade: 1 },
        { tipo: "AguaQuente", produto: "Luva com Solda 35mm", valor: 15.99, quantidade: 1 },
        { tipo: "AguaQuente", produto: "Niple Duplo 3/4", valor: 24.99, quantidade: 1 },

    ]);

    // Carregar os dados do AsyncStorage quando o componente montar
    useEffect(() => {
        const loadAsyncData = async () => {
            try {
                const storedData = await AsyncStorage.getItem("aguaQuente");
                if (storedData) {
                    setAguaQuente(JSON.parse(storedData));
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
                await AsyncStorage.setItem("aguaQuente", JSON.stringify(aguaQuente));
            } catch (error) {
                console.error("Erro ao salvar dados no AsyncStorage:", error);
            }
        };

        saveAsyncData();
    }, [aguaQuente]);

    return (
        <AguaQuenteContext.Provider value={{ aguaQuente, setAguaQuente }}>
            {children}
        </AguaQuenteContext.Provider>
    );
};
