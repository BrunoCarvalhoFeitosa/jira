import { Header } from "@/components/root/common/header"

interface AuthLayoutProps {
  children: React.ReactNode
}

const AuthLayout = ({ children }: AuthLayoutProps) => {
  return (
    <div className="bg-white dark:bg-[#000]">
      <Header className="fixed" />
      <main className="flex flex-col justify-center items-center w-full h-screen">
        <div className="pb-24 w-full h-[80vh] flex justify-center items-end md:items-center lg:items-end bg-blue-600 dark:bg-[#111] bg-clip-path">
          {children}
        </div>
      </main>
    </div>
  )
}

export default AuthLayout
