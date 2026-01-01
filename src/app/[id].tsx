import { Header } from "@/components/Header";
import { decks } from "@/data/data";
import { useLocalSearchParams } from "expo-router";
import { Text, View } from "react-native";

export default function FlaskCards(){
  const { id } = useLocalSearchParams();

  const deck = decks.find(deck => deck.id === id)

  if(!deck){
    return <Text>not exist deck id</Text>
  }


  return (
    <View>
      <Header isBack title={deck.title} />
    </View>
  )
}