import { Deck } from "@/components/Deck";
import { Header } from "@/components/Header";
import { decks } from '@/data/data';
import { ScrollView, StatusBar, StyleSheet, View } from "react-native";

export default function Index(){

    

    return (
        <>
            <Header/>
            <ScrollView>
                <View style={styles.decks}>
                    {decks.map(deck => {
                        return <Deck key={deck.id} title={deck.title} id={deck.id}/>
                    })}
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