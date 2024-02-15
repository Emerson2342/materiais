import { View, StyleSheet, ImageBackground, Image } from "react-native";

export default function Header() {
    return (
        <View ><View style={styles.header} ></View>
            <Image style={styles.img} source={require('../Images/logo23.jpg')} />
        </View >

    );
}

const styles = StyleSheet.create({
    header: {
        backgroundColor: "#2506ec",
        width: "100%",
    },
    img: {
        alignSelf: "center",
        width: 200,
        objectFit: "contain",
        height: 80
    },

})