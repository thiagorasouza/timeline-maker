import { useAppDispatch, useAppSelector } from "../app/hooks"
import { remove } from "../features/events/eventsSlice"

export function EventList({
  className,
  onUpdateClick,
}: {
  className?: string
  onUpdateClick: (id: string) => void
}) {
  const events = useAppSelector(state => state.events)
  const dispatch = useAppDispatch()

  async function handleRemove(id: string) {
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
              <td className="p-2 border space-y-2">
                <button
                  type="button"
                  className="px-2 py-1 bg-red-700 text-white"
                  onClick={() => handleRemove(event.id)}
                >
                  Remove
                </button>
                <button
                  type="button"
                  className="px-2 py-1"
                  onClick={() => onUpdateClick(event.id)}
                >
                  Update
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
