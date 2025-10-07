"use client"
import { useState } from "react"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { useLogin } from "@/features/auth/api/use-login"
import { signUpWithGitHub, signUpWithGoogle } from "@/lib/oauth"
import { loginSchema } from "@/features/auth/schemas"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { FcGoogle } from "react-icons/fc"
import { FaGithub, FaLock, FaUnlock } from "react-icons/fa6"
import { MdEmail, MdArrowRightAlt } from "react-icons/md"
import { IoFingerPrintSharp } from "react-icons/io5"

export const SignInCard = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false)
  const { mutate, isPending } = useLogin()

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: ""
    },
  })

  const handleShowPassword = () => {
    setShowPassword(!showPassword)
  }

  const onSubmit = (values: z.infer<typeof loginSchema>) => {
    mutate({ json: values })
  }

  return (
    <div className="mx-auto w-[320px] md:w-[520px] lg:w-[580px]">
      <div className="mb-5 flex justify-center">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 198 32" focusable="false" aria-hidden="true" height="32" fill="none">
          <path fill="#FFF" d="M22.878 24.378 12.293 3.208c-.208-.458-.416-.541-.666-.541-.209 0-.459.083-.709.5-1.5 2.375-2.167 5.125-2.167 8 0 4.001 2.042 7.752 5.043 13.794.333.667.583.792 1.166.792h7.335c.542 0 .833-.208.833-.625 0-.208-.041-.333-.25-.75M7.501 14.377c-.833-1.25-1.083-1.334-1.292-1.334s-.333.083-.708.834L.208 24.46c-.166.334-.208.459-.208.625 0 .334.292.667.917.667h7.46c.5 0 .874-.416 1.083-1.208.25-1 .333-1.876.333-2.917 0-2.917-1.292-5.751-2.292-7.251z" />
          <path fill="#FFF" d="M107.447 10.828c0 2.972 1.345 5.308 6.795 6.37 3.185.707 3.893 1.203 3.893 2.265 0 1.061-.708 1.698-2.973 1.698-2.619 0-5.733-.92-7.785-2.123v4.813c1.627.778 3.751 1.698 7.785 1.698 5.662 0 7.856-2.548 7.856-6.228m0 .07c0-3.538-1.84-5.166-7.148-6.298-2.902-.637-3.61-1.274-3.61-2.194 0-1.133 1.062-1.628 2.973-1.628 2.335 0 4.6.708 6.794 1.698v-4.6c-1.557-.779-3.892-1.345-6.653-1.345-5.237 0-7.927 2.265-7.927 5.945m72.475-5.803v20.17h4.318V9.979l1.769 4.035 6.087 11.324h5.379V5.166h-4.247v13.022l-1.628-3.821-4.883-9.201zm-27.319 0h-4.671v20.17h4.671zm-10.05 14.154c0-3.538-1.841-5.166-7.149-6.298-2.902-.637-3.609-1.274-3.609-2.194 0-1.133 1.061-1.628 2.972-1.628 2.336 0 4.601.708 6.795 1.699v-4.6c-1.557-.78-3.893-1.346-6.653-1.346-5.238 0-7.927 2.265-7.927 5.946 0 2.972 1.344 5.308 6.794 6.37 3.185.707 3.893 1.203 3.893 2.264 0 1.062-.708 1.699-2.973 1.699-2.618 0-5.733-.92-7.785-2.123v4.812c1.628.779 3.751 1.699 7.785 1.699 5.592 0 7.857-2.548 7.857-6.3M71.069 5.166v20.17h9.625l1.486-4.387h-6.44V5.166zm-19.039 0v4.317h5.167v15.854h4.741V9.483h5.592V5.166zm-6.866 0h-6.157L32 25.336h5.379l.99-3.396c1.204.353 2.478.566 3.752.566s2.548-.213 3.751-.567l.991 3.398h5.379c-.07 0-7.078-20.171-7.078-20.171M42.05 18.259c-.92 0-1.77-.141-2.548-.354L42.05 9.13l2.548 8.776a9.6 9.6 0 0 1-2.548.354zM97.326 5.166H91.17l-7.078 20.17h5.38l.99-3.396c1.203.353 2.477.566 3.751.566s2.548-.213 3.751-.567l.991 3.398h5.379zm-3.114 13.093c-.92 0-1.77-.141-2.548-.354l2.548-8.776 2.548 8.776a9.6 9.6 0 0 1-2.548.354m75.306-13.093h-6.157l-7.007 20.17h5.379l.991-3.396c1.203.353 2.477.566 3.751.566s2.548-.213 3.751-.567l.991 3.398h5.379zm-3.043 13.093c-.92 0-1.77-.141-2.548-.354l2.548-8.776 2.548 8.776a10 10 0 0 1-2.548.354" />
        </svg>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <div className="relative w-full h-full">
                    <FormLabel className="absolute left-4 top-2/4 -translate-y-2/4">
                      <MdEmail className="w-6 h-6 text-gray-400" />
                    </FormLabel>
                    <Input
                      type="email"
                      autoComplete="off"
                      placeholder="Insira seu e-mail corporativo"
                      className="pl-12 h-12 rounded-md border-none border-b-[1px] bg-white border-b-gray-100 shadoway-50 focus-visible:border-0 focus-visible:ring-0 placeholder:text-base placeholder:text-gray-400 text-base md:text-base font-semibold"
                      {...field}
                    />
                  </div>
                </FormControl>
                <FormMessage className="pl-0 text-white font-semibold" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <div className="relative w-full h-full">
                    <FormLabel className="absolute left-4 top-2/4 -translate-y-2/4">
                      <IoFingerPrintSharp className="w-6 h-6 text-gray-400" />
                    </FormLabel>
                    <div>
                      <Input
                        type={showPassword ? "text" : "password"}
                        autoComplete="off"
                        placeholder="Insira sua senha secreta"
                        className="pl-12 pr-14 h-12 rounded-md border-none border-b-[1px] bg-white border-gray-100 shadow-none focus-visible:border-0 focus-visible:ring-0 placeholder:text-base placeholder:text-gray-400 text-base md:text-base font-semibold"
                        {...field}
                        onChange={(e) => {
                          field.onChange(e)
                        }}
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        className="absolute top-2/4 -translate-y-2/4 right-2 cursor-pointer hover:bg-none dark:hover:bg-transparent"
                        onClick={handleShowPassword}
                      >
                        {showPassword ? (
                          <FaUnlock className="w-5 h-5 text-blue-800 dark:text-[#333]" />
                        ) : (
                          <FaLock className="w-5 h-5 text-blue-800 dark:text-[#333]" />
                        )}
                      </Button>
                    </div>
                  </div>
                </FormControl>
                <FormMessage className="pl-0 text-white font-semibold" />
              </FormItem>
            )}
          />
          <div className="pt-3 w-full flex flex-col md:flex-row justify-between items-center gap-3 md:gap-0">
            <div className="w-full md:w-2/4">
              <Button
                disabled={isPending}
                type="submit"
                className="group pr-1 w-full h-12 rounded-full text-base dark:text-white bg-blue-800 hover:bg-blue-900 cursor-pointer"
              >
                Acessar minha conta
                <div className="ml-auto w-10 h-10 flex justify-center items-center rounded-full bg-blue-500 group-hover:animate-[bounce_0.7s_ease-in-out_infinite]">
                  <MdArrowRightAlt className="w-6 h-6" />
                </div>
              </Button>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-[1px] bg-white" />
              <p className="font-semibold text-white">ou</p>
              <div className="w-10 h-[1px] bg-white" />
            </div>
            <div className="flex items-center gap-3">
              <Button
                disabled={isPending}
                type="button"
                variant="outline"
                className="has-[>svg]:px-0 flex justify-center items-center w-12 h-12 rounded-full bg-white border-gray-50 cursor-pointer"
                onClick={() => signUpWithGoogle()}
              >
                <FcGoogle className="size-6" />
              </Button>
              <Button
                disabled={isPending}
                type="button"
                variant="outline"
                className="has-[>svg]:px-0 flex justify-center items-center w-12 h-12 rounded-full bg-white border-gray-50 cursor-pointer"
                onClick={() => signUpWithGitHub()}
              >
                <FaGithub className="size-7 text-blue-600" />
              </Button>
            </div>
          </div>
        </form>
      </Form>
    </div>
  )
}
