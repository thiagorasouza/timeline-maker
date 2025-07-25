import { faker } from "@faker-js/faker"
import { useEffect, useState } from "react"
import { useAppDispatch, useAppSelector } from "../app/hooks"
import {
  Event,
  saveEvent,
  selectEventById,
  updateEvent,
} from "../features/events/eventsSlice"
import { getPresenteDateString } from "../utils/helpers"

export function EventForm({
  className,
  eventId,
  onCancelClick,
}: {
  className?: string
  eventId?: string
  onCancelClick: () => void
}) {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [date, setDate] = useState(getPresenteDateString)
  const [saveStatus, setSaveStatus] = useState<
    "idle" | "pending" | "fulfilled" | "failed"
  >("idle")
  const dispatch = useAppDispatch()
  const event = useAppSelector(state => selectEventById(state, eventId || ""))

  async function handleSubmit(formData: FormData) {
    if (saveStatus === "pending") return

    setSaveStatus("pending")
    try {
      if (eventId) {
        // Update
        const eventData = {
          id: eventId,
          ...Object.fromEntries(formData.entries()),
        } as unknown as Event

        dispatch(updateEvent(eventData))
      } else {
        // Add
        const eventData = Object.fromEntries(
          formData.entries(),
        ) as unknown as Omit<Event, "id">

        await dispatch(saveEvent(eventData)).unwrap()
      }
      setSaveStatus("fulfilled")
    } catch (error) {
      setSaveStatus("failed")
    } finally {
      setTimeout(() => setSaveStatus("idle"), 3000)
    }
  }

  function handleAutofill() {
    setTitle(faker.lorem.sentence({ min: 3, max: 5 }))
    setDescription(faker.lorem.paragraph())
    setDate(faker.date.soon().toISOString().slice(0, 10))
  }

  useEffect(() => {
    if (eventId && event) {
      setTitle(event.title)
      setDescription(event.description)
      setDate(event.date)
    } else {
      setTitle("")
      setDescription("")
      setDate(getPresenteDateString())
    }
  }, [event])

  return (
    <form
      action={handleSubmit}
      id="add-event"
      className={`flex flex-col gap-4 ${className}`}
    >
      {saveStatus !== "idle" && (
        <div>
          {saveStatus === "fulfilled" && <p>Event saved successfully!</p>}
          {saveStatus === "failed" && (
            <p>There was an error while saving your event.</p>
          )}
        </div>
      )}
      <div>
        <label htmlFor="title">Title</label>
        <input
          type="text"
          id="title"
          name="title"
          value={title}
          onChange={e => setTitle(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="description">Description</label>
        <textarea
          name="description"
          id="description"
          value={description}
          onChange={e => setDescription(e.target.value)}
        ></textarea>
      </div>
      <div>
        <label htmlFor="Date">Date</label>
        <input
          type="date"
          name="date"
          id="date"
          value={date}
          onChange={e => setDate(e.target.value)}
        />
      </div>
      <div>
        <button type="submit">{eventId ? "Update" : "Add"}</button>
      </div>
      <div>
        {eventId ? (
          <button
            type="button"
            className="bg-white! text-black! border"
            onClick={() => onCancelClick()}
          >
            Cancel
          </button>
        ) : (
          <button
            type="button"
            className="bg-white! text-black! border"
            onClick={() => handleAutofill()}
          >
            Auto-fill
          </button>
        )}
      </div>
    </form>
  )
}
