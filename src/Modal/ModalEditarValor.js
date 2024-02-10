import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Alert,
} from "react-native";
import React, { useState, useEffect, useRef } from "react";

import { useMateriaisContext } from "../Context/MateriaisContext";
import { useOrcamentoContext } from "../Context/OrcamentoContext";
import { useListaDeMateriaisContext } from "../Context/ListaDeMateriaisContext";

export default function ModalEditarValor({ handleClose, tipo, indexDoItemAEditar }) {

  const { materiais, setMateriais } = useMateriaisContext();
  const { orcamento, setOrcamento } = useOrcamentoContext();
  const { listaDeMateriais, setListaDeMateriais } =
    useListaDeMateriaisContext();

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
        tipo === "Materiais"
          ? materiais[indexDoItemAEditar]
          : tipo === "Orcamento"
            ? orcamento[indexDoItemAEditar]
            : tipo === "ListaDeMateriais"
              ? listaDeMateriais[indexDoItemAEditar]
              : null;

      if (itemAEditar) {
        setNovoItem({ ...itemAEditar });
        // setNovoItem({ tipo, produto, valor, quantidade});
      }
    }
  }, [
    indexDoItemAEditar,
    materiais,
    orcamento,
    listaDeMateriais,
    tipo,
  ]);

  const alterarProduto = () => {
    /* const novoValor =
          novoItem.valor.trim() !== "" ? parseFloat(novoItem.valor) : 0; */

    const novoProduto =
      novoItem.valor && novoItem.valor.trim() !== ""
        ? parseFloat(novoItem.valor)
        : 0;

    if (!isNaN(novoProduto) && novoItem.produto.trim() !== "") {
      // Crie uma cópia da lista correspondente ao tipo
      const novaLista =
        tipo === "Materiais"
          ? [...materiais]
          : tipo === "Orcamento"
            ? [...orcamento]
            : tipo === "ListaDeMateriais"
              ? [...listaDeMateriais]
              : [];

      // Atualize o valor do item específico na cópia da lista
      novaLista[indexDoItemAEditar] = { ...novoItem };

      // Atualize o estado com a nova lista
      if (tipo === "Materiais") {
        setMateriais(novaLista);
      } else if (tipo === "Orcamento") {
        setOrcamento(novaLista);
      } else if (tipo === "ListaDeMateriais") {
        setListaDeMateriais(novaLista);
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
        {/* <View style={styles.precoInputer}>
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
        </View> */}
        <View style={styles.precoInputer}>
          <Text style={styles.cifra}>R$</Text>
          <TextInput
            style={styles.input}
            placeholder="Digite o novo valor"
            value={novoItem.valor ? novoItem.valor.toString() : ""}
            onChangeText={(text) =>
              setNovoItem({
                ...novoItem,
                valor: text.replace(",", "."),
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
            onPress={alterarProduto}
          >
            <Text style={styles.buttonSaveText}>Salvar Valor</Text>
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
    width: "80%",
    fontSize: 25,
  },
  precoInputer: {
    flexDirection: "row",
    borderWidth: 1,
    width: "85%",
    borderRadius: 7,
    height: 50,
    borderColor: "#2506ec"
  },
  cifra: {
    width: "20%",
    fontSize: 25,
    textAlign: "right",
    alignSelf: "center"

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
    borderRadius: 8,
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
