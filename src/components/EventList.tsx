import { useAppSelector } from "../app/hooks"

export function EventList({ className }: { className?: string }) {
  const events = useAppSelector(state => state.events)

  if (events.length === 0) {
    return (
      <div className={`${className}`}>
        <h2 className="font-semibold mb-4">Events</h2>
        <p>No events yet.</p>
      </div>
    )
  }

  return (
    <div className={`${className}`}>
      <h2 className="font-semibold mb-4">Events</h2>
      <ul className="flex flex-col gap-3">
        {events.map(event => (
          <li key={event.id}>
            <span className="font-medium">{event.title}</span>
            <br />
            {new Date(event.date).toLocaleDateString("pt-BR")}
          </li>
        ))}
      </ul>
    </div>
  )
}
