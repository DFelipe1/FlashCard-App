import { FlashCard } from "@/components/FlashCard";
import { Header } from "@/components/Header";
import { decks } from "@/data/data";
import { useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";

export default function FlaskCards(){
  const [ numberShowCard, setNumberShowCard ] = useState(1)
  
  const { id } = useLocalSearchParams();

  const deck = decks.find(deck => deck.id === id)

  if(!deck){
    return <Text>not exist deck id</Text>
  }

  const viewabilityConfig = {
    itemVisiblePercentThreshold: 70
  }



  return (
    <View style={styles.container}>
      <Header isBack title={deck.title} />
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
})