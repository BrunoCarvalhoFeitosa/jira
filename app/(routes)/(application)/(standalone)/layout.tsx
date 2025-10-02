interface StandaloneLayoutProps {
  children: React.ReactNode
}

const StandaloneLayout = ({ children }: StandaloneLayoutProps) => {
  return (
    <main className="min-h-screen">
      <div className="mx-auto w-full">
        <div className="w-full flex flex-col justify-center items-center">
          {children}
        </div>
      </div>
    </main>
  )
}

export default StandaloneLayout
