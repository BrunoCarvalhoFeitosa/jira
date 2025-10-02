import { createSessionClient } from "@/lib/appwrite"
import { GetMember } from "@/features/members/utils"
import { DATABASE_ID, PROJECTS_ID } from "@/config"
import { Project } from "./types"

interface projectProps {
  projectId: string
}

export const getProject = async ({ projectId }: projectProps) => {
  try {
    const { account, databases } = await createSessionClient()
  
    const user = await account.get()
    
    const project = await databases.getDocument<Project>(
      DATABASE_ID,
      PROJECTS_ID,
      projectId
    )
  
    if (!project) {
      throw new Error("Project not found.")
    }
  
    const member = await GetMember({
      databases,
      userId: user.$id,
      workspaceId: project.workspaceId
    })
  
    if (!member) {
      throw new Error("Member not found.")
    }
  
    return project
  } catch (error) {
    return null
  }
}