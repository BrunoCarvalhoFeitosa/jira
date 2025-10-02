"use client"
import { useCreateProjectModal } from "@/features/projects/hooks/use-create-project-modal"
import { ResponsiveModal } from "../../common/responsive-modal"
import { CreateProjectForm } from "../create-project-form"

export const CreateProjectModal = () => {
  const { isOpen, setIsOpen, close } = useCreateProjectModal()

  return (
    <ResponsiveModal open={isOpen} onOpenChange={setIsOpen}>
      <CreateProjectForm onCancel={close} />
    </ResponsiveModal>
  )
}
