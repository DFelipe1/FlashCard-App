import { StyleSheet, Text, View } from "react-native";

export function Header(){
  return(
    <View style={styles.header}>
        <Text style={styles.title}>Meus Decks</Text>
    </View>
  )
}

const styles = StyleSheet.create({
    header: {
        marginVertical: 12,
        paddingVertical: 16,
        alignItems: 'center',
        borderBottomWidth: 0.5,
        borderBottomColor: '#ddd',
        boxShadow: "0 5px 6px rgba(0,0,0,0.02)",
    },

    title: {
        fontSize: 18,
        fontWeight: '500'
    }
  })