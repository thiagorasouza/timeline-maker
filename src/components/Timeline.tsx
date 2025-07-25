import { useAppSelector } from "../app/hooks"
import { selectFilteredEvents } from "../features/events/eventsSlice"
import { formatDateForDisplay } from "../utils/helpers"

export function Timeline({ className }: { className: string }) {
  const events = useAppSelector(selectFilteredEvents)

  return (
    <div className={`relative ${className}`}>
      <div className="flex flex-col gap-12 py-10">
        {events.map(event => (
          <div key={event.id} className="ml-6 flex gap-4 z-20">
            <div className="shrink-0 size-12 rounded-full border bg-white"></div>
            <div className="space-y-1">
              <p className="text-xs text-gray-800 font-medium">
                {formatDateForDisplay(event.date)}
              </p>
              <h3 className="font-semibold leading-tight">{event.title}</h3>
              <p>{event.description}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="absolute top-4 bottom-4 bg-yellow-200 left-12 border-r z-10"></div>
    </div>
  )
}
