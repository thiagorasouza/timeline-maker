import { useAppDispatch, useAppSelector } from "../app/hooks"
import { remove } from "../features/events/eventsSlice"

export function EventList({ className }: { className?: string }) {
  const events = useAppSelector(state => state.events)
  const dispatch = useAppDispatch()

  async function handleDelete(id: string) {
    dispatch(remove(id))
  }

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
      <h2 className="font-semibold mb-2">Events</h2>
      <table className="table-auto">
        <thead>
          <tr>
            <th scope="col" className="text-left p-2 border bg-gray-200">
              Title
            </th>
            <th scope="col" className="text-left p-2 border bg-gray-200">
              Date
            </th>
            <th scope="col" className="text-left p-2 border bg-gray-200">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {events.map(event => (
            <tr key={event.id}>
              <td className="p-2 border">{event.title}</td>
              <td className="p-2 border">
                {new Date(event.date).toLocaleDateString("pt-BR")}
              </td>
              <td className="p-2 border">
                <button
                  type="button"
                  className="px-2 py-1 bg-red-700 text-white"
                  onClick={() => handleDelete(event.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
