import { useEffect, useState } from "react"
import { useAppDispatch, useAppSelector } from "../app/hooks"
import {
  clearDateFilter,
  selectDateFilter,
  setDateFilter,
} from "../features/events/eventsSlice"

export function DateFilter({ className }: { className?: string }) {
  const dateFilter = useAppSelector(selectDateFilter)
  const dispatch = useAppDispatch()
  const [start, setStart] = useState(dateFilter.start)
  const [end, setEnd] = useState(dateFilter.end)

  function handleApplyFilter() {
    dispatch(setDateFilter({ start, end }))
  }

  function handleClear() {
    dispatch(clearDateFilter())
  }

  useEffect(() => {
    setStart(dateFilter.start)
    setEnd(dateFilter.end)
  }, [dateFilter])

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
      <div className="flex gap-4">
        <button
          type="button"
          className="flex-2 px-2 py-1.5 bg-gray-500 border"
          onClick={() => handleApplyFilter()}
        >
          Apply Filter
        </button>
        <button
          type="button"
          className="flex-1 px-2 py-1.5 bg-white text-black border"
          onClick={() => handleClear()}
        >
          Clear
        </button>
      </div>
    </div>
  )
}
