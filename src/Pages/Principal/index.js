import React from "react";
import {
    View,
    TouchableOpacity,
    Text,
    StyleSheet,
    FlatList,
    ImageBackground
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import "react-native-gesture-handler";

const data = [
    { id: "1", category: "Elétrica" },
    { id: "2", category: "Água Fria" },
    { id: "3", category: "Água Quente" },
    { id: "4", category: "Esgoto" },
];

export default function Principal() {
    const navigation = useNavigation();

    const navigateToPage = (pageName) => {
        navigation.navigate(pageName);
    };

    const imageMapping = {
        'Elétrica': require("../../../assets/images/eletrica.jpg"),
        'Água Fria': require("../../../assets/images/aguaFria.jpg"),
        "Água Quente": require("../../../assets/images/aguaQuente.jpg"),
        'Esgoto': require("../../../assets/images/esgoto.jpg")
    };



    const renderItem = ({ item }) => (
        <TouchableOpacity
            style={styles.lista}
            onPress={() => navigateToPage(item.category)}
        >
            <ImageBackground source={imageMapping[item.category]} style={styles.img}>
                <Text style={styles.text}>{item.category}</Text>
            </ImageBackground>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <View style={{ top: 30 }}>
                <FlatList
                    data={data}
                    keyExtractor={(item) => item.id}
                    renderItem={renderItem}
                    numColumns={2}
                />
            </View>


            <Text style={{ position: "absolute", top: 615, color: "#2506ec" }}>By: MiSsiNhOo</Text>
            <TouchableOpacity
                style={styles.button}
                onPress={() => navigation.navigate("Carrinho")}
            >
                <Text style={styles.buttonText}>Itens do Carrinho</Text>

            </TouchableOpacity>
            <TouchableOpacity
                style={styles.button}
                onPress={() => navigation.navigate("Lista de Materiais")}
            >
                <Text style={styles.buttonText}>Lista de Materiais</Text>

            </TouchableOpacity>


        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        height: "100%",
        margin: 0,
        backgroundColor: "#ffff",
        alignItems: "center",
    },
    lista: {
        margin: 3,
        height: 120,
        justifyContent: "center",
        //backgroundColor: "#fafa"
    },
    text: {
        color: "#363636",
        fontSize: 20,
        fontWeight: "bold",
        textAlign: "center",
    },

    img: {
        height: 105,
        width: 169,
        borderRadius: 7,
        overflow: "hidden",
        borderColor: "#2506ec",
        borderWidth: 3,
    },
    button: {
        marginTop: -150,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#2506ec",
        borderRadius: 8,
        padding: 15,
        width: "80%",
        alignSelf: "center",
        // flexDirection: "row",
        elevation: 30,
    },
    buttonText: {
        color: "#fff",
        fontSize: 20,
        fontWeight: "bold",
        left: -10,
    },
});
