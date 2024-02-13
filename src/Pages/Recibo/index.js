import React, { useState, useEffect } from "react";
import ModalAdicionar from "../../Modal/ModalAdicionarMaterial";
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

import { useReciboContext } from "../../Context/ReciboContext";

import ModalAdicionarMaterial from "../../Modal/ModalAdicionarMaterial";
import ModalAdicionarCliente from "../../Modal/ModalAdicionarCliente";
import { useClienteReciboContext } from "../../Context/ClienteReciboContext";

export default function Recibo() {
  const navigation = useNavigation();

  const { recibo, setRecibo } = useReciboContext();
  const { clienteRecibo, setClienteRecibo } = useClienteReciboContext();

  const [modalVisibleNome, setModalVisibleNome] = useState(false);
  const [modalVisibleValor, setModalVisibleValor] = useState(false);
  const [modalVisibleAddMaterial, setModalVisibleAddMaterial] = useState(false);
  const [modalVisibleAddCliente, setModalVisibleAddCliente] = useState(false);

  const [indexDoItemAEditar, setIndexDoItemAEditar] = useState(null);

  const [total, setTotal] = useState(0);

  const numColumns = 1;

  const [novoItem, setNovoItem] = useState({
    produto: "",
    valor: "",
    quantidade: 1,

  });

  const adicionarProduto = () => {
    setModalVisibleAddMaterial(true);
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
    const novoArray = recibo.filter((_, index) => index !== indexToRemove);

    // Atualizar o estado com o novo array
    setRecibo(novoArray);
  };

  const confirmarApagarRecibo = (index) => {
    Alert.alert("", "Deseja apagar todos os itens do orcamento?", [
      { text: "Não", onPress: () => console.log("Cancelada Exclusão") },
      {
        text: "Sim", onPress: () => {
          setRecibo([]);
          setClienteRecibo([])
        }
      },
    ]);
  };
  const confirmarApagarItem = (indexToRemove) => {
    Alert.alert("", "Deseja apagar o item da lista?", [
      { text: "Não", onPress: () => console.log("Cancelado Exclusão") },
      { text: "Sim", onPress: () => removerItem(indexToRemove) },
    ]);
  };



  const handleIncrement = (index) => {
    setRecibo((prevRecibo) => {
      const novoRecibo = [...prevRecibo];
      novoRecibo[index].quantidade += 1;
      // Garante que a quantidade mínima seja 1
      novoRecibo[index].quantidade = Math.max(
        novoRecibo[index].quantidade,
        1
      );
      return novoRecibo;
    });
  };

  const handleDecrement = (index) => {
    setRecibo((prevRecibo) => {
      const novoRecibo = [...prevRecibo];
      novoRecibo[index].quantidade = Math.max(
        novoRecibo[index].quantidade - 1,
        1
      );
      return novoRecibo;
    });
  };

  const calcularTotalOrcamento = () => {
    let novoTotal = 0;

    for (const item of recibo) {
      // Certifique-se de que o item tem as propriedades valor e quantidade
      if (item.valor !== undefined && item.quantidade !== undefined) {
        novoTotal += item.valor * item.quantidade;
      }
    }
    setTotal(novoTotal);
    return novoTotal;
  };
  useEffect(() => {
    // Chame a função para calcular o total sempre que o orcamento for alterado
    calcularTotalOrcamento();
  }, [recibo]);

  const renderItem = ({ item, index }) => (
    <View style={styles.listaContainer}>
      {/* Nome Produto + valor */}
      <View
        style={styles.superior}
      >
        <TouchableOpacity onPress={() => editarNome(index)} style={styles.nomeProduto}>
          {item.produto && item.produto.trim() !== "" && (
            <Text style={styles.textLista}>
              {index + 1} - {item.produto}
            </Text>
          )}
        </TouchableOpacity>
        <View style={styles.unidadeProduto}>
          <View>
            <Text style={styles.textUnidade}>Unidade</Text>
          </View>
          <TouchableOpacity
            onPress={() => editarValor(index)}
          >
            <Text style={styles.textUnidade}>
              R$
              {((Number(item.valor) || 0) * 1).toLocaleString("pt-BR", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Apagar produto + quantidade + valor final*/}
      <View style={styles.inferior}>
        <View style={styles.editarProduto}>
          <TouchableOpacity
            style={{ alignSelf: "center" }}
            onPress={() => confirmarApagarItem(index)}
          >
            <MaterialIcons name="close" size={30} color="red" />
          </TouchableOpacity>

        </View>

        <View style={styles.quantidade}>
          <TouchableOpacity
            style={styles.aumentar}
            onPress={() => handleIncrement(index)}
          >
            <AntDesign
              color={"#86c694"}
              size={23}
              name="up"
              style={{ textAlign: "center" }}
            />
          </TouchableOpacity>

          <View style={styles.multiplicar}>
            <Text style={styles.textMultiplicar}>
              {recibo[index].quantidade || 1}
            </Text>
          </View>

          <TouchableOpacity
            style={styles.diminuir}
            onPress={() => handleDecrement(index)}
          >
            <AntDesign
              size={23}
              color={"#86c694"}
              name="down"
              style={{ textAlign: "center" }}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.valorFinal}>
          {item.valor !== undefined && (
            <View>
              <View>
                <Text style={styles.textTotal}>
                  R$
                  {(
                    item.valor * (recibo[index].quantidade || 1)
                  ).toLocaleString("pt-BR", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </Text>
              </View>
            </View>
          )}
        </View>
      </View>
    </View>
  );
  return (
    <View>
      <View
        style={{
          width: "90%",
          marginLeft: 10,
        }}
      >
        <View style={{ flexDirection: "row" }}>
          <Text style={{ fontSize: 15 }}>Cliente:</Text>
          <Text style={{ fontSize: 15, fontWeight: "bold" }}>
            {" "}
            {clienteRecibo.cliente}
          </Text>
        </View>
        <View style={{ flexDirection: "row" }}>
          <Text style={{ fontSize: 15 }}>Telefone:</Text>
          <Text style={{ fontSize: 15, fontWeight: "bold" }}>
            {" "}
            {clienteRecibo.telefone}
          </Text>
        </View>
        <View style={{ flexDirection: "row" }}>
          <Text style={{ fontSize: 15 }}>Endereço:</Text>
          <Text style={{ fontSize: 15, fontWeight: "bold" }}>
            {" "}
            {clienteRecibo.endereco}
          </Text>
        </View>
      </View>
      <View style={styles.container}>
        <FlatList
          data={recibo}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
          numColumns={numColumns} // Configura o número de colunas
        />
      </View>
      <View style={styles.resumo}>
        <View style={styles.resumoContent}>
          <Text style={styles.textText}>TOTAL</Text>
          <Text style={[styles.textTotal, { fontSize: 30 }]}>
            R${" "}
            {total.toLocaleString("pt-BR", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </Text>
        </View>
      </View>

      <View style={styles.buttonContainer}>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => setModalVisibleAddCliente(true)}
          >
            <Text style={styles.buttonText}>Adicionar Cliente</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => setModalVisibleAddMaterial(true)}
          >
            <Text style={styles.buttonText}>Adicionar Material</Text>
          </TouchableOpacity>
        </View>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <TouchableOpacity style={styles.button} onPress={() => gerarPDF()}>
            <Text style={styles.buttonText}>Gerar PDF</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => confirmarApagarRecibo()}
          >
            <Text style={styles.buttonText}>Limpar Lista</Text>
          </TouchableOpacity>
        </View>
      </View>
      <Modal visible={modalVisibleAddCliente} animationType="fade" transparent={true}>
        <ModalAdicionarCliente
          handleClose={() => setModalVisibleAddCliente(false)}
          tipo="Recibo"
        />
      </Modal>

      <Modal visible={modalVisibleAddMaterial} animationType="fade" transparent={true}>
        <ModalAdicionarMaterial
          handleClose={() => setModalVisibleAddMaterial(false)}
          tipo="Recibo"
        />
      </Modal>

      <Modal
        visible={modalVisibleNome}
        animationType="fade"
        transparent={true}
      >
        <ModalEditarNome
          handleClose={() => setModalVisibleNome(false)}
          tipo="Recibo"
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
          tipo="Recibo"
          indexDoItemAEditar={indexDoItemAEditar}
        />
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingLeft: 10,
    height: 350,
    backgroundColor: "#ffffffff",
    elevation: 10,
    borderColor: "#2506ec",
    borderWidth: 1,
    borderRadius: 5,
    width: "95%",
    alignSelf: "center"
  },
  listaContainer: {
    borderColor: "#2506ec",
    borderWidth: 1,
    borderRadius: 5,
    paddingLeft: 5,
    paddingRight: 5,
    elevation: 10,
    marginVertical: 5,
    backgroundColor: "#fff",
    width: "98%"
  },
  textLista: {
    color: "#0045b1",
    fontSize: 20,
  },

  textMultiplicar: {
    color: "#123d4e",
    textAlign: "center",
    fontSize: 25,
  },
  textUnidade: {
    color: "#2f6f68",
    fontSize: 15,
  },
  textTotal: {
    color: "#0099cd",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 20,
  },
  buttonContainer: {
    width: "95%",
    paddingTop: 5,
    marginLeft: 10,
    marginRight: 10,
  },
  button: {
    marginTop: 5,
    backgroundColor: "#2506ec",
    borderRadius: 8,
    paddingTop: 10,
    paddingBottom: 10,
    elevation: 8,
    width: "48%",
  },

  buttonText: {
    textAlign: 'center',
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
  },
  superior: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  inferior: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  nomeProduto: {
    width: "65%",
  },
  unidadeProduto: {
    width: "35%",
    alignItems: "flex-end",
  },
  editarProduto: {
    width: "30%",
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  quantidade: {
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    width: "30%",
  },
  valorFinal: {
    width: "30%",
    alignItems: "flex-end",
  },
  aumentar: {
    width: "30%",
  },
  multiplicar: {
    width: "40%",
  },
  diminuir: {
    width: "30%",
  },
  resumo: {
    margin: 10,
    width: "93%",
    flexDirection: "row",
  },
  resumoContent: {
    alignItems: "flex-end",
    width: "100%",
    borderBottomWidth: 1,
  },
  textText: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#f47f00",
  },
});
