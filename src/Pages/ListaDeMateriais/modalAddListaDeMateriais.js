import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Alert,
} from "react-native";
import React, { useState } from "react";

import { useListaDeMateriaisContext } from "../../Context/ListaDeMateriaisContext";

export default function ModalAddListaMateriais({ handleClose }) {
  const { listaDeMateriais, setListaDeMateriais } =
    useListaDeMateriaisContext();

  const [novoItem, setNovoItem] = useState({
    produto: "",
    quantidade: "",
  });

  const adicionarProduto = () => {
    const nomeItem = novoItem.produto;

    if (nomeItem !== "") {
      // Verificar se o produto já existe em alguma lista
      const produtoExistente = [
        ...listaDeMateriais,
        // Adicione outras listas conforme necessário
      ].find((item) => item.produto === nomeItem);

      if (produtoExistente) {
        Alert.alert("", "Produto já cadastrado", [
          { text: "OK", onPress: () => console.log("OK Pressed") },
        ]);
      } else {
        setListaDeMateriais((prevLista) => [
          ...prevLista,
          { listaDeMateriais, ...novoItem },
        ]);

        // Limpe os campos do novo item
        setNovoItem({
          produto: "",
          quantidade: "",
        });

        // Feche o modal
        handleClose();
      }
    } else {
      Alert.alert("", "Favor digitar um produto.", [
        { text: "OK", onPress: () => console.log("OK Pressed") },
      ]);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.precoInputer}>
          <TextInput
            style={[styles.input, { width: "100%" }]}
            placeholder="Digite um novo item"
            value={novoItem.produto}
            onChangeText={(text) =>
              setNovoItem({
                produto: text,
                quantidade: novoItem.quantidade,
              })
            }
          />
        </View>
        <View style={styles.precoInputer}>
          <TextInput
            style={[styles.input, { width: "100%" }]}
            placeholder="Quantidade"
            value={novoItem.quantidade}
            onChangeText={(text) =>
              setNovoItem({
                produto: novoItem.produto,
                quantidade: text,
              })
            }
          />
        </View>

        <View style={styles.buttonArea}>
          <TouchableOpacity style={styles.button} onPress={handleClose}>
            <Text style={{ fontSize: 20 }}>Voltar</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, styles.buttonSave]}
            onPress={adicionarProduto}
          >
            <Text style={styles.buttonSaveText}>Salvar Item</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "rgba(24,24,24,0.6)",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  content: {
    backgroundColor: "#fff",
    width: "85%",
    paddingTop: 24,
    paddingBottom: 24,
    alignItems: "center",
    borderRadius: 8,
  },
  input: {
    fontSize: 23,
    textAlign: "center",
  },
  precoInputer: {
    flexDirection: "row",
    borderRadius: 8,
    width: "85%",
    padding: 3,
    marginVertical: 3,
    borderWidth: 1,
    borderColor: "#2506ec",
  },
  buttonArea: {
    flexDirection: "row",
    width: "85%",
    marginTop: 8,
    justifyContent: "space-between",
  },
  button: {
    width: "45%",
    alignItems: "center",
    marginTop: 14,
    marginBottom: 14,
    padding: 8,
    borderWidth: 1,
    borderColor: "#2506ec",
    borderRadius: 8,
  },
  buttonSave: {
    backgroundColor: "#2506ec",
    borderRadius: 8,
  },
  buttonSaveText: {
    fontSize: 20,
    color: "#fff",
    fontWeight: "bold",
  },
});
