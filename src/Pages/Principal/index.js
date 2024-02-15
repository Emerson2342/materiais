import React from "react";
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import "react-native-gesture-handler";

export default function Principal() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("Recibo")}
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
      <Text style={{ color: "#2506ec", top: 150 }}>
        By: MiSsiNhOo
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    top: 300,
    alignItems: "center",
  },

  button: {
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

  },
});
