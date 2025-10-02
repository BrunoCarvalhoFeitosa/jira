import { redirect } from "next/navigation"
import { getCurrent } from "@/features/auth/queries"
import { SignUpCard } from "@/components/auth/sign-up-card"

const SignUpPage = async () => {
  const user = await getCurrent()
  
  if (user) {
    redirect("/application")
  }

  return (
    <div className="lg:min-h-[296px]">
      <SignUpCard />
    </div>
  )
}

export default SignUpPage
