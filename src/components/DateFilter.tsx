import { useState } from "react"
import { useAppDispatch, useAppSelector } from "../app/hooks"
import { selectDateFilter, setDateFilter } from "../features/events/eventsSlice"

export function DateFilter({ className }: { className?: string }) {
  const dateFilter = useAppSelector(selectDateFilter)
  const dispatch = useAppDispatch()
  const [start, setStart] = useState(dateFilter.start)
  const [end, setEnd] = useState(dateFilter.end)

  function handleFilter() {
    console.log("Date filter", { start, end })
    dispatch(setDateFilter({ start, end }))
  }

  return (
    <div className={`${className} space-y-2`}>
      <div className="flex gap-4">
        <div className="flex-1">
          <label htmlFor="startDate">Start Date:</label>
          <input
            type="date"
            name="startDate"
            id="startDate"
            value={start}
            onChange={e => setStart(e.target.value)}
          />
        </div>
        <div className="flex-1">
          <label htmlFor="startDate">End Date:</label>
          <input
            type="date"
            name="endDate"
            id="endDate"
            value={end}
            onChange={e => setEnd(e.target.value)}
          />
        </div>
      </div>
      <div>
        <button
          type="button"
          className="px-2 py-1.5 bg-gray-500 border"
          onClick={() => handleFilter()}
        >
          Apply Filter
        </button>
      </div>
    </div>
  )
}
