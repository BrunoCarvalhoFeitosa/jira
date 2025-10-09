"use client"
import Image from "next/image"
import { AnimatedPointerJira } from "../common/animated-pointer-jira"

export const TestimonialSection = () => {
  return (
    <section className="pt-10 px-5 md:px-12 pb-28 w-full max-w-7xl 2xl:max-w-[95%] mx-auto">
      <div className="w-full flex justify-end">
        <h3 className="mb-4 text-2xl md:text-4xl xl:text-6xl font-thin text-black dark:text-white max-w-5xl text-end">
          Veja os relatos positivos e <br />
          <span className="text-[22px] md:text-[2.65rem] lg:text-[3.6rem] xl:text-[4rem] font-bold mt-1 leading-none">
            Comprove que o <AnimatedPointerJira /> é eficiente
          </span>
        </h3>
      </div>
      <div className="w-full flex justify-end">
        <div className="mt-6 lg:max-w-[980px] 2xl:max-w-[1480px] flex flex-col lg:flex-row items-center gap-5">
          <div className="flex flex-1 flex-col gap-y-5">
            <p>
              Desde que começamos a usar o Jira na nossa equipe, a organização e o acompanhamento das tarefas melhoraram significativamente. A interface é intuitiva e as funcionalidades se adaptam bem às nossas necessidades. A visualização em kanban nos ajuda a entender rapidamente o andamento dos projetos.
            </p>
            <p>
              O que mais me impressiona no Jira é a flexibilidade para personalizar workflows e campos de acordo com cada projeto. Isso nos permite manter processos claros e consistentes, mesmo com diferentes equipes envolvidas. Além disso, as integrações com outras ferramentas, como Confluence e Slack, tornam tudo ainda mais eficiente.
            </p>
            <p>
              Recomendo fortemente o Jira para qualquer equipe que queira melhorar sua produtividade e comunicação. A curva de aprendizado é rápida, e o suporte da Atlassian é sempre muito eficiente. Hoje, não consigo imaginar nossa operação sem ele. É mais do que um gerenciador de tarefas — é uma plataforma de gestão robusta.
            </p>
            <div>
              <p className="m-0 text-lg font-semibold">
                Graziela Carvalho
              </p>
              <p className="text-muted-foreground">
                Scrum Master & Agilista
              </p>
            </div>
          </div>
          <div className="w-full flex flex-1 justify-end">
            <Image
              src="/images/root/testimonial/testimonial-image.jpg"
              width={500}
              height={300}
              alt="Imagem do testimonial"
              className="w-full h-[570px] object-cover object-center"
            />
          </div>
        </div>
      </div>
    </section>
  )
}