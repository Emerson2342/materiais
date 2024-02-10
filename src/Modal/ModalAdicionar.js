import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Alert,
} from "react-native";
import React, { useState } from "react";

import { useMateriaisContext } from "../Context/MateriaisContext";


export default function ModalAdicionar({ handleClose, tipo, addItem }) {
  const { materiais, setMateriais } = useMateriaisContext();


  const [novoItem, setNovoItem] = useState({
    tipo: tipo,
    produto: "",
    valor: "",
    quantidade: 1,
  });


  const adicionarProduto = () => {
    const nomeItem = novoItem.produto.trim();
    const precoItem =
      novoItem.valor.trim() !== "" ? parseFloat(novoItem.valor) : 0;

    if (nomeItem !== "") {
      // Verificar se o produto já existe em alguma lista
      const produtoExistente = [
        ...materiais
        // Adicione outras listas conforme necessário
      ].find((item) => item.produto === nomeItem);

      if (produtoExistente) {
        Alert.alert("", "Produto já cadastrado", [
          { text: "OK", onPress: () => console.log("OK Pressed") },
        ]);
      } else {
        // Determine qual função de atualização do estado usar com base no tipo
        const updateStateFunction =
          tipo === "Materiais" ? setMateriais
            : null;

        if (updateStateFunction) {
          // Se a função de atualização do estado for válida, faça a atualização
          updateStateFunction((prevLista) => [
            ...prevLista,
            { tipo: tipo, ...novoItem },
          ]);
        }

        // Limpe os campos do novo item
        setNovoItem({
          tipo: tipo,
          produto: "",
          valor: "",
          quantidade: 1,
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
        <TextInput
          style={styles.input}
          placeholder="Digite um novo item"
          value={novoItem.produto}
          onChangeText={(text) =>
            setNovoItem({
              tipo: novoItem.tipo,
              produto: text,
              valor: novoItem.valor,
              quantidade: 1,
            })
          }
        />
        <View style={styles.precoInputer}>
          <Text style={styles.cifra}>R$</Text>
          <TextInput
            style={styles.input}
            placeholder="Digite o preço do item"
            value={novoItem.valor.toString()} // Converta o numeral para string
            onChangeText={(text) =>
              setNovoItem({
                tipo: novoItem.tipo,
                produto: novoItem.produto,
                valor: text.replace(",", "."),
                quantidade: 1,
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
    fontSize: 25,
  },
  precoInputer: {
    flexDirection: "row",
  },
  cifra: {
    fontSize: 25,
  },
  buttonArea: {
    flexDirection: "row",
    width: "85%",
    marginTop: 8,
    justifyContent: "space-between",
  },
  button: {
    flex: 1,
    alignItems: "center",
    marginTop: 14,
    marginBottom: 14,
    padding: 8,
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
