"use client"
import Image from "next/image"
import { AnimatedPointerJira } from "../common/animated-pointer-jira"

interface CardProps {
  card: {
    image: string
    name: string
    phrase: string
    handle: string
  }
}

const cardsData = [
  {
    image: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=200",
    name: "Brian Martin",
    phrase: "Migramos de uma ferramenta para o Jira e que resultados amigos. Com o Jira, integramos toda a empresa e todos os processos ficaram claros para todos.",
    handle: "@brianmartin",
  },
  {
    image: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200",
    name: "Diego Correia",
    phrase: "Adotamos a metodologia ágil Scrum e o Jira foi perfeito para o propósito, pudemos ter uma visibilidade muito ampla em nosso projeto e tivemos melhoras significativas.",
    handle: "@diegocorreia",
  },
  {
    image: "https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=200&auto=format&fit=crop&q=60",
    name: "Jordan Lee",
    phrase: "Ferramenta poderosa e ao mesmo tempo muito simples de manipular, todos da equipe se adaptaram muito bem a sua utilização, os resultados são instantâneos.",
    handle: "@jordanlee",
  },
  {
    image: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=200&auto=format&fit=crop&q=60",
    name: "Avery Johnson",
    phrase: "Os relatórios que consigo gerar a partir do Jira são extraordinários, consigo acompanhar a evolução de cada colaborador e consigo traçar metas de melhora de desempenho.",
    handle: "@averyjohnson",
  },
]

const CreateCard = ({ card }: CardProps) => (
  <div className="p-4 rounded-lg mx-4 shadow hover:shadow-lg transition-all duration-200 w-72 shrink-0 bg-white">
    <div className="flex gap-2">
      <Image
        src={card.image}
        width={50}
        height={50}
        className="size-11 rounded-full grayscale-100"
        alt="Imagem de usuário"
      />
      <div className="flex flex-col">
        <div className="flex items-center gap-1">
          <p>{card.name}</p>
          <svg className="mt-0.5 fill-blue-500" width="12" height="12" viewBox="0 0 12 12" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" clipRule="evenodd" d="M4.555.72a4 4 0 0 1-.297.24c-.179.12-.38.202-.59.244a4 4 0 0 1-.38.041c-.48.039-.721.058-.922.129a1.63 1.63 0 0 0-.992.992c-.071.2-.09.441-.129.922a4 4 0 0 1-.041.38 1.6 1.6 0 0 1-.245.59 3 3 0 0 1-.239.297c-.313.368-.47.551-.56.743-.213.444-.213.96 0 1.404.09.192.247.375.56.743.125.146.187.219.24.297.12.179.202.38.244.59.018.093.026.189.041.38.039.48.058.721.129.922.163.464.528.829.992.992.2.071.441.09.922.129.191.015.287.023.38.041.21.042.411.125.59.245.078.052.151.114.297.239.368.313.551.47.743.56.444.213.96.213 1.404 0 .192-.09.375-.247.743-.56.146-.125.219-.187.297-.24.179-.12.38-.202.59-.244a4 4 0 0 1 .38-.041c.48-.039.721-.058.922-.129.464-.163.829-.528.992-.992.071-.2.09-.441.129-.922a4 4 0 0 1 .041-.38c.042-.21.125-.411.245-.59.052-.078.114-.151.239-.297.313-.368.47-.551.56-.743.213-.444.213-.96 0-1.404-.09-.192-.247-.375-.56-.743a4 4 0 0 1-.24-.297 1.6 1.6 0 0 1-.244-.59 3 3 0 0 1-.041-.38c-.039-.48-.058-.721-.129-.922a1.63 1.63 0 0 0-.992-.992c-.2-.071-.441-.09-.922-.129a4 4 0 0 1-.38-.041 1.6 1.6 0 0 1-.59-.245A3 3 0 0 1 7.445.72C7.077.407 6.894.25 6.702.16a1.63 1.63 0 0 0-1.404 0c-.192.09-.375.247-.743.56m4.07 3.998a.488.488 0 0 0-.691-.69l-2.91 2.91-.958-.957a.488.488 0 0 0-.69.69l1.302 1.302c.19.191.5.191.69 0z" />
          </svg>
        </div>
        <span className="text-xs text-slate-500">{card.handle}</span>
      </div>
    </div>
    <p className="text-sm py-4 text-gray-800">
      {card.phrase}
    </p>
  </div>
)

export const TestimonialSection = () => {
  return (
    <section className="w-full flex flex-col items-end">
      <div className="pt-20 px-5 md:px-12 pb-28 w-full max-w-7xl 2xl:max-w-[95%] bg-blue-100 dark:bg-[#111] lg:rounded-tl-[320px] xl:rounded-tl-[600px]">
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
      </div>
      <div className="py-20 w-full bg-blue-200 dark:bg-[#1C1C1C]">
        <div className="marquee-row w-full mx-auto max-w-5xl overflow-hidden relative">
          <div className="absolute left-0 top-0 h-full w-20 z-10 pointer-events-none bg-gradient-to-r from-blue-200 dark:from-[#1C1C1C] to-transparent" />
          <div className="marquee-inner flex transform-gpu min-w-[200%] pt-10 pb-5">
            {[...cardsData, ...cardsData].map((card, index) => (
                <CreateCard key={index} card={card} />
            ))}
          </div>
          <div className="absolute right-0 top-0 h-full w-20 md:w-40 z-10 pointer-events-none bg-gradient-to-l from-blue-200 dark:from-[#1C1C1C] to-transparent" />
        </div>
        <div className="marquee-row w-full mx-auto max-w-5xl overflow-hidden relative">
          <div className="absolute left-0 top-0 h-full w-20 z-10 pointer-events-none bg-gradient-to-r from-blue-200 dark:from-[#1C1C1C] to-transparent" />
          <div className="marquee-inner marquee-reverse flex transform-gpu min-w-[200%] pt-10 pb-5">
            {[...cardsData, ...cardsData].map((card, index) => (
                <CreateCard key={index} card={card} />
            ))}
          </div>
          <div className="absolute right-0 top-0 h-full w-20 md:w-40 z-10 pointer-events-none bg-gradient-to-l from-blue-200 dark:from-[#1C1C1C] to-transparent" />
        </div>
      </div>
    </section>
  )
}
