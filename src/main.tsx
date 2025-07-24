import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import { Provider } from "react-redux"
import "./index.css"
import { store } from "./app/store"
import { App } from "./App"
import { Event } from "./features/events/eventsSlice"

const initialEvents: Event[] = [
  {
    id: "a1b2c3d4-e5f6-7890-1234-567890abcdef",
    title: "Lançamento da Nova Linha de Produtos 'Aurora'",
    description:
      "Apresentação oficial da coleção 'Aurora', focada em sustentabilidade e design inovador.",
    date: "2025-08-15",
  },
  {
    id: "f9e8d7c6-b5a4-3210-fedc-ba9876543210",
    title: "Reunião Semanal de Planejamento de Sprint",
    description:
      "Discussão do progresso do sprint atual, planejamento das próximas tarefas e revisão de impedimentos.",
    date: "2025-07-22",
  },
]

localStorage.setItem("events", JSON.stringify(initialEvents))

const container = document.getElementById("root")

if (container) {
  const root = createRoot(container)

  root.render(
    <StrictMode>
      <Provider store={store}>
        <App />
      </Provider>
    </StrictMode>,
  )
} else {
  throw new Error(
    "Root element with ID 'root' was not found in the document. Ensure there is a corresponding HTML element with the ID 'root' in your HTML file.",
  )
}
