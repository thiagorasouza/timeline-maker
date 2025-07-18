import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit"
import { eventsReducer } from "../features/events/eventsSlice"

export const store = configureStore({
  reducer: {
    events: eventsReducer,
  },
})

export type AppStore = typeof store
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export type AppThunk<ThunkReturnType = void> = ThunkAction<
  ThunkReturnType,
  RootState,
  unknown,
  Action
>
