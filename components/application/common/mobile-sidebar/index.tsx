"use client"
import { useEffect, useState } from "react"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet"
import { Sidebar } from "../sidebar"
import { CgMenuLeft } from "react-icons/cg"

export const MobileSidebar = () => {
  const [isOpen, setisOpen] = useState<boolean>(false)
  const pathname = usePathname()

  useEffect(() => {
    setisOpen(false)
  }, [pathname])

  return (
    <Sheet modal={false} open={isOpen} onOpenChange={setisOpen}>
      <SheetTrigger asChild>
        <Button
          variant="secondary"
          className="lg:hidden cursor-pointer"
        >
          <CgMenuLeft className="w-5 h-5" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="p-0">
        <Sidebar />
      </SheetContent>
    </Sheet>
  )
}