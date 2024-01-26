import React, { createContext, useContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const AguaFriaContext = createContext();

//useMyContext
//MyContext
//MyContextProvider

export const useAguaFriaContext = () => {
    return useContext(AguaFriaContext);
};

export const AguaFriaContextProvider = ({ children }) => {
    const [aguaFria, setAguaFria] = useState([
        { tipo: "AguaFria", produto: "Tubo Soldável 20mm", valor: 4.99, quantidade: 1 },
        { tipo: "AguaFria", produto: "Registro Soldável Esfera 20mm", valor: 19.99, quantidade: 1 },
        { tipo: "AguaFria", produto: "Curva 90º Soldável 25mm", valor: 3.99, quantidade: 1 },
        { tipo: "AguaFria", produto: "Joelho 90º Soldável 50mm", valor: 6.99, quantidade: 1 },
        { tipo: "AguaFria", produto: "Te Red Soldável 50x25", valor: 12.99, quantidade: 1 },
        { tipo: "AguaFria", produto: "Cap Soldável 25mm", valor: 1.99, quantidade: 1 },
        { tipo: "AguaFria", produto: "Plug com Rosca 1/2' Branco", valor: 1.99, quantidade: 1 },
        { tipo: "AguaFria", produto: "Bucha Red c/ Rosca 3/4 x 1/2", valor: 1.99, quantidade: 1 },
        { tipo: "AguaFria", produto: "Nípel Roscável 3/4", valor: 3.99, quantidade: 1 },
        { tipo: "AguaFria", produto: "Joelho Red 90º Sold c/ Bucha 1/2'", valor: 6.99, quantidade: 1 },
        { tipo: "AguaFria", produto: "Joelho 45º Soldável 25mm", valor: 1.99, quantidade: 1 },

    ]);

    // Carregar os dados do AsyncStorage quando o componente montar
    useEffect(() => {
        const loadAsyncData = async () => {
            try {
                const storedData = await AsyncStorage.getItem("aguaFria");
                if (storedData) {
                    setAguaFria(JSON.parse(storedData));
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
                await AsyncStorage.setItem("aguaFria", JSON.stringify(aguaFria));
            } catch (error) {
                console.error("Erro ao salvar dados no AsyncStorage:", error);
            }
        };

        saveAsyncData();
    }, [aguaFria]);

    return (
        <AguaFriaContext.Provider value={{ aguaFria, setAguaFria }}>
            {children}
        </AguaFriaContext.Provider>
    );
};
