"use client"
import React from "react"
import Image from "next/image"
import { DraggableCardBody, DraggableCardContainer } from "@/components/ui/draggable-card"

export const CardsSection = () => {
  const items = [
    {
      title: "Defina responsabilidades",
      image: "/images/root/cards/card-image-01.jpg",
      className: "absolute top-10 left-[5%] rotate-[-5deg]",
    },
    {
      title: "Crie sprints",
      image: "/images/root/cards/card-image-02.jpg",
      className: "absolute top-40 left-[13%] 2xl:left-[20%] rotate-[-7deg]",
    },
    {
      title: "Trace metas",
      image: "/images/root/cards/card-image-03.jpg",
      className: "absolute top-20 left-[22%] 2xl:left-[33%] rotate-[8deg]",
    },
    {
      title: "Tenha visibilidade do time",
      image: "/images/root/cards/card-image-04.jpg",
      className: "absolute top-32 2xl:top-44 left-[40%] 2xl:left-[47%] rotate-[10deg]",
    },
    {
      title: "Gere relatórios",
      image: "/images/root/cards/card-image-05.jpg",
      className: "absolute top-20 right-[28%] 2xl:right-[25%] rotate-[2deg]",
    },
    {
      title: "Crie campanhas",
      image: "/images/root/cards/card-image-06.jpg",
      className: "absolute top-24 left-[62%] 2xl:left-[72%] rotate-[-7deg]",
    },
    {
      title: "Defina estratégias",
      image: "/images/root/cards/card-image-07.jpg",
      className: "absolute top-8 left-[70%] 2xl:left-[80%] rotate-[4deg]",
    },
  ]

  return (
    <section className="pt-16 md:pt-20 pb-10 bg-linear-to-b from-blue-300 from-30% to-70% to-blue-600/90 dark:from-[#111] dark:to-[#2C2C2C]">
      <h3 className="mb-4 text-md md:text-3xl font-thin text-center text-white">
        Arraste os cards e veja <br />
        <span className="text-[22px] md:text-[2.65rem] lg:text-[3.6rem] xl:text-[4rem] font-bold mt-1 leading-none">
          Todas as vantagens de uso
        </span>
      </h3>
      <DraggableCardContainer className="relative min-h-[85dvh] flex md:min-h-[65dvh] lg:min-h-[48dvh] xl:min-h-screen 2xl:min-h-[78dvh] w-full items-center justify-center overflow-clip">
          <p className="absolute top-1/2 mx-auto max-w-sm -translate-y-3/4 text-center text-2xl font-bold text-black md:text-4xl">
            Organize pessoas, processos e tarefas.
          </p>
          {items.map((item) => (
            <DraggableCardBody key={item.title} className={`${item.className} cursor-grab`}>
              <Image
                src={item.image}
                alt={item.title}
                width={600}
                height={600}
                className="pointer-events-none relative z-10 h-80 w-80 object-cover"
              />
              <h3 className="mt-4 text-center text-lg font-bold text-neutral-700 dark:text-neutral-300">
                {item.title}
              </h3>
            </DraggableCardBody>
          ))}
        </DraggableCardContainer>
    </section>
  )
}
