import {
  createEntityAdapter,
  createSelector,
  createSlice,
  EntityState,
  PayloadAction,
} from "@reduxjs/toolkit"
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

interface EventsState extends EntityState<Event, string> {
  status: "idle" | "pending" | "fulfilled" | "failed"
  dateFilter: DateFilter
}

const eventsAdapter = createEntityAdapter<Event>({
  sortComparer: (a, b) => b.date.localeCompare(a.date),
})

const initialDateFilter: DateFilter = {
  start: getPastDateString(30),
  end: getFutureDateString(30),
}

const initialState: EventsState = eventsAdapter.getInitialState({
  status: "idle",
  dateFilter: initialDateFilter,
})

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

export const saveEvent = createAppAsyncThunk(
  "events/saveEvent",
  async (event: Omit<Event, "id">) => {
    const rawEvents = localStorage.getItem("events")
    const events = rawEvents ? JSON.parse(rawEvents) : []

    const eventData = { id: uuidv4(), ...event }
    events.push(eventData)

    localStorage.setItem("events", JSON.stringify(events))
    return eventData
  },
)

export const eventsSlice = createSlice({
  name: "events",
  initialState,
  reducers: {
    removeEvent: (state, action: PayloadAction<string>) => {
      eventsAdapter.removeOne(state, action.payload)
    },
    updateEvent: (state, action: PayloadAction<Event>) => {
      eventsAdapter.updateOne(state, {
        id: action.payload.id,
        changes: action.payload,
      })
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
      eventsAdapter.setAll(state, action.payload)
    })
    builder.addCase(fetchEvents.pending, state => {
      state.status = "pending"
    })
    builder.addCase(fetchEvents.rejected, state => {
      state.status = "failed"
    })
    builder.addCase(saveEvent.fulfilled, (state, action) => {
      eventsAdapter.addOne(state, action.payload)
    })
  },
})

export const eventsReducer = eventsSlice.reducer

export const { removeEvent, updateEvent, setDateFilter, clearDateFilter } =
  eventsSlice.actions

export const { selectAll: selectAllEvents, selectById: selectEventById } =
  eventsAdapter.getSelectors((state: RootState) => state.events)

export const selectDateFilter = (state: RootState) => state.events.dateFilter

export const selectEventStatus = (state: RootState) => state.events.status

export const selectFilteredEvents = createSelector(
  [selectDateFilter, selectAllEvents],
  (dateFilter, events) => {
    const { start, end } = dateFilter
    if (start && end) {
      return events.filter(event => {
        const date = new Date(event.date)
        return date >= new Date(start) && date <= new Date(end)
      })
    }
    return events
  },
)
