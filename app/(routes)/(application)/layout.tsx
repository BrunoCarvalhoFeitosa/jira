import { FilterProvider } from "@/contexts/filter-context"
import { Navbar } from "@/components/application/common/navbar"
import { Sidebar } from "@/components/application/common/sidebar"
import { CreateProjectModal } from "@/components/application/projects/create-project-modal"
import { CreateTaskModal } from "@/components/application/tasks/create-task-modal"
import { EditTaskModal } from "@/components/application/tasks/edit-task-modal"
import { CreateWorkspaceModal } from "@/components/application/workspaces/create-workspace-modal"

interface ApplicationLayoutProps {
  children: React.ReactNode
}

const ApplicationLayout = ({ children }: ApplicationLayoutProps) => {
  return (
    <FilterProvider>
      <div className="min-h-screen">
        <CreateWorkspaceModal />
        <CreateProjectModal />
        <CreateTaskModal />
        <EditTaskModal />
        <div className="flex w-full h-full">
          <div className="fixed top-0 left-0 hidden lg:block lg:w-[264px] h-full overflow-y-auto [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:bg-neutral-200 [&::-webkit-scrollbar-thumb]:rounded-full">
            <Sidebar />
          </div>
          <div className="lg:pl-[264px] w-full">
            <div className="mx-auto w-full h-full">
              <Navbar />
              <main className="py-8 px-4 lg:px-10 flex flex-col h-full">
                {children}
              </main>
            </div>
          </div>
        </div>
      </div>
    </FilterProvider>
  )
}

export default ApplicationLayout
