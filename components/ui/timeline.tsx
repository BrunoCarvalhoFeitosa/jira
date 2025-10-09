"use client"
import React, { useEffect, useRef, useState } from "react"
import { useScroll, useTransform, motion } from "motion/react"
import { AnimatedPointerJira } from "../root/common/animated-pointer-jira"

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
      className="w-full bg-white dark:bg-neutral-950 font-sans lg:px-10"
      ref={containerRef}
    >
      <div className="max-w-7xl 2xl:max-w-[95%] mx-auto pt-20 px-4 md:px-8 lg:px-10">
        <h2 className="text-2xl md:text-4xl xl:text-6xl font-bold mb-0 text-black dark:text-white max-w-5xl">
          Entenda o poder
        </h2>
        <h2 className="text-[22px] md:text-4xl xl:text-6xl font-thin mb-4 text-black dark:text-white max-w-5xl">
          e o controle que o <AnimatedPointerJira /> proporciona
        </h2>
      </div>
      <div ref={ref} className="relative max-w-7xl 2xl:max-w-[95%] mx-auto pb-20">
        {data.map((item, index) => (
          <div
            key={index}
            className="flex justify-start pt-10 md:pt-20 lg:gap-10"
          >
            <div className="sticky flex flex-col md:flex-row z-40 items-center top-40 self-start max-w-xs lg:max-w-sm 2xl:max-w-xl md:w-full">
              <div className="h-10 absolute left-3 md:left-3 w-10 rounded-full bg-white dark:bg-black flex items-center justify-center">
                <div className="h-4 w-4 rounded-full bg-neutral-200 dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 p-2" />
              </div>
              <h3 className="hidden md:block md:pl-20 text-xl md:text-2xl lg:text-3xl font-bold dark:text-neutral-500 ">
                {item.title}
              </h3>
            </div>
            <div className="relative pl-14 pr-4 md:pl-4 w-full">
              <h3 className="md:hidden block text-xl md:text-2xl mb-4 text-left font-bold dark:text-neutral-500">
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
