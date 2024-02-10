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

export default function Principal() {
    const navigation = useNavigation();

    /*     const navigateToPage = () => {
            navigation.navigate('Materiais');
        };
    
        const imageMapping = {
            'Materiais': require("../../../assets/images/eletrica.jpg"),
        }; */

    return (
        <View style={styles.container}>
            <View >
                <TouchableOpacity
                    style={styles.lista}
                    onPress={() => navigation.navigate("Materiais")}
                >
                    <ImageBackground source={require("../../../assets/images/eletrica.jpg")} style={styles.img}>
                        <Text style={styles.text}>Materiais</Text>
                    </ImageBackground>
                </TouchableOpacity>
            </View>


            <Text style={{ position: "absolute", top: 615, color: "#2506ec" }}>By: MiSsiNhOo</Text>
            <TouchableOpacity
                style={styles.button}
                onPress={() => navigation.navigate("Lista de Materiais")}
            >
                <Text style={styles.buttonText}>Lista de Materiais</Text>

            </TouchableOpacity>

            <TouchableOpacity
                style={styles.button}
                onPress={() => navigation.navigate("Orcamento")}>
                <Text style={styles.buttonText}>Orçamento</Text>
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
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#2506ec",
        borderRadius: 8,
        padding: 15,
        width: "80%",
        alignSelf: "center",
        elevation: 30,
        marginVertical: 10
    },
    buttonText: {
        color: "#fff",
        fontSize: 20,
        fontWeight: "bold",
        left: -10,
    },
});
