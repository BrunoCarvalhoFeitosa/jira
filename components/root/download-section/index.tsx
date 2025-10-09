"use client"
import React from "react"
import Link from "next/link"
import { ContainerScroll } from "@/components/ui/container-scroll-animation"
import { Header } from "../common/header"
import { Button } from "@/components/ui/button"
import { FaApple, FaAtlassian } from "react-icons/fa"
import { AiFillAndroid } from "react-icons/ai"

export const DownloadSection = () => {
  return (
    <section className="w-full flex flex-col overflow-hidden bg-blue-600 dark:bg-[#0F0F0F]">
      <ContainerScroll
        titleComponent={
          <>
            <h4 className="mb-4 text-md md:text-3xl font-thin text-white">
              Faça o download e descubra o poder da <br />
              <span className="text-[22px] md:text-[2.65rem] lg:text-[3.6rem] xl:text-[4rem] font-bold mt-1 leading-none">
                Melhor ferramenta de gestão
              </span>
            </h4>
          </>
        }
      >
        <Header className="sticky" />
        <div className="p-5">
          <div className="md:my-14">
            <h3 className="text-2xl md:text-4xl font-bold leading-none text-[#3C3B37] dark:text-white">
              Organize toda uma equipe
            </h3>
            <p className="mt-2">
              Com o Jira você integra diferentes equipes multidiciplinares, consegue traçar metas e objetivos
              de maneira fácil e dinâmica, além de ter o controle sobre as tarefas e o dia-a-dia de cada colaborar.
              Gere gráficos para avaliar sua equipe, saiba quem esta se destacando em cada sprint, gere valor ao seu projeto e cliente.
            </p>
          </div>
          <div className="mb-6 hidden md:flex items-center gap-4">
            <div className="w-14 h-14 flex justify-center items-center bg-blue-600 rounded-lg">
              <FaAtlassian className="text-white w-6 h-6" />
            </div>
              <div className="flex flex-col items-center gap-y-1">
                <span className="text-sm font-bold leading-none">
                  4,7
                </span>
                <span className="text-sm leading-none">
                  461 mil avaliações
                </span>
              </div>
              <div className="w-[1px] h-6 bg-gray-300" />
              <div className="flex flex-col items-center gap-y-1">
                <span className="text-sm font-bold leading-none">
                  10 mi+
                </span>
                <span className="text-sm leading-none">
                  Downloads
                </span>
              </div>
              <div className="w-[1px] h-6 bg-gray-300" />
              <div className="flex flex-col items-center gap-y-1">
                <span className="flex justify-center items-center w-5 h-5 bg-emerald-600 rounded-sm text-sm font-bold">
                  L
                </span>
                <span className="text-sm leading-none">
                  Classificação livre
                </span>
              </div>
          </div>
          <div className="mt-2 md:mt-0 flex flex-col md:flex-row items-center gap-1 md:gap-4 w-full">
            <Link
              href="https://play.google.com/store/apps/details?id=com.atlassian.android.jira.core&hl=pt_BR"
              className="flex-1 w-full md:w-fit md:flex-none"
            >
              <Button
                type="button"
                size="lg"
                variant="outline"
                className="flex justify-center gap-x-2 md:w-[250px] h-14 bg-gray-50 hover:bg-black hover:text-white rounded-md cursor-pointer"
              >
                <AiFillAndroid className="w-5 h-5" />
                Download Android
              </Button>
            </Link>
            <Link
              href="https://apps.apple.com/br/app/jira-cloud-by-atlassian/id1006972087"
              className="flex-1 w-full md:w-fit md:flex-none"
            >
              <Button
                type="button"
                size="lg"
                variant="outline"
                className="flex justify-center gap-x-2 md:w-[250px] h-14 bg-gray-50 hover:bg-black hover:text-white rounded-md cursor-pointer"
              >
                <FaApple className="w-5 h-5" />
                Download iOS
              </Button>
            </Link>
          </div>
      </div>
      </ContainerScroll>
    </section>
  )
}
