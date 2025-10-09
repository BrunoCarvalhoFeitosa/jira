"use client"
import { AnimatedPointerJira } from "../common/animated-pointer-jira"

export const HeroSection = () => {
  return (
    <section className="w-full md:min-h-[42dvh] lg:min-h-[38dvh] xl:min-h-[75dvh] 2xl:min-h-[58dvh] bg-gray-50 dark:bg-[#010101] pt-10 pb-20 px-6 md:py-12 md:px-12 lg:py-20 lg:px-20">
      <div className="w-full h-full flex">
        <div className="flex flex-col gap-1 lg:[80%] xl:w-3/4 2xl:w-2/4">
          <h1 className="text-3xl md:text-5xl lg:text-7xl font-bold">
            Ótimos resultados
          </h1>
          <h2 className="text-3xl md:text-5xl lg:text-7xl font-thin">
            começam com o <AnimatedPointerJira />
          </h2>
          <p className="mt-6 text-md">
            A <strong>ferramenta de gerenciamento de projetos</strong> que você 
            precisa para planejar e monitorar o trabalho de todas as equipes.
            Integre projetos e pessoas em um único lugar com um único software,
            que é capaz de monitorar, gerar relatórios e insights acerca das 
            entregas que ocorrem a cada dia.
          </p>
        </div>
      </div>
    </section>
  )
}