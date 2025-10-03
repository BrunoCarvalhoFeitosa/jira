import { redirect } from "next/navigation"
import { getCurrent } from "@/features/auth/queries"
import { getWorkspaceInfo } from "@/features/workspaces/queries"
import { JoinWorkspaceForm } from "@/components/application/workspaces/join-workspace-form"

interface WorkspaceIdJoinPageProps {
  params: {
    workspaceId: string
    inviteCode: string
  }
}

const WorkspaceIdJoinPage = async ({ params }: WorkspaceIdJoinPageProps) => {
  const user = await getCurrent()

  if (!user) {
    redirect("/sign-in")
  }

  const initialValues = await getWorkspaceInfo({
    workspaceId: params.workspaceId
  })

  if (!initialValues) {
    redirect("/application")
  }

  return (
    <div className="w-full">
      <JoinWorkspaceForm initialValues={initialValues} />
    </div>
  )
}

export default WorkspaceIdJoinPage
