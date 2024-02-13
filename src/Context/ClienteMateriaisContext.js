import React, { createContext, useContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const ClienteMateriaisContext = createContext();

//useMyContext
//MyContext
//MyContextProvider

export const useClienteMateriaisContext = () => {
  return useContext(ClienteMateriaisContext);
};

export const ClienteMateriaisContextProvider = ({ children }) => {
  const [clienteMateriais, setClienteMateriais] = useState([]);

  // Carregar os dados do AsyncStorage quando o componente montar
  useEffect(() => {
    const loadAsyncData = async () => {
      try {
        const storedData = await AsyncStorage.getItem("clienteMateriais");
        if (storedData) {
          setClienteMateriais(JSON.parse(storedData));
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
          "clienteMateriais",
          JSON.stringify(clienteMateriais)
        );
      } catch (error) {
        console.error("Erro ao salvar dados no AsyncStorage:", error);
      }
    };

    saveAsyncData();
  }, [clienteMateriais]);

  return (
    <ClienteMateriaisContext.Provider
      value={{ clienteMateriais, setClienteMateriais }}
    >
      {children}
    </ClienteMateriaisContext.Provider>
  );
};
