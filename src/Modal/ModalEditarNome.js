import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Alert,
} from "react-native";
import React, { useState, useEffect, useRef } from "react";

import { useListaDeMateriaisContext } from "../Context/ListaDeMateriaisContext";
import { useOrcamentoContext } from "../Context/OrcamentoContext";
import { useReciboContext } from "../Context/ReciboContext";


export default function ModalEditarNome({ handleClose, tipo, indexDoItemAEditar }) {

  const { listaDeMateriais, setListaDeMateriais } = useListaDeMateriaisContext();
  const { orcamento, setOrcamento } = useOrcamentoContext();
  const { recibo, setRecibo } = useReciboContext();

  const [novoItem, setNovoItem] = useState({
    tipo: tipo,
    produto: "",
    valor: "",
    quantidade: 1,
  });

  useEffect(() => {
    // Carregar o valor atual do item a ser editado quando o modal é aberto
    if (indexDoItemAEditar !== null && indexDoItemAEditar !== undefined) {
      const itemAEditar =
        tipo === "ListaDeMateriais"
          ? listaDeMateriais[indexDoItemAEditar]
          : tipo === "Orcamento"
            ? orcamento[indexDoItemAEditar]
            : tipo === "Recibo"
              ? recibo[indexDoItemAEditar]
              : null;

      if (itemAEditar) {
        setNovoItem({ ...itemAEditar });
        // setNovoItem({ tipo, produto, valor, quantidade});
      }
    }
  }, [
    indexDoItemAEditar,
    listaDeMateriais,
    orcamento,
    recibo,
    tipo,
  ]);

  const alterarNome = () => {
    /* const novoValor =
          novoItem.valor.trim() !== "" ? parseFloat(novoItem.valor) : 0; */

    const novoProduto =
      novoItem.produto.trim() !== ""

    if (!isNaN(novoProduto) && novoItem.produto.trim() !== "") {
      // Crie uma cópia da lista correspondente ao tipo
      const novaLista =
        tipo === "ListaDeMateriais"
          ? [...listaDeMateriais]
          : tipo === "Orcamento"
            ? [...orcamento]
            : tipo === "Recibo"
              ? [...recibo]
              : [];

      // Atualize o valor do item específico na cópia da lista
      novaLista[indexDoItemAEditar] = { ...novoItem };

      // Atualize o estado com a nova lista
      if (tipo === "ListaDeMateriais") {
        setListaDeMateriais(novaLista);
      } else if (tipo === "Orcamento") {
        setOrcamento(novaLista);
      } else if (tipo === "Recibo") {
        setRecibo(novaLista);
      }
      // Adicione mais blocos else if para outros tipos, se necessário

      // Limpe os campos do novo item
      setNovoItem({
        tipo: tipo,
        produto: "",
        valor: "",
        quantidade: 1,
      });

      // Feche o modal
      handleClose();
    } else {
      Alert.alert("", "Favor digitar um valor válido.", [
        { text: "OK", onPress: () => console.log("OK Pressed") },
      ]);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.precoInputer}>
          <TextInput
            style={styles.input}
            value={novoItem.produto}
            onChangeText={(text) =>
              setNovoItem((prevItem) => ({
                ...prevItem,
                produto: text,
              }))
            }
          />
        </View>

        <View style={styles.buttonArea}>
          <TouchableOpacity style={styles.button} onPress={handleClose}>
            <Text style={{ fontSize: 20 }}>Voltar</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, styles.buttonSave]}
            onPress={alterarNome}
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
    width: "96%",
    margin: 3,
    fontSize: 25,
  },
  precoInputer: {
    borderRadius: 8,
    borderColor: "#2506ec",
    borderWidth: 1,
    height: 50,
    width: "85%",
    flexDirection: "row",
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
    borderRadius: 8,
    borderColor: "#2506ec"
  },
  buttonSave: {
    backgroundColor: "#2506ec",


  },
  buttonSaveText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 20,
    textAlign: "center",

  },
  buttonText: {
    top: 10,
    fontSize: 20,
  },
});
