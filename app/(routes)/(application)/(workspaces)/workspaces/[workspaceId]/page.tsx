import { redirect } from "next/navigation"
import { getCurrent } from "@/features/auth/queries"
import { WorkspaceIdClient } from "./client"

const WorkspaceIdPage = async () => {
  const user = await getCurrent()

  if (!user) {
    redirect("/sign-in")
  }

  return (
    <div className="w-full">
      <WorkspaceIdClient />
    </div>
  )
}

export default WorkspaceIdPage
