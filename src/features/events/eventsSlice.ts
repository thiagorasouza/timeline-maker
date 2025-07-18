import { createSlice, PayloadAction } from "@reduxjs/toolkit"

export interface Event {
  id: string
  title: string
  description: string
  date: string
}

export type EventsState = Event[]

const initialState: EventsState = [
  {
    id: "a1b2c3d4-e5f6-7890-1234-567890abcdef",
    title: "Lançamento da Nova Linha de Produtos 'Aurora'",
    description:
      "Apresentação oficial da coleção 'Aurora', focada em sustentabilidade e design inovador.",
    date: "2025-08-15",
  },
  {
    id: "f9e8d7c6-b5a4-3210-fedc-ba9876543210",
    title: "Reunião Semanal de Planejamento de Sprint",
    description:
      "Discussão do progresso do sprint atual, planejamento das próximas tarefas e revisão de impedimentos.",
    date: "2025-07-22",
  },
]

export const eventsSlice = createSlice({
  name: "events",
  initialState,
  reducers: {
    add: (state, action: PayloadAction<Event>) => {
      state.push(action.payload)
    },
    remove: (state, action: PayloadAction<string>) => {
      return state.filter(event => event.id !== action.payload)
    },
    update: (state, action: PayloadAction<Event>) => {
      const index = state.findIndex(event => event.id === action.payload.id)
      if (index !== -1) {
        state[index] = action.payload
      }
    },
  },
})

export const eventsReducer = eventsSlice.reducer

export const { add, remove, update } = eventsSlice.actions
