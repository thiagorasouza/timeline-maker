import { useAppDispatch, useAppSelector } from "../app/hooks"
import {
  deleteEvent,
  selectFilteredEvents,
} from "../features/events/eventsSlice"
import { formatDateForDisplay } from "../utils/helpers"
import { DateFilter } from "./DateFilter"

export function EventList({
  className,
  onUpdateClick,
}: {
  className?: string
  onUpdateClick: (id: string) => void
}) {
  const events = useAppSelector(selectFilteredEvents)

  const dispatch = useAppDispatch()

  async function handleRemove(id: string) {
    dispatch(deleteEvent(id))
  }

  if (events.length === 0) {
    return (
      <div className={`${className}`}>
        <DateFilter className="mb-4" />
        <p>No events yet.</p>
      </div>
    )
  }

  return (
    <div className={`${className}`}>
      <DateFilter className="mb-4" />
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
          {Array.isArray(events) &&
            events.map(event => (
              <tr key={event.id}>
                <td className="p-2 border">{event.title}</td>
                <td className="p-2 border">
                  {formatDateForDisplay(event.date)}
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
