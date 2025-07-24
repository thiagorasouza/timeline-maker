import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { getFutureDateString, getPastDateString } from "../../utils/helpers"
import { RootState } from "../../app/store"
import { v4 as uuidv4 } from "uuid"
import { createAppAsyncThunk } from "../../app/thunks"

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

const initialDateFilter: DateFilter = {
  start: getPastDateString(30),
  end: getFutureDateString(30),
}

// const initialEvents: Event[] = [
//   {
//     id: "a1b2c3d4-e5f6-7890-1234-567890abcdef",
//     title: "Lançamento da Nova Linha de Produtos 'Aurora'",
//     description:
//       "Apresentação oficial da coleção 'Aurora', focada em sustentabilidade e design inovador.",
//     date: "2025-08-15",
//   },
//   {
//     id: "f9e8d7c6-b5a4-3210-fedc-ba9876543210",
//     title: "Reunião Semanal de Planejamento de Sprint",
//     description:
//       "Discussão do progresso do sprint atual, planejamento das próximas tarefas e revisão de impedimentos.",
//     date: "2025-07-22",
//   },
// ]

const initialState: {
  dateFilter: DateFilter
  events: Event[]
  status: "idle" | "pending" | "fulfilled" | "failed"
} = {
  dateFilter: initialDateFilter,
  // events: initialEvents,
  events: [],
  status: "idle",
}

export const fetchEvents = createAppAsyncThunk(
  "events/fetchEvents",
  async () => {
    const events = localStorage.getItem("events")
    return events ? JSON.parse(events) : []
  },
  {
    condition: (_, api) => {
      const status = selectEventStatus(api.getState())
      if (status !== "idle") {
        return false
      }
    },
  },
)

export const eventsSlice = createSlice({
  name: "events",
  initialState,
  reducers: {
    addEvent: {
      prepare: (eventData: Omit<Event, "id">) => ({
        payload: { id: uuidv4(), ...eventData },
      }),
      reducer: (state, action: PayloadAction<Event>) => {
        state.events.push(action.payload)
      },
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
    clearDateFilter: state => {
      state.dateFilter = initialDateFilter
    },
  },
  extraReducers: builder => {
    builder.addCase(fetchEvents.fulfilled, (state, action) => {
      state.events = action.payload
    })
    builder.addCase(fetchEvents.pending, state => {
      state.status = "pending"
    })
    builder.addCase(fetchEvents.rejected, state => {
      state.status = "failed"
    })
  },
})

export const eventsReducer = eventsSlice.reducer

export const {
  addEvent,
  removeEvent,
  updateEvent,
  setDateFilter,
  clearDateFilter,
} = eventsSlice.actions

export const selectAllEvents = (state: RootState) => state.events.events

export const selectAllSortedEvents = (state: RootState) => {
  console.log("Events", state.events.events)
  return [...state.events.events].sort((a, b) => {
    return new Date(b.date).getTime() - new Date(a.date).getTime()
  })
}

export const selectFilteredSortedEvents = (state: RootState) => {
  const start = state.events.dateFilter.start
  const end = state.events.dateFilter.end
  if (!start || !end) {
    return selectAllSortedEvents(state)
  }

  return state.events.events
    .filter(event => {
      const date = new Date(event.date)
      return date >= new Date(start) && date <= new Date(end)
    })
    .sort((a, b) => {
      return new Date(b.date).getTime() - new Date(a.date).getTime()
    })
}

export const selectEventById = (state: RootState, id?: string) =>
  id ? state.events.events.find(event => event.id === id) : undefined

export const selectDateFilter = (state: RootState) => state.events.dateFilter

export const selectEventStatus = (state: RootState) => state.events.status
