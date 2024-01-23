import React, { createContext, useContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const HidraulicaContext = createContext();

//useMyContext
//MyContext
//MyContextProvider

export const useHidraulicaContext = () => {
    return useContext(HidraulicaContext);
};

export const HidraulicaContextProvider = ({ children }) => {
    const [hidraulica, setHidraulica] = useState([
        { tipo: "Hidraulica", produto: "Cabo Flexível", valor: 48.99, quantidade: 1 },
        { tipo: "Hidraulica", produto: "Eletroduto", valor: 25.99, quantidade: 1 },
        { tipo: "Hidraulica", produto: "Tomada", valor: 25.99, quantidade: 1 },
        { tipo: "Hidraulica", produto: "Disjuntor", valor: 25.99, quantidade: 1 },
        { tipo: "Hidraulica", produto: "Lâmpada", valor: 25.99, quantidade: 1 },
        { tipo: "Hidraulica", produto: "Caixa de Fundo", valor: 25.99, quantidade: 1 },

    ]);

    // Carregar os dados do AsyncStorage quando o componente montar
    useEffect(() => {
        const loadAsyncData = async () => {
            try {
                const storedData = await AsyncStorage.getItem("hidraulica");
                if (storedData) {
                    setHidraulica(JSON.parse(storedData));
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
                await AsyncStorage.setItem("hidraulica", JSON.stringify(hidraulica));
            } catch (error) {
                console.error("Erro ao salvar dados no AsyncStorage:", error);
            }
        };

        saveAsyncData();
    }, [hidraulica]);

    return (
        <HidraulicaContext.Provider value={{ hidraulica, setHidraulica }}>
            {children}
        </HidraulicaContext.Provider>
    );
};
