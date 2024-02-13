import { StyleSheet, StatusBar } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import "react-native-gesture-handler";

//Context
import { ListaDeMateriaisContextProvider } from "./src/Context/ListaDeMateriaisContext";
import { OrcamentoContextProvider } from "./src/Context/OrcamentoContext";
import { ClienteMateriaisContextProvider } from "./src/Context/ClienteMateriaisContext";
import { ClienteOrcamentoContextProvider } from "./src/Context/ClienteOrcamentoContext";
import { ClienteReciboContextProvider } from "./src/Context/ClienteReciboContext";
import { ReciboContextProvider } from "./src/Context/ReciboContext";

//Páginas
import Principal from "./src/Pages/Principal";
import ListaDeMateriais from "./src/Pages/ListaDeMateriais";
import Orcamento from "./src/Pages/Orcamento";

import Recibo from "./src/Pages/Recibo";

import Header from "./src/Components/header";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <ReciboContextProvider>
        <ClienteReciboContextProvider>
          <ClienteOrcamentoContextProvider>
            <ClienteMateriaisContextProvider>
              <ListaDeMateriaisContextProvider>
                <OrcamentoContextProvider>
                  <Header />
                  <StatusBar backgroundColor="#2506ec" />
                  <Stack.Navigator>
                    <Stack.Screen
                      name="Principal"
                      component={Principal}
                      options={{ headerShown: false }}
                    />

                    <Stack.Screen
                      name="Lista de Materiais"
                      component={ListaDeMateriais}
                    />
                    <Stack.Screen name="Orcamento" component={Orcamento} />
                    <Stack.Screen name="Recibo" component={Recibo} />
                  </Stack.Navigator>
                </OrcamentoContextProvider>
              </ListaDeMateriaisContextProvider>
            </ClienteMateriaisContextProvider>
          </ClienteOrcamentoContextProvider>
        </ClienteReciboContextProvider>
      </ReciboContextProvider>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
