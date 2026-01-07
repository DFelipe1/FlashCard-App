import Ionicons from "@expo/vector-icons/Ionicons";
import { useEffect, useState } from "react";
import { Dimensions, Pressable, StyleSheet, Text, View } from "react-native";
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { DeleteCardModal } from "./DeleteCardModal";
import { EditCardModal } from "./EditCardModal";

interface Card{
  id: string,
  question: string
  answer: string
}

type FlashCardProps = {
  card: Card
  deckId: string
  active: boolean
}

const { width } = Dimensions.get("window")

export function FlashCard({ card, active, deckId }: FlashCardProps){

  const [modalEditVisible, setModalEditVisible] = useState(false)
  const [modalDeleteVisible, setModalDeleteVisible] = useState(false)
      
  function toggleEditModal() {
      setModalEditVisible(!modalEditVisible)
  }

  function toggleDeleteModal() {
      setModalDeleteVisible(!modalDeleteVisible)
  }

  const flipped = useSharedValue(0)

  useEffect(() => {
    if (!active) {
      flipped.value = 0
    }
  }, [active]);

  const frontStyle = useAnimatedStyle(() => ({
    transform: [
      { perspective: 1000 },
      { rotateY: `${flipped.value * 180}deg` },
    ]
  }))

  const backStyle = useAnimatedStyle(() => ({
    transform: [
      { perspective: 1000 },
      { rotateY:`${flipped.value * 180 + 180}deg`}
    ]
  }))

  const flip = () => {
    flipped.value = withTiming(flipped.value ? 0 : 1, {
      duration: 400
    })
  }

  return (
    <Pressable onPress={flip} style={styles.cardContainer} key={card.id}>
     <View style={styles.flipContainer}>
      <Animated.View style={[styles.card, styles.front, frontStyle]}>
        <Text style={styles.question}>
          {card.question}
        </Text>
       
      </Animated.View>

      <Animated.View style={[styles.card, styles.back, backStyle]}>
        <Text style={styles.anwser}>
          {card.answer}
        </Text>
      </Animated.View>
     </View>

      <View style={styles.actions}>
        <Pressable onPress={() => setModalEditVisible(true)} style={styles.action}>
          <Ionicons name="pencil" size={24}/>
        </Pressable>
        <Pressable onPress={() => setModalDeleteVisible(true)} style={styles.action}>
          <Ionicons name="trash" size={24}/>
        </Pressable>
      </View>
     <DeleteCardModal modalVisible={modalDeleteVisible} toggleModal={toggleDeleteModal} deckId={deckId} cardId={card.id} />
     <EditCardModal modalVisible={modalEditVisible} toggleModal={toggleEditModal} deckId={deckId} cardId={card.id}/>

    </Pressable>
  )
}

const styles = StyleSheet.create({
  cardContainer: {
    width: width,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12
  },

  flipContainer: {
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },

  front: {
    backfaceVisibility: "hidden",
  },

  back: {
    backfaceVisibility: "hidden",
    position: "absolute",
    top: 0,
    bottom:0,
    left: 0,
    backgroundColor: "#fff",
  },

  card: {
    width: width,
    minHeight: "100%",
    backfaceVisibility: 'hidden',
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#bcfc9f',
    padding: 24,
  },

  question:{
    fontSize: 20,
    fontWeight: "700",
    textAlign: "center"
  },

  anwser: {
    color: '#000',
    fontSize: 16,
    fontWeight: "300",
    textAlign: "center"
  },

  actions: {
    width: '100%',
    position: 'absolute',
    bottom: 10,
    flexDirection: 'row',
    gap: 8
  },

  action: {
    flex: 1,
    padding: 12,
    backgroundColor: '#ffffff52',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
      shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  }
})