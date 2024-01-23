import { StyleSheet, StatusBar } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import "react-native-gesture-handler";

//Context
import { EletricaContextProvider } from "./src/Context/EletricaContext";
import { CarrinhoContextProvider } from "./src/Context/CarrinhoContext";
import { ListaDeMateriaisContextProvider } from "./src/Context/ListaDeMateriaisContext";
import { AguaFriaContextProvider } from "./src/Context/AguaFriaContext";
import { AguaQuenteContextProvider } from "./src/Context/AguaQuenteContext";
import { EsgotoContextProvider } from "./src/Context/EsgotoContext";

//Páginas
import Principal from "./src/Pages/Principal";
import Eletrica from "./src/Pages/Eletrica";
import ListaDeMateriais from "./src/Pages/ListaDeMateriais";
import Carrinho from "./src/Pages/Carrinho";
import AguaFria from "./src/Pages/ÁguaFria";
import AguaQuente from "./src/Pages/ÁguaQuente";
import Esgoto from "./src/Pages/Esgoto";

import Header from "./src/Components/header";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <CarrinhoContextProvider>
        <EletricaContextProvider>
          <ListaDeMateriaisContextProvider>
            <AguaFriaContextProvider>
              <AguaQuenteContextProvider>
                <EsgotoContextProvider>
                  <Header />
                  <StatusBar backgroundColor="#2506ec" />
                  <Stack.Navigator>
                    <Stack.Screen
                      name="Principal"
                      component={Principal}
                      options={{ headerShown: false }}
                    />
                    <Stack.Screen name="Elétrica" component={Eletrica} />
                    <Stack.Screen
                      name="Lista de Materiais"
                      component={ListaDeMateriais}
                    />
                    <Stack.Screen name="Carrinho" component={Carrinho} />
                    <Stack.Screen name="Água Fria" component={AguaFria} />
                    <Stack.Screen name="Água Quente" component={AguaQuente} />
                    <Stack.Screen name="Esgoto" component={Esgoto} />
                  </Stack.Navigator>
                </EsgotoContextProvider>
              </AguaQuenteContextProvider>
            </AguaFriaContextProvider>
          </ListaDeMateriaisContextProvider>
        </EletricaContextProvider>
      </CarrinhoContextProvider>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
