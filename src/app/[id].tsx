import { useSearchParams } from "expo-router/build/hooks"
import { Text, View } from "react-native"

export function FlaskCards(){
  const id = useSearchParams()

  return (
    <View>
      <Text>{id}</Text>
    </View>
  )
}