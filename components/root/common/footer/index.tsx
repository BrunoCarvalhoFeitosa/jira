"use client"
import Link from "next/link"
import { FaAtlassian } from "react-icons/fa"

export const Footer = () => {
  return (
    <footer className="w-full pt-4 bg-white dark:bg-black">
      <div className="flex flex-wrap justify-center lg:justify-between overflow-hidden gap-10 md:gap-20 py-32 px-6 md:px-16 lg:px-24 xl:px-24 text-white/75 bg-blue-700 bg-clip-path">
        <div className="flex flex-col lg:flex-row lg:flex-wrap items-start gap-10 md:gap-[60px] xl:gap-[140px]">
          <div className="flex justify-center lg:justify-start items-center lg:items-baseline flex-col lg:flex-1">
            <div className="w-20 h-16 md:w-20 md:h-16 bg-blue-900">
              <Link
                href="https://www.atlassian.com/br"
                className="flex justify-center items-center w-full h-full"
                target="_blank"
              >
                <FaAtlassian className="text-white w-5 h-5 md:w-8 md:h-8" />
              </Link>
            </div>
            <p className="mt-3 text-center lg:text-left">
              Especialista em desenvolimento de software para gestão empresarial.
            </p>
            <p className="mt-3 text-center lg:text-left">
              Copyright © 2025 Atlassian.
            </p>
          </div>
          <div className="mt-6 md:mt-0 w-full lg:w-auto flex justify-center items-center flex-col text-center md:text-base">
            <h5 className="text-slate-100 font-semibold">
              Produtos
            </h5>
            <ul className="mt-2 space-y-2">
              <li className="relative">
                <Link href="" className="link-underline">
                  Jira
                </Link>
              </li>
              <li className="relative">
                <Link href="" className="link-underline">
                  Confluence
                </Link>
              </li>
              <li className="relative">
                <Link href="" className="link-underline">
                  Loom
                </Link>
              </li>
              <li className="relative">
                <Link href="" className="link-underline">
                  Trello
                </Link>
              </li>
              <li className="relative">
                <Link href="" className="link-underline">
                  Bitbucket
                </Link>
              </li>
            </ul>
          </div>
          <div className="w-full lg:w-auto flex justify-center items-center flex-col text-center md:text-base">
            <p className="text-slate-100 font-semibold">
              Institucional
            </p>
            <ul className="mt-2 space-y-2">
              <li className="relative">
                <Link href="" className="link-underline">
                  Política de privacidade
                </Link>
              </li>
              <li className="relative">
                <Link href="" className="link-underline">
                  Política de cookies
                </Link>
              </li>
              <li className="relative">
                <Link href="" className="link-underline">
                  Aviso legal
                </Link>
              </li>
              <li className="relative">
                <Link href="" className="link-underline">
                  Termos
                </Link>
              </li>
              <li className="relative">
                <Link href="" className="link-underline">
                  Quem somos
                </Link>
              </li>
            </ul>
          </div>
          <div className="w-full lg:w-auto flex justify-center items-center flex-col text-center md:text-base">
            <p className="text-slate-100 font-semibold">
              Recursos
            </p>
            <ul className="mt-2 space-y-2">
              <li className="relative">
                <Link href="" className="link-underline">
                  Suporte técnico
                </Link>
              </li>
              <li className="relative">
                <Link href="" className="link-underline">
                  Compras e licenciamento
                </Link>
              </li>
              <li className="relative">
                <Link href="" className="link-underline">
                  Comunidade da Atlassian
                </Link>
              </li>
              <li className="relative">
                <Link href="" className="link-underline">
                  Marketplace
                </Link>
              </li>
              <li className="relative">
                <Link href="" className="link-underline">
                  Minha conta
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="mt-10 flex items-center">
        <div className="flex-1 h-[6px] bg-blue-400" />
        <div className="flex-1 h-[6px] bg-blue-600" />
        <div className="flex-1 h-[6px] bg-blue-800" />
        <div className="flex-1 h-[6px] bg-blue-950" />
      </div>
    </footer>
  )
}