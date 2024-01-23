import { View, StyleSheet, ImageBackground, Image } from "react-native";

export default function Header() {
    return (
        <View ><View style={styles.header} ></View>
            <View style={{ alignItems: "center", height: 120 }}>
                <Image style={styles.img} source={require('../Images/logo23.jpg')} />
            </View>
        </View>

    );
}

const styles = StyleSheet.create({
    header: {
        backgroundColor: "#2506ec",
        width: "100%",
        height: 10
    },
    img: {
        top: 15,
        height: 100,
        width: 300,

    }
})