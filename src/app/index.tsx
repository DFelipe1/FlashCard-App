import { CreateDeckModal } from "@/components/CreateDeckModal";
import { Deck } from "@/components/Deck";
import { Header } from "@/components/Header";
import { useDeckStore } from "@/store/deckStore";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useState } from "react";
import { Pressable, ScrollView, StatusBar, StyleSheet, View } from "react-native";

export default function Index(){

    const decks = useDeckStore(state => state.decks)

    const [modalVisible, setModalVisible] = useState(false)

    function toggleModal() {
     setModalVisible(!modalVisible)
    }

    return (
        <>
            <Header  title="Meus Decks" asChild>
                
                <Pressable onPress={toggleModal} style={({ pressed }) => [ styles.addButton, pressed && styles.pressed]}>
                    <Ionicons name="add" size={24} color={'#fff'}/>
                </Pressable>
                      
                <CreateDeckModal modalVisible={modalVisible} toggleModal={toggleModal}/>
            </Header>
            <ScrollView>
                <View style={styles.decks}>
                    {decks.map(deck => {
                        return <Deck key={deck.id} title={deck.title} id={deck.id}/>
                    })}
                </View>
            </ScrollView>
        
            <StatusBar barStyle={"default"} />
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
     pressed: {
        opacity: 0.85,
        transform: [{ scale: 0.97 }],
    },

    addButton: {
      padding: 4,
      borderRadius: 4,
      position: 'absolute',
      right: 16,
      top: '50%',
      backgroundColor: '#222',
      boxShadow: "2px 2px 12px rgba(0,0,0,0.1)",
    },
})