import { JSX, useState } from "react"
import { Button } from "@/components/ui/button"
import { ResponsiveModal } from "@/components/application/common/responsive-modal"
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card"

export const useConfirm = (
  title: string,
  message: string
): [() => JSX.Element, () => Promise<unknown>] => {
  const [promise, setPromise] = useState<{ resolve: (value: boolean) => void } | null>(null)

  const confirm = () => {
    return new Promise((resolve) => {
      setPromise({ resolve })
    })
  }

  const handleClose = () => {
    setPromise(null)
  }

  const handleConfirm = () => {
    promise?.resolve(true)
    handleClose()
  }

  const handleCancel = () => {
    promise?.resolve(false)
    handleClose()
  }

  const ConfirmationDialog = () => (
    <ResponsiveModal open={promise !== null} onOpenChange={handleClose}>
      <Card className="pb-10 lg:pb-0 w-full h-full border-none shadow-none">
        <CardHeader className="lg:p-0">
          <CardTitle className="text-lg">
            {title}
          </CardTitle>
          <CardDescription className="text-base">
            {message}
          </CardDescription>
        </CardHeader>
        <CardContent className="mt-auto lg:p-0 flex flex-col lg:flex-row justify-end gap-3">
          <Button
            type="button"
            variant="outline"
            className="w-full h-10 lg:w-28 text-base cursor-pointer"
            onClick={handleCancel}
          >
            Cancelar
          </Button>
          <Button
            type="button"
            className="w-full h-10 lg:w-44 bg-blue-600 hover:bg-blue-700 text-base cursor-pointer"
            onClick={handleConfirm}
          >
            Confirmar
          </Button>
        </CardContent>
      </Card>
    </ResponsiveModal>
  )

  return [ConfirmationDialog, confirm]
}