import React, { useState, useEffect } from "react";
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
} from "react-native";
import { MaterialIcons, AntDesign } from "@expo/vector-icons";
import * as Print from "expo-print";
import * as Sharing from "expo-sharing";
import * as FileSystem from "expo-file-system";

import { useReciboContext } from "../../Context/ReciboContext";

import ModalAdicionarMaterial from "../../Modal/ModalAdicionarMaterial";
import ModalAdicionarCliente from "../../Modal/ModalAdicionarCliente";
import { useClienteReciboContext } from "../../Context/ClienteReciboContext";

const ReciboHtml = ({ recibo, clienteRecibo }) => {
  //valor da data atual
  var dataAtual = new Date();

  // Formata a data como string
  var dataFormatada = dataAtual.toLocaleDateString();

  const total = recibo.reduce(
    (acc, item) => acc + item.valor * item.quantidade,
    0
  );

  return `
  <!DOCTYPE html>
  <html lang="pt-br">
  <head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
      body {
          font-family: sans-serif;
          margin: 15px;
          border: 1px solid black;
          height: 900px;
          padding: 15px;
          border-radius: 5px;
      }

      table {
          width: 100%;
          border-collapse: collapse;
          border: 2px solid black;
          margin-bottom: 5px;
      }

      h1 {
          margin: 0;
          color: #000;
          text-align: center;
          font-size: 40px;
      }

      th,
      td {
          border: 1px solid black;
          padding: 5px;
          text-align: center;
          font-size: 15px;
          font-family: sans-serif
      }

      .cabecalho {
          background-color: #2506ec;

      }

      .cliente th {
          font-size: 15px;
      }

      .cabecalho th {
          color: #F8F8FF;
          font-size: 15px;
       }

       .cliente p{
          font-size: 15px;
       }
      .header {
          display: flex;
          justify-content: space-between;
      }

      .servicos {
        margin-top: -90px;
          font-size: 13px;
          width: 50%;
          line-height: 0.4;
          font-family: sans-serif
      }

      .empregador {
        margin-top: -90px;
          font-size: 13px;
          width: 50%;
          line-height: 0.4;
          text-align: right;
          font-family: sans-serif
      }

      .cliente {

          display: flex;
          flex-direction: column;
      }

      .resumo {
          margin: 5px;
          line-height: 0.1;
          display: flex;
          justify-content: space-between;
      }

      .data {
          text-align: end;
          line-height: 0.2;
          font-size: 20px;
      }

      .logo {
          text-align: center;
      }
  </style>
</head>

<body>
  <div class="logo">
      <img style="height: 75px; "
          src="data:image/jpeg;base64,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">

  </div>
   <div class="header">
      <div class="servicos">
          <p>Elétrica e Hidráulica em geral</p>
          <p>Conserto de válvulas de descarga,</p>
          <p>Caixa Acoplada, registros e chuveiros</p>
          <p>Elétrica comercial e residencial</p>
      </div>
      <div class="empregador">
          <p>Atendo em todo o Distrito Federal</p>
          <p>Há mais de 25 anos de experiência</p>
          <p>cunha.netto@hotmail.com </p>
          <p>Telefone: (61) 9.9666-7741 </p>
          
      </div>
  </div>
  <h1>Recibo</h1>
 <div class="cliente">
 <p style="text-align: left;">Nome: ${clienteRecibo.cliente}</br>
 Telefone: ${clienteRecibo.telefone}</br>
 Endereço:${clienteRecibo.endereco}</br>
 Serviço realizado no dia ${dataFormatada} no endereço do cliente.
</p>
              </div>
  <table>
      <thead>
          <tr class="cabecalho">
              <th style="width: 5%;">Ord</th>
              <th style="width: 5%;">Quantidade</th>
              <th style="width: 60%;">Serviços</th>
              <th style="width: 15%;"> Valor Unitário</th>
              <th style="width: 15%;"> Valor Total</th>
          </tr>
      </thead>
      <tbody>
          ${recibo
            .map(
              (item, index) => `
          <tr key=${index}>
              <td>${index + 1}</td>
              <td>${item.quantidade}</td>
              <td style="text-align:left">${item.produto}</td>
              <td >R$ ${(item.valor * 1).toFixed(2).replace(".", ",")}</td>
              <td> R$ ${(item.valor * item.quantidade)
                .toFixed(2)
                .replace(".", ",")}</td>
          </tr>
          `
            )
            .join("")}
      </tbody>
  </table>
  <br>
  <div style="text-align: right;">
      <hr>
      <p style="font-size: 20px;"> <b>Total </br>
          R$ ${total.toFixed(2).replace(".", ",")}</b></p>
  </div>
 

  <div class="data">
 
      <p style="font-size: large;">
      Brasília,  ${dataFormatada}</p>
      <hr>     

  </div>
</body>

</html>
    `;
};

export default function Recibo() {
  const { recibo, setRecibo } = useReciboContext();
  const { clienteRecibo, setClienteRecibo } = useClienteReciboContext();

  const [modalVisibleNome, setModalVisibleNome] = useState(false);
  const [modalVisibleValor, setModalVisibleValor] = useState(false);
  const [modalVisibleAddMaterial, setModalVisibleAddMaterial] = useState(false);
  const [modalVisibleAddCliente, setModalVisibleAddCliente] = useState(false);
  const [indexDoItemAEditar, setIndexDoItemAEditar] = useState(null);

  const [total, setTotal] = useState(0);

  const numColumns = 1;

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
    Alert.alert("", "Deseja apagar todos os itens do recibo?", [
      { text: "Não", onPress: () => console.log("Cancelada Exclusão") },
      {
        text: "Sim",
        onPress: () => {
          setRecibo([]);
          setClienteRecibo([]);
        },
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
      novoRecibo[index].quantidade = Math.max(novoRecibo[index].quantidade, 1);
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

  const calcularTotalRecibo = () => {
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
    // Chame a função para calcular o total sempre que o recibo for alterado
    calcularTotalRecibo();
  }, [recibo]);

  const renderItem = ({ item, index }) => (
    <View style={styles.listaContainer}>
      {/* Nome Produto + valor */}
      <View style={styles.superior}>
        <TouchableOpacity
          onPress={() => editarNome(index)}
          style={styles.nomeProduto}
        >
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
          <TouchableOpacity onPress={() => editarValor(index)}>
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

  const gerarPDF = async () => {
    try {
      const htmlString = ReciboHtml({ recibo, clienteRecibo });
      const file = await Print.printToFileAsync({
        html: htmlString,
        base64: false,
      });
      // Diretório onde você quer salvar o PDF
      const pastaRecibosSalvos = `${FileSystem.documentDirectory}assets/`;

      // Garantir que o diretório exista
      await FileSystem.makeDirectoryAsync(pastaRecibosSalvos, {
        intermediates: true,
      });

      // Caminho para o arquivo no diretório específico
      const caminhoNoDiretorio = `${pastaRecibosSalvos}Recibo.pdf`;

      // Mover o arquivo para o diretório específico
      await FileSystem.moveAsync({
        from: file.uri,
        to: caminhoNoDiretorio,
      });
      // Exibir o visualizador de PDF
      await Sharing.shareAsync(caminhoNoDiretorio);
    } catch (error) {
      console.error("Erro ao gerar e compartilhar o PDF:", error);
    }
  };

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
            <Text style={styles.buttonText}>Adicionar Serviços</Text>
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
      <Modal
        visible={modalVisibleAddCliente}
        animationType="fade"
        transparent={true}
      >
        <ModalAdicionarCliente
          handleClose={() => setModalVisibleAddCliente(false)}
          tipo="Recibo"
        />
      </Modal>

      <Modal
        visible={modalVisibleAddMaterial}
        animationType="fade"
        transparent={true}
      >
        <ModalAdicionarMaterial
          handleClose={() => setModalVisibleAddMaterial(false)}
          tipo="Recibo"
        />
      </Modal>

      <Modal visible={modalVisibleNome} animationType="fade" transparent={true}>
        <ModalEditarNome
          handleClose={() => setModalVisibleNome(false)}
          indexDoItemAEditar={indexDoItemAEditar}
          tipo={"Recibo"}
        />
      </Modal>
      <Modal
        visible={modalVisibleValor}
        animationType="fade"
        transparent={true}
      >
        <ModalEditarValor
          handleClose={() => setModalVisibleValor(false)}
          indexDoItemAEditar={indexDoItemAEditar}
          tipo={"Recibo"}
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
    alignSelf: "center",
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
    width: "98%",
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
    textAlign: "center",
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
