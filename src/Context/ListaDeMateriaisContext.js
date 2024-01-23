import React, { createContext, useContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const ListaDeMateriaisContext = createContext();

//useMyContext
//MyContext
//MyContextProvider

export const useListaDeMateriaisContext = () => {
    return useContext(ListaDeMateriaisContext);
};

export const ListaDeMateriaisContextProvider = ({ children }) => {
    const [listaDeMateriais, setListaDeMateriais] = useState([]);

    // Carregar os dados do AsyncStorage quando o componente montar
    useEffect(() => {
        const loadAsyncData = async () => {
            try {
                const storedData = await AsyncStorage.getItem("listaDeMateriais");
                if (storedData) {
                    setListaDeMateriais(JSON.parse(storedData));
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
                await AsyncStorage.setItem("listaDeMateriais", JSON.stringify(listaDeMateriais));
            } catch (error) {
                console.error("Erro ao salvar dados no AsyncStorage:", error);
            }
        };

        saveAsyncData();
    }, [listaDeMateriais]);

    return (
        <ListaDeMateriaisContext.Provider value={{ listaDeMateriais, setListaDeMateriais }}>
            {children}
        </ListaDeMateriaisContext.Provider>
    );
};
