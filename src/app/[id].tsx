import { CreateCardModal } from "@/components/CreateCardModal";
import { FlashCard } from "@/components/FlashCard";
import { Header } from "@/components/Header";
import { useDeckStore } from "@/store/deckStore";
import { getParam } from "@/utils/getParam";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";

export default function FlaskCards(){
  const [ numberShowCard, setNumberShowCard ] = useState(1)  
  const [modalVisible, setModalVisible] = useState(false)

  const decks = useDeckStore(state => state.decks)

  const { id } = useLocalSearchParams();

  const deckId = getParam(id)

  if (!deckId) {
    return <Text>Deck inválido</Text>
  }

  const deck = decks.find(deck => deck.id === deckId)

  if(!deck){
    return <Text>not exist deck id</Text>
  }

  const viewabilityConfig = {
    itemVisiblePercentThreshold: 70
  }

  function toggleModal() {
    setModalVisible(!modalVisible)
  }

  return (
    <View style={styles.container}>
      <Header isBack title={deck.title} asChild>
         <Pressable onPress={toggleModal} style={({ pressed }) => [ styles.addButton, pressed && styles.pressed]}>
              <Ionicons name="add" size={24} color={'#fff'}/>
          </Pressable>
                
          <CreateCardModal modalVisible={modalVisible} toggleModal={toggleModal} deckId={deckId}/>
      </Header>
      <View style={styles.content}>
        <View style={styles.containerDeck}>
          <View style={styles.paginationCards}>
            <Text style={styles.textPaginationCards}>{`${numberShowCard} / ${deck.cards.length}`}</Text>
          </View>
          <FlatList
            data={deck.cards}
            keyExtractor={(item) => item.id}
            horizontal
            pagingEnabled
            snapToAlignment="center"
            decelerationRate='fast'
            showsHorizontalScrollIndicator={false}
            viewabilityConfig={viewabilityConfig}
            onViewableItemsChanged={({ viewableItems  }) => {
              const first = viewableItems[0]

              if (first?.index != null) {
                setNumberShowCard(first.index + 1)
              }
            }}
            renderItem={({ item, index }) => (
             <FlashCard 
              card={item}
              deckId={deckId}
              active={index + 1 === numberShowCard}
            />
            )}
          />
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  content: {
    flex: 1,
    alignContent: 'center'
  },

  containerDeck: {
    width: '100%',
    gap: 12,
    position: 'relative',
    alignItems: 'center'
  },

  paginationCards: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 1000,
    backgroundColor: '#ccc',
    position: 'absolute',
    right: 24,
    top: 16,
    zIndex: 100
  },

  textPaginationCards: {
    fontSize: 12,
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