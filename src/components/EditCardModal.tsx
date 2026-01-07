import { useDeckStore } from "@/store/deckStore";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useState } from "react";
import { Modal, Pressable, StyleSheet, Text, TextInput, View } from "react-native";

interface EditCardModalProps{
  modalVisible: boolean
  toggleModal: () => void
  deckId: string
  cardId: string
  question: string
  answer: string
}

export function EditCardModal({ modalVisible, toggleModal, deckId, cardId, question, answer }: EditCardModalProps){


  const [newQuestion, setNewQuestion] = useState(question)
  const [newAnswer, setNewAnswer] = useState(answer)

  const editCard = useDeckStore(state => state.editCard)


  function handleUpdateCard(){
   if(!newQuestion.trim() || !newAnswer.trim()) return

   editCard(deckId, cardId, newQuestion, newAnswer)

   setNewQuestion("")
   setNewAnswer("")
   toggleModal()
  }

  return (
    <Modal
      animationType="slide" // 'fade', 'slide', 'none'
      transparent={true} // background transparente
      visible={modalVisible}
      onRequestClose={() => { // Para Android ao pressionar voltar
        toggleModal();
      }}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <View style={styles.modalViewHeader}>
            <Text style={styles.modalHeaderText}>Editando Carta</Text>
            <Pressable onPress={toggleModal} style={({ pressed }) => [ pressed && styles.pressed]}>
              <Ionicons name="close" size={24}/>
            </Pressable>
          </View>

          <View style={styles.modalContent}>
            <Text style={styles.text}>
              Qual a pergunta dessa carta?
            </Text>
            <TextInput style={styles.input} value={newQuestion} onChangeText={e => setNewQuestion(e)} placeholder='Digite a pergunta'/>
            
            <Text style={styles.text}>
              Qual a resposta da pergunta?
            </Text>
            <TextInput style={styles.input} value={newAnswer} onChangeText={e => setNewAnswer(e)} placeholder='Digite a resposta'/>

            <Pressable onPress={handleUpdateCard} style={({ pressed }) => [ styles.button, pressed && styles.pressed]}>
              <Text style={styles.buttonText}>
                Editar
              </Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  )
} 

const styles = StyleSheet.create({
  pressed: {
        opacity: 0.85,
        transform: [{ scale: 0.97 }],
    },

    centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)', // Fundo escuro para o modal
  },
  modalView: {
    width: '80%',
    margin: 12,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 24,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalViewHeader: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 0.5,
    borderBottomColor: '#f1f1f1',
    marginBottom: 20,
  },
  modalHeaderText: {
    marginBottom: 8,
    fontSize: 20,
  },
  modalContent: {
    marginTop: 8,
    width: '100%',
    gap: 12,
  },

  text: {
    fontSize: 14,
    color: '#222'
  },

  input: {
    width: '100%',
    height: 50,
    borderWidth: 1,
    borderColor: '#f4f4f4',
    padding: 8,
    borderRadius: 4,
    fontSize: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },

  button: {
    width: '100%',
    padding: 8,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#222',
    marginTop: 8
  },

  buttonText: {
    fontSize: 14,
    color: '#fff'
  }
})