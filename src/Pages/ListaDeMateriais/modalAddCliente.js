import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Alert,
} from "react-native";
import React, { useState } from "react";

import { useClienteMateriaisContext } from "../../Context/ClienteMateriaisContext";

export default function ModalAddCliente({ handleClose }) {
  const { clienteMateriais, setClienteMateriais } =
    useClienteMateriaisContext();

  const [novoItem, setNovoItem] = useState({
    cliente: "",
    telefone: "",
    endereco: "",
  });

  const adicionarProduto = () => {
    setClienteMateriais(novoItem);

    setNovoItem({
      cliente: "",
      telefone: "",
      endereco: "",
    });

    handleClose();
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.precoInputer}>
          <TextInput
            style={[styles.input, { width: "100%" }]}
            placeholder="Digite nome do cliente"
            value={novoItem.cliente}
            onChangeText={(text) =>
              setNovoItem({
                cliente: text,
                telefone: novoItem.telefone,
                endereco: novoItem.endereco,
              })
            }
          />
        </View>
        <View style={styles.precoInputer}>
          <TextInput
            style={[styles.input, { width: "100%" }]}
            placeholder="Digite o Telefone do Cliente"
            value={novoItem.telefone}
            onChangeText={(text) =>
              setNovoItem({
                cliente: novoItem.cliente,
                telefone: text,
                endereco: novoItem.endereco,
              })
            }
          />
        </View>
        <View style={styles.precoInputer}>
          <TextInput
            style={[styles.input, { width: "100%" }]}
            placeholder="Endereço do Cliente"
            value={novoItem.endereco}
            onChangeText={(text) =>
              setNovoItem({
                cliente: novoItem.cliente,
                telefone: novoItem.telefone,
                endereco: text,
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
