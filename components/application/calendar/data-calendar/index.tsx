import { useState } from "react"
import moment from "moment"
import { addMonths, subMonths, format } from "date-fns"
import { ptBR } from "date-fns/locale"
import { Calendar, momentLocalizer } from "react-big-calendar"
import { Button } from "@/components/ui/button"
import { EventCard } from "../event-card"
import { Task } from "@/features/tasks/types"
import { CalendarIcon, ChevronLeftIcon, ChevronRightIcon } from "lucide-react"
import "moment/locale/pt-br"
import "react-big-calendar/lib/css/react-big-calendar.css"
import "./styles.css"

interface DataCalendarProps {
  data: Task[]
}

interface CustomToolbarProps {
  date: Date
  onNavigate: (action: "PREV" | "NEXT" | "TODAY") => void
}

const defaultMessages = {
  date: "Data",
  time: "Hora",
  event: "Evento",
  allDay: "Dia Todo",
  week: "Semana",
  work_week: "Eventos",
  day: "Dia",
  month: "Mês",
  previous: "Anterior",
  next: "Próximo",
  yesterday: "Ontem",
  tomorrow: "Amanhã",
  today: "Hoje",
  agenda: "Agenda",
  noEventsInRange: "Não há eventos no período.",
};

const localizer = momentLocalizer(moment)

const CustomToolbar = ({ date, onNavigate }: CustomToolbarProps) => {
  return (
    <div className="mb-4 flex justify-center lg:justify-start items-center gap-x-2 w-full lg:w-auto">
      <Button
        variant="secondary"
        size="icon"
        className="flex items-center"
        onClick={() => onNavigate("PREV")}
      >
        <ChevronLeftIcon className="size-4" />
      </Button>
      <div className="py-1 px-2 flex justify-center items-center gap-x-2 w-full lg:w-44 border rounded-md">
        <CalendarIcon className="size-4" />
        <p className="capitalize">
          {format(date, "MMMM yyyy", {locale: ptBR})}
        </p>
      </div>
      <Button
        variant="secondary"
        size="icon"
        className="flex items-center"
        onClick={() => onNavigate("NEXT")}
      >
        <ChevronRightIcon className="size-4" />
      </Button>
    </div>
  )
}

export const DataCalendar = ({ data }: DataCalendarProps) => {
  const [value, setValue] = useState(
    data.length > 0 ? new Date(data[0].dueDate) : new Date()
  )

  const events = data.map((task) => ({
    start: new Date(task.dueDate),
    end: new Date(task.dueDate),
    title: task.name,
    project: task.project,
    assignee: task.assignee,
    status: task.status,
    id: task.$id
  }))

  const handleNavigate = (action: "PREV" | "NEXT" | "TODAY") => {
    if (action === "PREV") {
      setValue(subMonths(value, 1))
    } else if (action === "NEXT") {
      setValue(addMonths(value, 1))
    } else if (action === "TODAY") {
      setValue(new Date())
    }
  }

  return (
    <Calendar
      messages={defaultMessages}
      localizer={localizer}
      date={value}
      events={events}
      views={["month"]}
      defaultView="month"
      toolbar
      showAllEvents
      className="h-full"
      startAccessor="start"
      endAccessor="end"
      max={new Date(new Date().setFullYear(new Date().getFullYear() + 1))}
      formats={{ agendaDateFormat: "DD/MM ddd", weekdayFormat: "dddd" }}
      components={{
        eventWrapper: ({ event }) => (
          <EventCard
            id={event.id}
            title={event.title}
            assignee={event.assignee}
            project={event.project}
            status={event.status}
          />
        ),
        toolbar: () => (
          <CustomToolbar
            date={value}
            onNavigate={handleNavigate}
          />
        )
      }}  
    />
  )
}
