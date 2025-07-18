import { faker } from "@faker-js/faker"
import { useState } from "react"
import { v4 as uuidv4 } from "uuid"
import { useAppDispatch } from "../app/hooks"
import { add, Event } from "../features/events/eventsSlice"

export function EventForm() {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10))
  const dispatch = useAppDispatch()

  async function submit(formData: FormData) {
    const eventData = {
      id: uuidv4(),
      ...Object.fromEntries(formData.entries()),
    } as unknown as Event

    dispatch(add(eventData))
  }

  function autofill() {
    setTitle(faker.lorem.sentence({ min: 3, max: 5 }))
    setDescription(faker.lorem.paragraph())
    setDate(faker.date.soon().toISOString().slice(0, 10))
  }

  return (
    <div>
      <form action={submit} id="add-event" className="flex flex-col gap-4">
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
          ></input>
        </div>
        <div>
          <button type="submit">Save</button>
        </div>
        <div>
          <button
            type="button"
            className="bg-white text-black"
            onClick={() => autofill()}
          >
            Auto-fill
          </button>
        </div>
      </form>
    </div>
  )
}
