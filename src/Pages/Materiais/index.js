import React, { useState, useEffect } from "react";
import ModalAdicionar from "../../Modal/ModalAdicionar";
import ModalEditarNome from "../../Modal/ModalEditarNome";
import ModalEditarValor from "../../Modal/ModalEditarValor";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Alert,
  TouchableOpacity,
  Modal,
  Image,
} from "react-native";
import { MaterialIcons, AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

import { useListaDeMateriaisContext } from "../../Context/ListaDeMateriaisContext";
import { useOrcamentoContext } from "../../Context/OrcamentoContext";
import { useMateriaisContext } from "../../Context/MateriaisContext";


export default function Materiais() {
  const navigation = useNavigation();


  const { listaDeMateriais, setListaDeMateriais } = useListaDeMateriaisContext();
  const { orcamento, setOrcamento } = useOrcamentoContext();
  const { materiais, setMateriais } = useMateriaisContext();

  const [modalVisibleAdd, setModalVisibleAdd] = useState(false);
  const [modalVisibleValor, setModalVisibleValor] = useState(false);
  const [modalVisibleNome, setModalVisibleNome] = useState(false);
  const [indexDoItemAEditar, setIndexDoItemAEditar] = useState(null);

  const numColumns = 1;

  const [novoItem, setNovoItem] = useState({
    produto: "",
    valor: "",
    quantidade: 1,
    carrinho: false,
  });

  const adicionarProduto = () => {
    setModalVisibleAdd(true);
  };

  const editarValor = (index) => {
    setIndexDoItemAEditar(index);
    setModalVisibleValor(true);
  };
  const editarNome = (index) => {
    setIndexDoItemAEditar(index);
    setModalVisibleNome(true);
  };

  const removerItem = (indexToRemove) => {
    // Criar um novo array excluindo o item com o índice indexToRemove
    const novoArray = materiais.filter((_, index) => index !== indexToRemove);

    // Atualizar o estado com o novo array
    setMateriais(novoArray);
  };


  const addAoListaDeMateriais = (index) => {
    const item = materiais[index];

    if (item.valor !== "" && item.valor !== 0) {
      // Verificar se o produto já existe no carrinho
      const produtoExistente = listaDeMateriais.find(
        (itemListaDeMateriais) => itemListaDeMateriais.produto === item.produto
      );

      if (produtoExistente) {
        Alert.alert("", "Produto já existe na Lista de Materiais", [
          { text: "Ok" },
        ]);
      } else {
        // Criar uma cópia do objeto antes de modificar
        const itemListaDeMateriais = { ...item, cart: "ListaDeMateriais" };

        // Adicionar o objeto modificado ao carrinho
        setListaDeMateriais([...listaDeMateriais, itemListaDeMateriais]);

        setNovoItem("", "");
        Alert.alert("", "Produto adicionado à Lista de Materiais", [
          { text: "Ok" },
        ]);
        console.log(listaDeMateriais);
      }
    } else {
      Alert.alert("", "Produto sem preço", [{ text: "Ok" }]);
    }
  };

  const addAoOrcamento = (index) => {
    const item = materiais[index];

    // Verificar se o produto já existe no carrinho
    const produtoExistente = orcamento.find(
      (itemOrcamento) => itemOrcamento.produto === item.produto
    );

    if (produtoExistente) {
      Alert.alert("", "Produto já está no orçamento", [
        { text: "Ok" },
      ]);
    } else {
      // Criar uma cópia do objeto antes de modificar
      const itemOrcamento = { ...item, cart: "Orcamento" };

      // Adicionar o objeto modificado ao carrinho
      setOrcamento([...orcamento, itemOrcamento]);

      setNovoItem("", "");
      Alert.alert("", "Produto adicionado ao Orçamento", [
        { text: "Ok" },
      ]);
      console.log(orcamento);
    }
  };



  const confirmar = (indexToRemove) => {
    Alert.alert("", "Deseja apagar o item da lista?", [
      { text: "Não", onPress: () => console.log("Cancelado Exclusão") },
      { text: "Sim", onPress: () => removerItem(indexToRemove) },
    ]);
  };

  const renderItem = ({ item, index }) => (
    <View style={styles.materiaisContainer}>

      <View >
        <TouchableOpacity onPress={() => editarNome(index)}>
          <Text numberOfLines={1} style={styles.textProduto}>
            {index + 1}-{item.produto}
          </Text>
        </TouchableOpacity>
      </View>


      <View style={styles.iconContainer}>
        <TouchableOpacity onPress={() => editarValor(index)}>
          <Text style={styles.textPreco}>
            R$
            {(item.valor * (1 || 1)).toLocaleString("pt-BR", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.iconContent}
          onPress={() => addAoOrcamento(index)}
        >
          <Image
            style={{ height: 30, width: 30 }}
            source={require("../../Images/orcamento.png")}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => addAoListaDeMateriais(index)}>
          <Image
            style={{ height: 30, width: 30 }}
            source={require("../../Images/listaDeMateriais.png")}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.iconContent}
          onPress={() => confirmar(index)}
        >
          <MaterialIcons name="close" size={30} color="red" />
        </TouchableOpacity>
      </View>

    </View >
  );
  return (
    <View>
      <View style={styles.container}>
        <FlatList
          data={materiais}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
          numColumns={numColumns} // Configura o número de colunas
        />
      </View>
      <View style={styles.button}>
        <TouchableOpacity onPress={adicionarProduto}>
          <Image
            style={{ right: -10 }}
            source={require("../../Images/add.png")}
          />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate("Orcamento")}>
          <Image
            style={{ right: -10 }}
            source={require("../../Images/orcamento.png")}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate("Lista de Materiais")}
        >
          <Image
            style={{ right: -10 }}
            source={require("../../Images/listaDeMateriais.png")}
          />
        </TouchableOpacity>
      </View>

      <Modal visible={modalVisibleAdd} animationType="fade" transparent={true}>
        <ModalAdicionar
          handleClose={() => setModalVisibleAdd(false)}
          tipo="Materiais"
          addItem={setMateriais}
        />
      </Modal>

      <Modal
        visible={modalVisibleNome}
        animationType="fade"
        transparent={true}
      >
        <ModalEditarNome
          handleClose={() => setModalVisibleNome(false)}
          tipo="Materiais"
          indexDoItemAEditar={indexDoItemAEditar}
        />

      </Modal>
      <Modal
        visible={modalVisibleValor}
        animationType="fade"
        transparent={true}
      >
        <ModalEditarValor
          handleClose={() => setModalVisibleValor(false)}
          tipo="Materiais"
          indexDoItemAEditar={indexDoItemAEditar}
        />
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    maxHeight: 500,
    backgroundColor: "#ffffff",
    alignItems: "center",
    elevation: 17,
    borderColor: "#2506ec",
    borderWidth: 1,
  },
  materiaisContainer: {
    borderColor: "#2506ec",
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginVertical: 5,
    marginLeft: "3%",
    marginRight: "3%",
    marginLeft: 10,
    elevation: 20,
    backgroundColor: "#ffffff",
    width: "94%",
  },

  textProduto: {
    color: "#0045b1",
    top: -10,
    fontSize: 23,
  },
  textPreco: {
    fontWeight: "bold",
    color: "#0099cd",
    fontSize: 20,
  },
  iconContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingLeft: 5,
    paddingRight: 5,
    bottom: -10,
  },

  button: {
    marginTop: 20,
    justifyContent: "space-between",
    alignItems: "center",
    width: "80%",
    alignSelf: "center",
    flexDirection: "row",
  },
  imgCarrinho: {
    position: "absolute",
    right: 20,
    top: 480,
    zIndex: 4,
  },

  buttonText: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
  },
});
