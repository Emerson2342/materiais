import React, { useState, useEffect } from "react";
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    Alert,
    Modal,
    TouchableOpacity,
} from "react-native";

import ModalEditarNome from "../../Modal/ModalEditarNome";
import ModalEditarValor from "../../Modal/ModalEditarValor";
import { MaterialIcons, AntDesign } from "@expo/vector-icons";
import { useCarrinhoContext } from "../../Context/CarrinhoContext";

export default function Carrinho() {
    const { carrinho, setCarrinho } = useCarrinhoContext();

    const [modalVisibleNome, setModalVisibleNome] = useState(false);
    const [modalVisibleValor, setModalVisibleValor] = useState(false);
    const [indexDoItemAEditar, setIndexDoItemAEditar] = useState(null);

    const [total, setTotal] = useState(0);

    const exibirCarrinho = () => {
        const mensagem = carrinho
            .map((item, index) => {
                return `Produto: ${item.produto}\nPreço: R$ ${item.valor}\nQuantidade: ${item.quantidade}\n
-----------------------------------------------------------------`;
            })
            .join("\n");

        Alert.alert("Informações dos Itens", mensagem);
    };

    const editarValor = (index) => {
        setIndexDoItemAEditar(index);
        setModalVisibleValor(true);
    };

    const removerItem = (indexToRemove) => {
        // Criar um novo array excluindo o item com o índice indexToRemove
        const novoArray = carrinho.filter((item, index) => index !== indexToRemove);

        // Atualizar o estado com o novo array
        setCarrinho(novoArray);
    };

    const limparCarrinho = () => {
        setCarrinho([]);
    };

    const confirmarApagarItem = (index) => {
        Alert.alert("", "Deseja apagar o item da lista?", [
            { text: "Não", onPress: () => console.log("Cancelado Exclusão") },
            { text: "Sim", onPress: () => removerItem(index) },
        ]);
    };

    const confirmarApagarCarrinho = (index) => {
        Alert.alert("", "Deseja apagar todos os itens do carrinho?", [
            { text: "Não", onPress: () => console.log("Cancelada Exclusão") },
            { text: "Sim", onPress: () => limparCarrinho() },
        ]);
    };

    const handleIncrement = (index) => {
        setCarrinho((prevCarrinho) => {
            const novoCarrinho = [...prevCarrinho];
            novoCarrinho[index].quantidade += 1;
            // Garante que a quantidade mínima seja 1
            novoCarrinho[index].quantidade = Math.max(
                novoCarrinho[index].quantidade,
                1
            );
            return novoCarrinho;
        });
    };

    const handleDecrement = (index) => {
        setCarrinho((prevCarrinho) => {
            const novoCarrinho = [...prevCarrinho];
            novoCarrinho[index].quantidade = Math.max(
                novoCarrinho[index].quantidade - 1,
                1
            );
            return novoCarrinho;
        });
    };

    const calcularTotalCarrinho = () => {
        let novoTotal = 0;

        for (const item of carrinho) {
            // Certifique-se de que o item tem as propriedades valor e quantidade
            if (item.valor !== undefined && item.quantidade !== undefined) {
                novoTotal += item.valor * item.quantidade;
            }
        }
        setTotal(novoTotal);
        return novoTotal;
    };

    useEffect(() => {
        // Chame a função para calcular o total sempre que o carrinho for alterado
        calcularTotalCarrinho();
    }, [carrinho]);

    const renderItem = ({ item, index }) => (
        <View style={styles.listaContainer}>
            {/* Nome Produto + valor */}
            <View style={styles.superior}>
                <View style={styles.nomeProduto}>
                    {item.produto && item.produto.trim() !== "" && (
                        <Text style={styles.textLista}>
                            {index + 1} - {item.produto}
                        </Text>
                    )}
                </View>
                <View style={styles.unidadeProduto}>
                    <View>
                        <Text style={styles.textUnidade}>Unidade</Text>
                    </View>
                    <View>
                        <Text style={styles.textUnidade}>
                            R$
                            {(item.valor * 1 || 0).toLocaleString("pt-BR", {
                                minimumFractionDigits: 2,
                                maximumFractionDigits: 2,
                            })}
                        </Text>
                    </View>
                </View>
            </View>

            {/* Apagar produto + quantidade + valor final*/}
            <View style={styles.inferior}>
                <View style={styles.editarProduto}>
                    <TouchableOpacity
                        style={{ alignSelf: "center" }}
                        onPress={() => confirmarApagarItem(index)}
                    >
                        <MaterialIcons name="remove-shopping-cart" size={20} color="red" />
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={{ alignSelf: "center" }}
                        onPress={() => editarValor(index)}
                    >
                        <AntDesign name="edit" size={20} color="green" />
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
                            {carrinho[index].quantidade || 1}
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
                                        item.valor * (carrinho[index].quantidade || 1)
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
            <Modal
                visible={modalVisibleNome}
                animationType="fade"
                transparent={true}
            >
                <ModalEditarNome
                    handleClose={() => setModalVisibleNome(false)}
                    tipo={"Carrinho"}
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
                    tipo={"Carrinho"}
                    indexDoItemAEditar={indexDoItemAEditar}
                />
            </Modal>
        </View>
    );

    return (
        <View>
            <View style={styles.container}>
                <FlatList
                    data={carrinho}
                    renderItem={renderItem}
                    keyExtractor={(item, index) => index.toString()}
                    numColumns={1} // Configura o número de colunas
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
            <TouchableOpacity style={styles.button} onPress={confirmarApagarCarrinho}>
                <Text style={styles.buttonText}>Limpar Carrinho</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingLeft: 10,
        paddingRight: 15,
        maxHeight: 400,
        backgroundColor: "#ffffffff",
        elevation: 17,
        borderColor: "#2506ec",
        borderWidth: 1,
    },
    listaContainer: {
        height: 80,
        borderColor: "#2506ec",
        borderWidth: 1,
        overflow: "hidden",
        borderRadius: 5,
        marginVertical: 5,
        paddingLeft: 5,
        paddingRight: 5,
        elevation: 30,
        backgroundColor: "#ffffff",
    },
    textLista: {
        color: "#0045b1",
        fontSize: 20,
        height: "60%",
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
    button: {
        top: 490,
        position: "absolute",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#2506ec",
        borderRadius: 8,
        padding: 15,
        alignSelf: "center",
        elevation: 8,
    },
    buttonText: {
        color: "#fff",
        fontSize: 20,
        fontWeight: "bold",
    },
    superior: {
        width: "100%",
        height: "60%",
        flexDirection: "row",
        justifyContent: "space-between",
    },
    inferior: {
        width: "100%",
        height: "40%",
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
        // backgroundColor: "#fafa",
        width: "30%",
        flexDirection: "row",
        justifyContent: "space-evenly",

        //alignSelf: "center",
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
        position: "absolute",
        top: 410,
        margin: 10,
        width: "93%",
        flexDirection: "row",
    },
    resumoContent: {
        alignItems: "flex-end",
        width: "100%",
        borderTopWidth: 1,
    },
    textText: {
        fontSize: 15,
        fontWeight: "bold",
        color: "#f47f00",
    },
});
