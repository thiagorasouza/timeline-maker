import { useState } from "react"
import { EventForm } from "./components/EventForm"
import { EventList } from "./components/EventList"

export function App() {
  const [eventId, setEventId] = useState<string>()

  return (
    <main className="max-w-3xl border p-4 m-4 rounder-md mx-auto">
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
      </section>
    </main>
  )
}
