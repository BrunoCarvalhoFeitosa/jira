import { useMedia } from "react-use"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Drawer, DrawerContent } from "@/components/ui/drawer"

interface ResponsiveModalProps {
  children: React.ReactNode
  open: boolean
  onOpenChange: (open: boolean) => void
}

export const ResponsiveModal = ({ children, open, onOpenChange }: ResponsiveModalProps) => {
  const isDesktop = useMedia("(min-width: 1024px", true)

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="p-7 w-full sm:max-w-lg lg:max-w-3xl lg:min-h-[38dvh] max-h-[88dvh] border-none rounded-none overflow-y-auto hide-scrollbar">
          {children}
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerContent className="overflow-y-auto hide-scrollbar dark:bg-transparent">
        <div>
          {children}
        </div>
      </DrawerContent>
    </Drawer>
  )
}
