import { configureStore } from "@reduxjs/toolkit"
import { counterReducer } from "../features/counter/counterSlice"
import { eventsReducer } from "../features/events/eventsSlice"

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    events: eventsReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
