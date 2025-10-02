"use client"
import React, { useEffect, useRef, useState } from "react"
import { useScroll, useTransform, motion } from "motion/react"
import { PointerHighlight } from "./pointer-highlight"

interface TimelineEntry {
  title: string
  content: React.ReactNode
}

export const Timeline = ({ data }: { data: TimelineEntry[] }) => {
  const ref = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const [height, setHeight] = useState(0)

  useEffect(() => {
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect()
      setHeight(rect.height)
    }
  }, [ref])

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 10%", "end 50%"]
  })

  const heightTransform = useTransform(scrollYProgress, [0, 1], [0, height])
  const opacityTransform = useTransform(scrollYProgress, [0, 0.1], [0, 1])

  return (
    <div
      className="w-full bg-white dark:bg-neutral-950 font-sans md:px-10"
      ref={containerRef}
    >
      <div className="max-w-7xl mx-auto pt-20 px-4 md:px-8 lg:px-10">
        <h2 className="text-2xl md:text-4xl xl:text-6xl font-bold mb-4 text-black dark:text-white max-w-5xl">
          Entenda o poder
        </h2>
        <h2 className="text-2xl md:text-4xl xl:text-6xl font-thin mb-4 text-black dark:text-white max-w-5xl">
          e o controle que o
          <PointerHighlight
            rectangleClassName="bg-neutral-300/40 dark:bg-neutral-700 border-none dark:border-neutral-600 leading-loose"
            pointerClassName="text-yellow-500 h-5 w-5"
            containerClassName=" inline-block ml-3"
          >
            <span className="relative text-blue-700 z-10">Jira</span>
            <svg
              width="100%"
              height="30"
              viewBox="0 0 306 42"
              xmlns="http://www.w3.org/2000/svg"
              className="absolute -bottom-5 md:-bottom-4 lg:-bottom-3 right-0 z-10"
            >
              <path
                d="M0.314542 22.3672C52.9464 14.9125 91.8245 33.6666 144.966 18.1254C147.46 24.7349 153.892 33.0058 163.497 33.1094C155.486 32.9725 142.641 15.7178 155.536 27.2686C163.119 36.0683 196.172 25.2364 170.842 32.944C188.334 31.2885 204.356 20.5339 216.163 10.9702C235.811 -2.65832 220.928 23.6737 235.178 36.8756C255.37 55.2242 316.463 7.29572 304.134 7.28816C296.296 13.2947 285.769 17.046 281.423 23.6985C204.757 63.1757 259.992 -9.72674 214.311 2.55426C139.744 53.2533 177.393 7.4163 133.572 10.6223C108.06 28.9946 -0.613806 0.46356 0.29434 22.3672L0.314542 22.3672Z"
                fill="#FFA900"
              />
            </svg>
          </PointerHighlight> proporciona
        </h2>
      </div>
      <div ref={ref} className="relative max-w-7xl mx-auto pb-20">
        {data.map((item, index) => (
          <div
            key={index}
            className="flex justify-start pt-10 md:pt-20 md:gap-10"
          >
            <div className="sticky flex flex-col md:flex-row z-40 items-center top-40 self-start max-w-xs lg:max-w-sm md:w-full">
              <div className="h-10 absolute left-3 md:left-3 w-10 rounded-full bg-white dark:bg-black flex items-center justify-center">
                <div className="h-4 w-4 rounded-full bg-neutral-200 dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 p-2" />
              </div>
              <h3 className="hidden md:block text-xl md:pl-20 md:text-4xl font-bold text-neutral-500 dark:text-neutral-500 ">
                {item.title}
              </h3>
            </div>

            <div className="relative pl-20 pr-4 md:pl-4 w-full">
              <h3 className="md:hidden block text-2xl mb-4 text-left font-bold text-neutral-500 dark:text-neutral-500">
                {item.title}
              </h3>
              {item.content}{" "}
            </div>
          </div>
        ))}
        <div
          style={{
            height: height + "px",
          }}
          className="absolute md:left-8 left-8 top-0 overflow-hidden w-[2px] bg-[linear-gradient(to_bottom,var(--tw-gradient-stops))] from-transparent from-[0%] via-neutral-200 dark:via-neutral-700 to-transparent to-[99%]  [mask-image:linear-gradient(to_bottom,transparent_0%,black_10%,black_90%,transparent_100%)] "
        >
          <motion.div
            style={{
              height: heightTransform,
              opacity: opacityTransform,
            }}
            className="absolute inset-x-0 top-0  w-[2px] bg-gradient-to-t from-purple-500 via-blue-500 to-transparent from-[0%] via-[10%] rounded-full"
          />
        </div>
      </div>
    </div>
  )
}
