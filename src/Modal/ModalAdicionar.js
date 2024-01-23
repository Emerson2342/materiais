import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Alert,
} from "react-native";
import React, { useState } from "react";

import { useEletricaContext } from "../Context/EletricaContext";
import { useAguaFriaContext } from "../Context/AguaFriaContext";
import { useAguaQuenteContext } from "../Context/AguaQuenteContext";
import { useEsgotoContext } from "../Context/EsgotoContext";

export default function ModalAdicionar({ handleClose, tipo, addItem }) {
  const { eletrica, setEletrica } = useEletricaContext();
  const { aguaFria, setAguaFria } = useAguaFriaContext();
  const { aguaQuente, setAguaQuente } = useAguaQuenteContext();
  const { esgoto, setEsgoto } = useEsgotoContext();

  const [novoItem, setNovoItem] = useState({
    tipo: tipo,
    produto: "",
    valor: "",
    quantidade: 1,
  });

  /* const adicionarItem = () => {
      const nomeItem = novoItem.produto.trim();
      const precoItem =
        novoItem.valor.trim() !== "" ? parseFloat(novoItem.valor) : 0;
  
      if (nomeItem !== "") {
        // Determine qual função de atualização do estado usar com base no tipo
        const updateStateFunction =
          tipo === "Limpeza"
            ? setLimpeza
            : tipo === "Bebidas"
            ? setBebidas
            : tipo === "Higiene"
            ? setHigiene
            : tipo === "Hortifruti"
            ? setHortifruti
            : tipo === "Temperos"
            ? setTemperos
            : tipo === "Carrinho"
            ? setCarrinho // Adicione mais verificações para outros tipos, se necessário
            : tipo === "Mercearia"
            ? setMercearia
            : tipo === "Acougue"
            ? setAcougue
            : null;
  
        if (updateStateFunction) {
          // Se a função de atualização do estado for válida, faça a atualização
          updateStateFunction((prevLista) => [
            ...prevLista,
            { tipo: tipo, ...novoItem },
          ]);
        }
  
        // Limpe os campos do novo item
        setNovoItem({ tipo: tipo, produto: "", valor: "", quantidade: 1 });
  
        // Feche o modal
        handleClose();
      } else {
        Alert.alert("", "Favor digitar um produto.", [
          { text: "OK", onPress: () => console.log("OK Pressed") },
        ]);
      }
    };
   */
  const adicionarProduto = () => {
    const nomeItem = novoItem.produto.trim();
    const precoItem =
      novoItem.valor.trim() !== "" ? parseFloat(novoItem.valor) : 0;

    if (nomeItem !== "") {
      // Verificar se o produto já existe em alguma lista
      const produtoExistente = [
        ...eletrica,

        // Adicione outras listas conforme necessário
      ].find((item) => item.produto === nomeItem);

      if (produtoExistente) {
        Alert.alert("", "Produto já cadastrado", [
          { text: "OK", onPress: () => console.log("OK Pressed") },
        ]);
      } else {
        // Determine qual função de atualização do estado usar com base no tipo
        const updateStateFunction = tipo === "Eletrica" ? setEletrica : null;

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
          cart: false,
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
              cart: false,
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
                cart: false,
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
