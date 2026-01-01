import { useRouter } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";

type DeckProps = {
    id: string
    title: string
}

export function Deck({ title, id }: DeckProps){

    const router = useRouter()

    function handleScreenDeckId(id: string) {
        router.push(`/${id}`)
    }

  return (
     <Pressable onPress={()=> handleScreenDeckId(id)} style={({ pressed }) => [ styles.deck, pressed && styles.pressed]}>
        <View style={styles.cards}>
            <View style={styles.card1}/>
            <View style={styles.card2}/>
            <View style={styles.card3}/>
        </View>
        <Text style={styles.deckName}>{title}</Text>
    </Pressable>
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
    pressed: {
        opacity: 0.85,
        transform: [{ scale: 0.97 }],
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