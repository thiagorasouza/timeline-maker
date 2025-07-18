import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { getFutureDateString, getPastDateString } from "../../utils/helpers"
import { RootState } from "../../app/store"

export interface Event {
  id: string
  title: string
  description: string
  date: string
}

export interface DateFilter {
  start: string
  end: string
}

const initialState: { dateFilter: DateFilter; events: Event[] } = {
  dateFilter: {
    start: getPastDateString(30),
    end: getFutureDateString(30),
  },
  events: [
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
  ],
}

export const eventsSlice = createSlice({
  name: "events",
  initialState,
  reducers: {
    addEvent: (state, action: PayloadAction<Event>) => {
      state.events.push(action.payload)
    },
    removeEvent: (state, action: PayloadAction<string>) => {
      state.events = state.events.filter(event => event.id !== action.payload)
    },
    updateEvent: (state, action: PayloadAction<Event>) => {
      const index = state.events.findIndex(
        event => event.id === action.payload.id,
      )
      if (index !== -1) {
        state.events[index] = action.payload
      }
    },
    setDateFilter: (state, action: PayloadAction<DateFilter>) => {
      state.dateFilter = action.payload
    },
  },
})

export const eventsReducer = eventsSlice.reducer

export const { addEvent, removeEvent, updateEvent, setDateFilter } =
  eventsSlice.actions

export const selectAllEvents = (state: RootState) => state.events.events
export const selectEventById = (state: RootState, id?: string) =>
  id ? state.events.events.find(event => event.id === id) : undefined
export const selectDateFilter = (state: RootState) => state.events.dateFilter
