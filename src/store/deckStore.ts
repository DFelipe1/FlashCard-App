import AsyncStorage from "@react-native-async-storage/async-storage"
import { create } from "zustand"
import { createJSONStorage, persist } from "zustand/middleware"

type Card = {
  id: string
  question: string
  answer: string
}

type Deck = {
  id: string
  title: string
  cards: Card[]
}

type Store = {
  decks: Deck[]

  createDeck: (title: string) => void
  deleteDeck: (id: string) => void

  addCard: (deckId: string, q: string, a: string) => void
  editCard: (deckId: string, cardId: string, q: string, a: string) => void
  removeCard: (deckId: string, cardId: string) => void
}

export const useDeckStore = create<Store>()(
  persist((set) => ({
  decks: [],

  createDeck: (title) =>
    set((state) => ({
      decks: [
        ...state.decks,
        { id: Date.now().toString(), title, cards: [] },
      ],
    })),

  deleteDeck: (id) =>
    set((state) => ({
      decks: state.decks.filter((deck) => deck.id !== id),
    })),

  addCard: (deckId, question, answer) =>
    set((state) => ({
      decks: state.decks.map((deck) =>
        deck.id === deckId
          ? {
              ...deck,
              cards: [
                ...deck.cards,
                {
                  id: Date.now().toString(),
                  question: question,
                  answer: answer,
                },
              ],
            }
          : deck
      ),
    })),

    editCard: (deckId, cardId, question, answer) =>
    set((state) => ({
      decks: state.decks.map((deck) =>
        deck.id === deckId
          ? {
              ...deck,
              cards: deck.cards.map((card) =>
                card.id === cardId
                  ? { ...card, question: question, answer: answer }
                  : card
              ),
            }
          : deck
      ),
    })),

    removeCard: (deckId, cardId) =>
    set((state) => ({
      decks: state.decks.map((deck) =>
        deck.id === deckId
          ? {
              ...deck,
              cards: deck.cards.filter((card) => card.id !== cardId),
            }
          : deck
      ),
    })),
    
}),
  {
    name: "flashcards-storage",
    storage: createJSONStorage(()=> AsyncStorage),
  }
))

