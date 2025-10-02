import { redirect } from "next/navigation"
import { getCurrent } from "@/features/auth/queries"
import { MembersList } from "@/components/application/workspaces/members-list"

const WorkspaceIdMembersPage = async () => {
  const user = await getCurrent()

  if (!user) {
    redirect("/sign-in")
  }
  
  return (
    <div className="w-full">
      <MembersList />
    </div>
  )
}

export default WorkspaceIdMembersPage
