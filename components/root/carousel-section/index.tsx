"use client"
import Image from "next/image"
import Autoplay from "embla-carousel-autoplay"
import { Card, CardContent } from "@/components/ui/card"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"

export const CarouselSection = () => {
  return (
    <section className="relative w-full bg-blue-700 dark:bg-[#111] py-6 md:py-0 px-5 md:px-18">
      <Carousel
        className="w-full translate-y-[-70px] md:translate-y-[-80px] xl:translate-y-[-102px]"
        plugins={[
          Autoplay({
            delay: 3000,
            stopOnFocusIn: true,
            stopOnMouseEnter: true
          })
        ]}
      >
        <CarouselContent>
          <CarouselItem className="md:basis-1/2 lg:basis-1/3 xl:basis-1/4 max-h-[424px] 2xl:max-h-[430px] border-none shadow-none rounded-0 cursor-grab">
            <div className="p-1">
              <Card className="bg-gray-50 dark:bg-[#1E1E1E]">
                <CardContent className="flex aspect-square items-center justify-center p-6">
                  <div className="flex flex-col">
                    <h3 className="text-md font-semibold">
                      Desenvolvimento de software
                    </h3>
                    <Image
                      src="/images/root/hero/hero-image-01.jpg"
                      className="w-full object-cover dark:brightness-50"
                      width={500}
                      height={500}
                      alt="Desenvolvimento de software"
                    />
                  </div>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
          <CarouselItem className="md:basis-1/2 lg:basis-1/3 xl:basis-1/4 max-h-[424px] 2xl:max-h-[430px] border-none shadow-none rounded-0 cursor-grab">
            <div className="p-1">
              <Card className="bg-gray-50 dark:bg-[#1E1E1E]">
                <CardContent className="flex aspect-square items-center justify-center p-6">
                  <div className="flex flex-col">
                    <h3 className="text-md font-semibold">
                      Tecnologia da Informação
                    </h3>
                    <Image
                      src="/images/root/hero/hero-image-02.jpg"
                      className="w-full object-cover dark:brightness-50"
                      width={500}
                      height={500}
                      alt="Tecnologia da Informação"
                    />
                  </div>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
          <CarouselItem className="md:basis-1/2 lg:basis-1/3 xl:basis-1/4 max-h-[424px] 2xl:max-h-[430px] border-none shadow-none rounded-0 cursor-grab">
            <div className="p-1">
              <Card className="bg-gray-50 dark:bg-[#1E1E1E]">
                <CardContent className="flex aspect-square items-center justify-center p-6">
                  <div className="flex flex-col">
                    <h3 className="text-md font-semibold">
                      Design
                    </h3>
                    <Image
                      src="/images/root/hero/hero-image-03.jpg"
                      className="w-full object-cover dark:brightness-50"
                      width={500}
                      height={500}
                      alt="Design"
                    />
                  </div>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
          <CarouselItem className="md:basis-1/2 lg:basis-1/3 xl:basis-1/4 max-h-[424px] 2xl:max-h-[430px] border-none shadow-none rounded-0 cursor-grab">
            <div className="p-1">
              <Card className="bg-gray-50 dark:bg-[#1E1E1E]">
                <CardContent className="flex aspect-square items-center justify-center p-6">
                  <div className="flex flex-col">
                    <h3 className="text-md font-semibold">
                      Operações
                    </h3>
                    <Image
                      src="/images/root/hero/hero-image-04.jpg"
                      className="w-full object-cover dark:brightness-50"
                      width={500}
                      height={500}
                      alt="Operações"
                    />
                  </div>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
          <CarouselItem className="md:basis-1/2 lg:basis-1/3 xl:basis-1/4 max-h-[424px] 2xl:max-h-[430px] border-none shadow-none rounded-0 cursor-grab">
            <div className="p-1">
              <Card className="bg-gray-50 dark:bg-[#1E1E1E]">
                <CardContent className="flex aspect-square items-center justify-center p-6">
                  <div className="flex flex-col">
                    <h3 className="text-md font-semibold">
                      Desenvolvimento de software
                    </h3>
                    <Image
                      src="/images/root/hero/hero-image-01.jpg"
                      className="w-full object-cover dark:brightness-50"
                      width={500}
                      height={500}
                      alt="Desenvolvimento de software"
                    />
                  </div>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
          <CarouselItem className="md:basis-1/2 lg:basis-1/3 xl:basis-1/4 max-h-[424px] 2xl:max-h-[430px] border-none shadow-none rounded-0 cursor-grab">
            <div className="p-1">
              <Card className="bg-gray-50 dark:bg-[#1E1E1E]">
                <CardContent className="flex aspect-square items-center justify-center p-6">
                  <div className="flex flex-col">
                    <h3 className="text-md font-semibold">
                      Tecnologia da Informação
                    </h3>
                    <Image
                      src="/images/root/hero/hero-image-02.jpg"
                      className="w-full object-cover dark:brightness-50"
                      width={500}
                      height={500}
                      alt="Tecnologia da Informação"
                    />
                  </div>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
          <CarouselItem className="md:basis-1/2 lg:basis-1/3 xl:basis-1/4 max-h-[424px] 2xl:max-h-[430px] border-none shadow-none rounded-0 cursor-grab">
            <div className="p-1">
              <Card className="bg-gray-50 dark:bg-[#1E1E1E]">
                <CardContent className="flex aspect-square items-center justify-center p-6">
                  <div className="flex flex-col">
                    <h3 className="text-md font-semibold">
                      Design
                    </h3>
                    <Image
                      src="/images/root/hero/hero-image-03.jpg"
                      className="w-full object-cover dark:brightness-50"
                      width={500}
                      height={500}
                      alt="Design"
                    />
                  </div>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
          <CarouselItem className="md:basis-1/2 lg:basis-1/3 xl:basis-1/4 max-h-[424px] 2xl:max-h-[430px] border-none shadow-none rounded-0 cursor-grab">
            <div className="p-1">
              <Card className="bg-gray-50 dark:bg-[#1E1E1E]">
                <CardContent className="flex aspect-square items-center justify-center p-6">
                  <div className="flex flex-col">
                    <h3 className="text-md font-semibold">
                      Operações
                    </h3>
                    <Image
                      src="/images/root/hero/hero-image-04.jpg"
                      className="w-full object-cover dark:brightness-50"
                      width={500}
                      height={500}
                      alt="Operações"
                    />
                  </div>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        </CarouselContent>
        <div className="absolute -bottom-10 right-10">
          <CarouselPrevious className="cursor-pointer" />
        </div>
        <div className="absolute -bottom-10 right-16">
          <CarouselNext className="cursor-pointer" />
        </div>
      </Carousel>
    </section>
  )
}