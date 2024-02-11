import { StyleSheet, StatusBar } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import "react-native-gesture-handler";

//Context
import { MateriaisContextProvider } from "./src/Context/MateriaisContext";
import { ListaDeMateriaisContextProvider } from "./src/Context/ListaDeMateriaisContext";
import { OrcamentoContextProvider } from "./src/Context/OrcamentoContext";


//Páginas
import Principal from "./src/Pages/Principal";
//import Materiais from '.src/Pages/Materiais';
import ListaDeMateriais from "./src/Pages/ListaDeMateriais";
import Orcamento from "./src/Pages/Orcamento";

import Materiais from "./src/Pages/Materiais";



import Header from "./src/Components/header";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <MateriaisContextProvider>
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
              <Stack.Screen
                name="Orcamento"
                component={Orcamento}
              />
              <Stack.Screen
                name="Materiais"
                component={Materiais}
              />

            </Stack.Navigator>
          </OrcamentoContextProvider>
        </ListaDeMateriaisContextProvider >
      </MateriaisContextProvider>
    </NavigationContainer >
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
