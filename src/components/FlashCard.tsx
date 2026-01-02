import { useState } from "react";
import { Pressable, StyleSheet, Text } from "react-native";

interface Card{
  id: string,
  question: string
  answer: string
}

type FlashCardProps = {
  card: Card
}

export function FlashCard({ card }: FlashCardProps){

  const [ toggleShowAnwser, setToggleShowAnwser ] = useState(false)

  return (
    <Pressable onPress={() => setToggleShowAnwser(!toggleShowAnwser)} style={styles.card} key={card.id}>
      {!toggleShowAnwser ? (
      <Text style={styles.question}>
        {card.question}
      </Text>
      ) : (
        <Text style={styles.anwser}>
          {card.answer}
        </Text>
      )}
    </Pressable>
  )
}

const styles = StyleSheet.create({
  card: {
    width: '100%',
    minHeight: 670,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#bcfc9f',
    padding: 24,
    marginBottom: 12
  },

  question:{
    fontSize: 20,
    fontWeight: "700",
    textAlign: "center"
  },

  anwser: {
    fontSize: 16,
    fontWeight: "300",
    textAlign: "center"
  }
})