import { RiLoader4Fill } from "react-icons/ri"

const ApplicationLoading = () => {
  return (
    <div className="w-full h-[100dvh] flex justify-center items-center">
      <RiLoader4Fill className="size-7 text-muted-foreground animate-spin" />
    </div>
  )
}

export default ApplicationLoading
