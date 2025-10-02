import { redirect } from "next/navigation"
import { getCurrent } from "@/features/auth/queries"
import { TaskViewSwitcher } from "@/components/application/tasks/task-view-switcher"

const TasksPage = async () => {
  const user = getCurrent()

  if (!user) {
    redirect("/sign-in")
  }
  
  return (
    <div className="h-full flex flex-col">
      <TaskViewSwitcher />
    </div>
  )
}

export default TasksPage
