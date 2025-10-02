"use client"
import React, { useState } from "react"
import dynamic from "next/dynamic"
import { useUpdateTask } from "@/features/tasks/api/use-update-task"
import { Button } from "@/components/ui/button"
import { Task } from "@/features/tasks/types"
import "react-quill-new/dist/quill.snow.css"

const ReactQuill = dynamic(
 () => import("react-quill-new"), { ssr: false }
)

interface TaskRichTextProps {
  task: Task
  initialValue?: string
  setEdit: (edit: boolean) => void
  onChange?: (value: string) => void
}

export const TaskRichText = ({ task, initialValue = "", setEdit, onChange }: TaskRichTextProps) => {
  const [value, setValue] = useState<string>(initialValue)
  const { mutate: editTask, isPending: isUpdatingTask } = useUpdateTask()

  const handleChange = (content: string) => {
    setValue(content)
    onChange?.(content)
  }

  const handleSaveDescription = () => {
    editTask({
      json: { description: value },
      param: { taskId: task.$id }
    }, {
      onSuccess: () => {
        setEdit(false)
      }
    })
  }

  return (
    <div className="w-full rich-text-container">
      <ReactQuill
        value={value}
        onChange={handleChange}
        theme="snow"
        className="bg-white text-base"
        modules={{
          toolbar: [
            [{ header: [1, 2, 3, false] }],
            ["bold", "italic", "underline", "strike"],
            [{ list: "ordered" }, { list: "bullet" }],
            ["link", "image"],
            ["clean"],
          ],
        }}
        formats={[
          "header",
          "bold", "italic", "underline", "strike",
          "list", "bullet",
          "link", "image"
        ]}
      />
      <div className="mt-3 flex justify-end">
        <Button
          disabled={isUpdatingTask}
          className="md:w-52 h-10 text-base bg-blue-600 hover:bg-blue-700 transition cursor-pointer"
          onClick={handleSaveDescription}
        >
          Salvar descrição
        </Button>
      </div>
    </div>
  )
}
