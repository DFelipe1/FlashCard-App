import Ionicons from '@expo/vector-icons/Ionicons';
import { useRouter } from 'expo-router';
import { ReactNode } from 'react';
import { Pressable, StyleSheet, Text, View } from "react-native";

type HeaderProps = {
  isBack?: boolean
  title: string
  asChild?: boolean
  children?: ReactNode
}

export function Header({isBack= false, title, children, asChild = false}: HeaderProps){

  const route = useRouter()

  function handleGoBack() {
    route.back()
  }

  

  return(
    <View style={styles.header}>
      {isBack && (
        <Pressable onPress={handleGoBack} style={({ pressed }) => [ styles.back, pressed && styles.pressed]}>
          <Ionicons name="arrow-back" size={24}/>
        </Pressable>
      )}
      
      <Text style={styles.title}>{title}</Text>

      {asChild && children}

    </View>
  )
}

const styles = StyleSheet.create({
    header: {
        marginVertical: 12,
        paddingVertical: 16,
        flexDirection: 'row',
        justifyContent: 'center',
        borderBottomWidth: 0.5,
        borderBottomColor: '#ddd',
        boxShadow: "0 5px 6px rgba(0,0,0,0.02)",
        position: 'relative',
    },

    title: {
        fontSize: 18,
        fontWeight: '500'
    },

    back: {
      padding: 4,
      borderRadius: 4,
      position: 'absolute',
      left: 16,
      top: '50%',
      backgroundColor: '#f7f7f7',
      boxShadow: "2px 2px 12px rgba(0,0,0,0.1)",
    },
    pressed: {
        opacity: 0.85,
        transform: [{ scale: 0.97 }],
    },
})