import { redirect } from "next/navigation"
import { getCurrent } from "@/features/auth/queries"
import { CreateWorkspaceForm } from "@/components/application/workspaces/create-workspace-form"

const WorkspaceCreatePage = async () => {
  const user = await getCurrent()  

  if (!user) {
    redirect("/sign-in")
  }

  return (
    <div className="w-full">
      <CreateWorkspaceForm />
    </div>
  )
}

export default WorkspaceCreatePage
