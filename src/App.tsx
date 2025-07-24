import { useEffect, useState } from "react"
import { EventForm } from "./components/EventForm"
import { EventList } from "./components/EventList"
import { Timeline } from "./components/Timeline"
import { useAppDispatch } from "./app/hooks"
import { fetchEvents } from "./features/events/eventsSlice"

export function App() {
  const [eventId, setEventId] = useState<string>()
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(fetchEvents())
  }, [])

  return (
    <main className="max-w-7xl border p-4 m-4 rounder-md mx-auto">
      <header className="mb-4">
        <h1 className="font-semibold text-2xl text-center">Timeline Maker</h1>
      </header>
      <section className="flex gap-4">
        <EventForm
          className="flex-1"
          eventId={eventId}
          onCancelClick={() => setEventId(undefined)}
        />
        <EventList className="flex-1" onUpdateClick={id => setEventId(id)} />
        <Timeline className="flex-1" />
      </section>
    </main>
  )
}
