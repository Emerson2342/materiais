import React from "react";
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  FlatList,
  ImageBackground,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import "react-native-gesture-handler";

export default function Principal() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("Materiais")}
      >
        <Text style={styles.buttonText}>Recibo</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("Orcamento")}
      >
        <Text style={styles.buttonText}>Orçamento</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("Lista de Materiais")}
      >
        <Text style={styles.buttonText}>Lista de Materiais</Text>
      </TouchableOpacity>
      <Text style={{ position: "absolute", color: "#2506ec" }}>
        By: MiSsiNhOo
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    top: 50,
    height: "100%",
    margin: 0,
    alignItems: "center",
  },
  text: {
    color: "#363636",
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
  },

  img: {
    height: 105,
    width: 169,
    borderRadius: 7,
    overflow: "hidden",
    borderColor: "#2506ec",
    borderWidth: 3,
  },
  button: {
    top: 100,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#2506ec",
    borderRadius: 8,
    padding: 15,
    width: "80%",
    alignSelf: "center",
    elevation: 30,
    marginVertical: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
    left: -10,
  },
});
