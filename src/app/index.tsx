import { Deck } from "@/components/Deck";
import { Header } from "@/components/Header";
import { ScrollView, StatusBar, StyleSheet, View } from "react-native";

export default function Index(){
    return (
        <>
            <Header/>
            <ScrollView>
                <View style={styles.decks}>
                    <Deck/>
                    <Deck/>
                    <Deck/>
                </View>
            </ScrollView>
        
            <StatusBar barStyle={"light-content"}/>
        </>
    )
}

const styles = StyleSheet.create({
    decks: {
        flex: 1,
        display: 'flex',
        flexDirection: 'row',
        flexWrap: "wrap",
        gap: 12,
        padding: 8,
    },
})