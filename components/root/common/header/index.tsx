"use client"
import Link from "next/link"
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger, navigationMenuTriggerStyle } from "@/components/ui/navigation-menu"
import { FaAtlassian } from "react-icons/fa"
import { SiJira } from "react-icons/si"
import { cn } from "@/lib/utils"

interface HeaderProps {
  className: string
}

const ListItem = ({
  title,
  children,
  href,
  ...props
}: React.ComponentPropsWithoutRef<"li"> & { href: string }) => {
  return (
    <li {...props}>
      <NavigationMenuLink asChild>
        <Link href={href}>
          <div className="text-sm leading-none font-medium">{title}</div>
          <p className="text-muted-foreground line-clamp-2 text-sm leading-snug">
            {children}
          </p>
        </Link>
      </NavigationMenuLink>
    </li>
  )
}

export const Header = ({ className }: HeaderProps) => {
  return (
    <header className={cn(className, "top-0 w-full bg-white dark:bg-black z-50")}>
      <div className="flex items-center justify-between">
        <div className="h-full flex items-center gap-3 flex-1">
          <div className="w-20 h-16 md:w-24 md:h-20 bg-blue-700">
            <Link
              href="/"
              className="flex justify-center items-center w-full h-full"
            >
              <FaAtlassian className="text-white w-7 h-7 md:w-10 md:h-10" />
            </Link>
          </div>
          <div>
            <NavigationMenu viewport={false}>
              <NavigationMenuList>
                <NavigationMenuItem className="hidden md:block">
                  <NavigationMenuTrigger className="text-base">
                    Jira
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid gap-2 md:w-[400px] lg:w-[550px] lg:grid-cols-[.75fr_1fr]">
                      <li className="row-span-3">
                        <NavigationMenuLink asChild>
                          <Link
                            className="from-gray-200 to-muted flex h-full w-full flex-col justify-end bg-linear-to-b p-6 no-underline outline-hidden select-none focus:shadow-md"
                            href="/"
                          >
                            <div className="flex items-center gap-1 mb-4">
                              <div className="flex justify-center items-center w-8 h-8 bg-blue-600 rounded-md">
                                <SiJira className="text-white" />
                              </div>
                              <div className="text-lg font-medium">
                                Jira
                              </div>
                            </div>
                            <p className="text-muted-foreground text-sm leading-tight">
                              Plataforma de gerenciamento de projetos, focada  em equipes de desenvolvimento de software.
                            </p>
                          </Link>
                        </NavigationMenuLink>
                      </li>
                      <ListItem href="/" title="Introdução">
                        Gerencie sua equipe e as tarefas do dia-a-dia de cada colaborador.
                      </ListItem>
                      <ListItem href="/" title="Proposta">
                        Agilizar os processos e centralizar os afazeres da equipe com eficiência.
                      </ListItem>
                      <ListItem href="/" title="Integração">
                        Integre diferentes equipes para um mesmo projeto e para um mesmo propósito.
                      </ListItem>
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
                <NavigationMenuItem className="hidden md:block">
                  <NavigationMenuTrigger className="text-base">
                    Institucional
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid gap-4 w-[400px] md:w-[450px]">
                      <li>
                        <NavigationMenuLink asChild>
                          <Link href="#">
                            <div className="font-medium">
                              Política de privacidade
                            </div>
                            <div className="text-muted-foreground">
                              Entenda mais sobre política de privacidade.
                            </div>
                          </Link>
                        </NavigationMenuLink>
                        <NavigationMenuLink asChild>
                          <Link href="#">
                            <div className="font-medium">
                              Política de cookies
                            </div>
                            <div className="text-muted-foreground">
                              Entenda mais sobre política de cookies
                            </div>
                          </Link>
                        </NavigationMenuLink>
                        <NavigationMenuLink asChild>
                          <Link href="#">
                            <div className="font-medium">
                              Trabalhe conosco
                            </div>
                            <div className="text-muted-foreground">
                              Candidate-se a uma vaga agora mesmao na Atlasian.
                            </div>
                          </Link>
                        </NavigationMenuLink>
                        <NavigationMenuLink asChild>
                          <Link href="#">
                            <div className="font-medium">
                              Blog
                            </div>
                            <div className="text-muted-foreground">
                              Acesse o nosso blog agora mesmo.
                            </div>
                          </Link>
                        </NavigationMenuLink>
                      </li>
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                    <Link href="/sign-in">
                      Entre
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                    <Link href="/sign-up">
                      Cadastre-se
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </div>
        </div>
      </div>
    </header>
  )
}
