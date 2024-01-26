import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Alert,
} from "react-native";
import React, { useState, useEffect, useRef } from "react";

import { useEletricaContext } from "../Context/EletricaContext";
import { useCarrinhoContext } from "../Context/CarrinhoContext";
import { useAguaFriaContext } from "../Context/AguaFriaContext";
import { useAguaQuenteContext } from "../Context/AguaQuenteContext";
import { useEsgotoContext } from "../Context/EsgotoContext";
import { useListaDeMateriaisContext } from "../Context/ListaDeMateriaisContext";

export default function ModalEditarValor({ handleClose, tipo, indexDoItemAEditar }) {
  const { eletrica, setEletrica } = useEletricaContext();
  const { carrinho, setCarrinho } = useCarrinhoContext();
  const { aguaFria, setAguaFria } = useAguaFriaContext();
  const { aguaQuente, setAguaQuente } = useAguaQuenteContext();
  const { esgoto, setEsgoto } = useEsgotoContext();
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
        tipo === "Eletrica"
          ? eletrica[indexDoItemAEditar]
          : tipo === "Carrinho"
            ? carrinho[indexDoItemAEditar]
            : tipo === "AguaFria"
              ? aguaFria[indexDoItemAEditar]
              : tipo === "AguaQuente"
                ? aguaQuente[indexDoItemAEditar]
                : tipo === "Esgoto"
                  ? esgoto[indexDoItemAEditar]
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
    eletrica,
    carrinho,
    aguaFria,
    aguaQuente,
    esgoto,
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
        tipo === "Eletrica"
          ? [...eletrica]
          : tipo === "Carrinho"
            ? [...carrinho]
            : tipo === "AguaFria"
              ? [...aguaFria]
              : tipo === "AguaQuente"
                ? [...aguaQuente]
                : tipo === "Esgoto"
                  ? [...esgoto]
                  : tipo === "ListaDeMateriais"
                    ? [...listaDeMateriais]
                    : [];

      // Atualize o valor do item específico na cópia da lista
      novaLista[indexDoItemAEditar] = { ...novoItem };

      // Atualize o estado com a nova lista
      if (tipo === "Eletrica") {
        setEletrica(novaLista);
      } else if (tipo === "Carrinho") {
        setCarrinho(novaLista);
      } else if (tipo === "AguaFria") {
        setAguaFria(novaLista);
      } else if (tipo === "AguaQuente") {
        setAguaQuente(novaLista);
      } else if (tipo === "Esgoto") {
        setEsgoto(novaLista);
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
    fontSize: 20,
  },
  buttonArea: {
    flexDirection: "row",
    width: "85%",
    marginTop: 8,
    //alignItems: "center",
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
