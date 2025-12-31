import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export function Deck(){
  return (
     <TouchableOpacity style={styles.deck} activeOpacity={0.7}>
        <View style={styles.cards}>
            <View style={styles.card1}/>
            <View style={styles.card2}/>
            <View style={styles.card3}/>
        </View>
        <Text style={styles.deckName}>Programação</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
    deck: {
        display: "flex",
        flex: 1,
        minWidth: 175,
        maxWidth: '48%',
        padding: 12,
        borderRadius: 8,
        backgroundColor: '#f7f7f7ff',
        alignItems: 'center',
        gap: 12,
        overflow: 'hidden',
        boxShadow: "2px 2px 12px rgba(0,0,0,0.1)",
    },

    deckName: {
        fontSize: 16,
        fontWeight: '500'
    },

    cards: {
        width: '100%',
        height: 170,
        position: 'relative',
    },


    card1: {
        position: 'absolute',
        height: '100%',
        width: '75%',
        borderRadius: 4,
        backgroundColor: '#bfffa6',
        left: '50%',
        transform: 'translateX(-60%)',
        zIndex: 2,
        boxShadow: "1px 1px 6px rgba(0,0,0,0.2)",
    },
    
    card2: {
        position: 'absolute',
        height: '100%',
        width: '75%',
        borderRadius: 4,
        backgroundColor: '#fcce36ff',
        left: '50%',
        transform: 'translateX(-70%) rotate(-5deg)',
        zIndex: 1
    },

    card3: {
        position: 'absolute',
        height: '100%',
        width: '75%',
        borderRadius: 4,
        backgroundColor: '#aa69ffff',
        left: '50%',
        transform: 'translateX(-50%) rotate(5deg)',
        zIndex: 0
    }
})