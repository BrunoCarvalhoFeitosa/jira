import React from "react"
import { Timeline } from "@/components/ui/timeline"

export const AdvantagesSection = () => {
  const data = [
    {
      title: "Gestão de tarefas e problemas",
      content: (
        <div>
          <p className="mb-3 font-normal text-neutral-800 dark:text-neutral-200">
            O Jira é projetado para permitir a criação, acompanhamento e resolução de tarefas e problemas dentro de um projeto. Os usuários podem criar &quot;issues&quot; (tarefas ou problemas) e atribuí-las a membros da equipe. Isso facilita o controle do progresso e o gerenciamento de prioridades.
          </p>
          <p className="font-normal text-neutral-800 dark:text-neutral-200">
            O Jira possibilita que você defina tarefas, erros, melhorias ou histórias de usuários com diferentes níveis de complexidade e prioridade. Cada issue pode ser personalizada com campos específicos, como prioridade, tipo (bug, tarefa, história), estimativa de tempo e status. Isso oferece uma visão clara e detalhada do que está acontecendo em cada parte do projeto, e permite que os gestores e membros da equipe monitorem o progresso em tempo real. Além disso, a criação de filtros e painéis personalizados permite que você visualize o que mais importa no momento.
          </p>
        </div>
      ),
    },
    {
      title: "Fluxo de trabalho personalizado",
      content: (
        <div>
          <p className="mb-3 font-normal text-neutral-800 dark:text-neutral-200">
            Um dos pontos fortes do Jira é a capacidade de customizar fluxos de trabalho de acordo com as necessidades de cada equipe ou projeto. Isso significa que cada etapa do ciclo de vida de uma tarefa pode ser definida de forma clara, como &quot;Em Progresso&quot;, &quot;Em Revisão&quot;, &quot;Concluído&quot;, entre outros.
          </p>
          <p className="font-normal text-neutral-800 dark:text-neutral-200">
            O Jira permite que você crie e modifique fluxos de trabalho de maneira intuitiva, definindo transições e condições para o avanço das tarefas de um estágio para outro. Por exemplo, você pode configurar um fluxo que só permite que uma tarefa vá para &quot;Concluído&quot; se todos os testes forem passados ou se a aprovação de um gerente for registrada. Essa flexibilidade torna o Jira ideal para equipes que seguem metodologias ágeis, como Scrum ou Kanban, mas também funciona bem em processos tradicionais de gerenciamento de projetos.
          </p>
        </div>
      ),
    },
    {
      title: "Integração com outras ferramentas",
      content: (
        <div>
          <p className="mb-3 font-normal text-neutral-800 dark:text-neutral-200">
            O Jira se integra facilmente com uma ampla gama de ferramentas de desenvolvimento e colaboração, como GitHub, Bitbucket, Slack, Confluence, entre outras. Isso facilita a centralização de informações e a troca de dados entre diferentes sistemas.
          </p>
          <p className="font-normal text-neutral-800 dark:text-neutral-200">
            A integração com ferramentas de versionamento de código (como o Git) e plataformas de comunicação (como o Slack) garante que as equipes possam manter o controle sobre o desenvolvimento de software sem precisar sair da interface do Jira. Por exemplo, é possível automatizar a criação de tarefas no Jira diretamente a partir de commits no GitHub ou Bitbucket, e até atualizar status de tarefas em tempo real com base nas interações em outras plataformas. Isso aumenta a produtividade e a transparência do processo, permitindo que todos os envolvidos no projeto tenham acesso às mesmas informações.
          </p>
        </div>
      ),
    },
    {
      title: "Relatórios e análises diversificadas",
      content: (
        <div>
          <p className="mb-3 font-normal text-neutral-800 dark:text-neutral-200">
            O Jira oferece poderosas funcionalidades de relatórios e análise, que permitem que você visualize o progresso das tarefas e identifique possíveis gargalos ou áreas de melhoria. Relatórios como gráficos de burndown, velocity e tempo de ciclo são essenciais para uma gestão eficiente de projetos.
          </p>
          <p className="font-normal text-neutral-800 dark:text-neutral-200">
            Através de dashboards personalizáveis, você pode visualizar em tempo real o status do projeto, além de gerar relatórios detalhados sobre o desempenho da equipe. O gráfico de burndown, por exemplo, é uma ferramenta muito útil para equipes ágeis, pois mostra o progresso em relação à quantidade de trabalho restante. Já a análise de tempo de ciclo ajuda a identificar o tempo médio que uma tarefa leva para ser concluída, permitindo que a equipe faça ajustes no processo para otimizar o fluxo de trabalho.
          </p>
        </div>
      ),
    },
    {
      title: "Automatização de processos internos",
      content: (
        <div>
          <p className="mb-3 font-normal text-neutral-800 dark:text-neutral-200">
            A automação de processos no Jira é uma funcionalidade extremamente útil para reduzir tarefas repetitivas e garantir que certas ações sejam tomadas automaticamente com base em condições predefinidas.
          </p>
          <p className="font-normal text-neutral-800 dark:text-neutral-200">
            O Jira oferece um conjunto robusto de regras de automação que podem ser configuradas para executar ações automaticamente. Por exemplo, você pode configurar o Jira para enviar notificações quando uma tarefa é movida para um determinado status, ou até mesmo para criar subtarefas automaticamente quando um determinado tipo de issue for criado. Isso ajuda a economizar tempo e garantir que todos os processos sigam o fluxo estabelecido sem a necessidade de intervenção manual constante.
          </p>
        </div>
      ),
    },
    {
      title: "Escalabilidade e flexibilidade do projeto",
      content: (
        <div>
          <p className="mb-3 font-normal text-neutral-800 dark:text-neutral-200">
            Jira é altamente escalável e pode ser adaptado para equipes de diferentes tamanhos, desde pequenas startups até grandes empresas. Ele oferece planos e configurações que se ajustam ao crescimento da organização, mantendo o sistema eficiente e organizado.
          </p>
          <p className="font-normal text-neutral-800 dark:text-neutral-200">
            A flexibilidade do Jira permite que ele seja utilizado de forma simples por uma equipe de 5 pessoas ou de forma complexa em uma organização global com centenas de membros. Ele oferece uma gama de configurações para personalizar a experiência do usuário, desde a criação de campos personalizados até a definição de permissões avançadas para diferentes níveis de acesso. Isso garante que, à medida que a equipe cresce ou o projeto se torna mais complexo, o Jira possa se adaptar às novas demandas sem perder a eficiência.
          </p>
        </div>
      ),
    },
    {
      title: "Colaboração e comunicação entre equipes",
      content: (
        <div>
          <p className="mb-3 font-normal text-neutral-800 dark:text-neutral-200">
            Além de suas funcionalidades de gerenciamento de tarefas, o Jira também facilita a colaboração entre membros da equipe e outros stakeholders, permitindo a comunicação clara dentro da própria plataforma.
          </p>
          <p className="font-normal text-neutral-800 dark:text-neutral-200">
            Através de comentários em tarefas, menções a membros da equipe, e integração com ferramentas de comunicação como o Slack, o Jira mantém todos os membros da equipe alinhados. Além disso, a integração com o Confluence (ou outras plataformas de documentação) permite que a documentação do projeto seja facilmente acessada diretamente dentro das tarefas no Jira, garantindo que todas as informações importantes estejam centralizadas em um único local.
          </p>
        </div>
      ),
    },
    {
      title: "Controle de permissões e segurança",
      content: (
        <div>
          <p className="mb-3 font-normal text-neutral-800 dark:text-neutral-200">
            O Jira oferece um sistema de permissões robusto que permite controlar quem pode ver ou editar determinadas tarefas, projetos ou informações dentro da plataforma.
          </p>
          <p className="font-normal text-neutral-800 dark:text-neutral-200">
            A configuração de permissões no Jira é extremamente granular. Você pode controlar o acesso de usuários a diferentes níveis, como por projeto, por tarefa ou até por campo dentro de uma tarefa. Isso é particularmente importante para equipes que lidam com informações sensíveis ou têm diferentes níveis de acesso para membros da equipe. Com isso, é possível garantir que as informações críticas estejam protegidas e acessíveis apenas para as pessoas certas.
          </p>
        </div>
      ),
    }
  ]

  return (
    <section className="relative pb-20 w-full bg-white dark:bg-[#151515] overflow-clip">
      <Timeline data={data} />
    </section>
  )
}
