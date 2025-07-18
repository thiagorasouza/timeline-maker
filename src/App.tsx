import { EventForm } from "./components/EventForm"
import { Counter } from "./features/counter/Counter"

export function App() {
  return (
    <main className="max-w-3xl border p-4 m-4 rounder-md mx-auto">
      <header className="mb-4">
        <h1 className="font-semibold text-2xl text-center">Timeline Maker</h1>
      </header>
      <EventForm />
    </main>
  )
}
