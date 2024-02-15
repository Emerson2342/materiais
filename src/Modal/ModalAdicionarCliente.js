import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Alert,
} from "react-native";
import React, { useState } from "react";
import { ClienteMateriaisContextProvider, useClienteMateriaisContext } from "../Context/ClienteMateriaisContext";
import { ClienteOrcamentoContextProvider, useClienteOrcamentoContext } from "../Context/ClienteOrcamentoContext";
import { ClienteReciboContextProvider, useClienteReciboContext } from "../Context/ClienteReciboContext";

export default function ModalAdicionarCliente({ handleClose, tipo }) {

  const { clienteMateriais, setClienteMateriais } = useClienteMateriaisContext();
  const { clienteOrcamento, setClienteOrcamento } = useClienteOrcamentoContext();
  const { clienteRecibo, setClienteRecibo } = useClienteReciboContext();


  const [novoItem, setNovoItem] = useState({
    tipo: tipo,
    cliente: "",
    telefone: "",
    endereco: "",
  });


  const adicionarProduto = () => {
    const nomeItem = novoItem.produto;

    // Determine qual função de atualização do estado usar com base no tipo
    const updateStateFunction =
      tipo === "ListaDeMateriais" ? setClienteMateriais :
        tipo === "Orcamento" ? setClienteOrcamento :
          tipo === "Recibo" ? setClienteRecibo :
            null;

    if (updateStateFunction) {
      // Se a função de atualização do estado for válida, faça a atualização
      updateStateFunction(novoItem);
    }
    // Limpe os campos do novo item
    setNovoItem({
      tipo: tipo,
      cliente: "",
      telefone: "",
      endereco: '',
    });

    // Feche o modal
    handleClose();



  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.precoInputer}>
          <TextInput
            style={[styles.input, { width: '100%' }]}
            placeholder="Nome do Cliente"
            value={novoItem.cliente}
            onChangeText={(text) =>
              setNovoItem({
                tipo: novoItem.tipo,
                cliente: text,
                telefone: novoItem.telefone,
                endereco: novoItem.endereco,
              })
            }
          />
        </View>
        <View style={styles.precoInputer}>
          <TextInput
            style={styles.input}
            placeholder="Telefone do Cliente"
            value={novoItem.telefone} // Converta o numeral para string
            onChangeText={(text) =>
              setNovoItem({
                tipo: novoItem.tipo,
                cliente: novoItem.cliente,
                telefone: text,
                endereco: novoItem.endereco,
              })
            }
          />
        </View>
        <View style={styles.precoInputer}>
          <TextInput
            style={styles.input}
            placeholder="Endereço do Cliente"
            value={novoItem.endereco} // Converta o numeral para string
            onChangeText={(text) =>
              setNovoItem({
                tipo: novoItem.tipo,
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
            onPress={() => adicionarProduto()}
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
    textAlign: 'center',
    width: '100%'
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
  cifra: {
    fontSize: 23,
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
