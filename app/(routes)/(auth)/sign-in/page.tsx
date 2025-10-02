import { redirect } from "next/navigation"
import { getCurrent } from "@/features/auth/queries"
import { SignInCard } from "@/components/auth/sign-in-card"

const SignInPage = async () => {
  const user = await getCurrent()

  if (user) {
    redirect("/application")
  }

  return (
    <div className="lg:min-h-[296px]">
      <SignInCard />
    </div>
  )
}

export default SignInPage
