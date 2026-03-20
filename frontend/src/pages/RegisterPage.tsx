import React, { useState } from "react"
import { useForm, Controller } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { useNavigate, Link } from "react-router-dom"
import { useAuthStore } from "@/store/useAuthStore"
import { authService } from "@/api/auth.service"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { toast } from "sonner"
import { motion } from "framer-motion"
import { CheckSquare } from "lucide-react"

import axios from "axios"

const registerSchema = z.object({
  username: z
    .string()
    .min(3, { message: "Username must be at least 3 characters" }),
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters" }),
})

type RegisterFormValues = z.infer<typeof registerSchema>

const RegisterPage: React.FC = () => {
  const navigate = useNavigate()
  const { setUser } = useAuthStore()
  const [loading, setLoading] = useState(false)

  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  })

  const onSubmit = async (values: RegisterFormValues) => {
    try {
      setLoading(true)
      const response = await authService.register(values)
      if (response.success) {
        setUser(response.data)
        toast.success("Account created! Welcome to Focus.")
        navigate("/")
      }
    } catch (error: unknown) {
      let errorMessage = "Registration failed. Please try again."
      if (axios.isAxiosError(error)) {
        errorMessage = error.response?.data?.error || errorMessage
      }
      toast.error(errorMessage)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="mx-auto flex w-full max-w-sm flex-col items-center px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex w-full flex-col items-center"
      >
        <div className="mb-6 rounded-xl border border-border bg-muted p-2.5 shadow-lg">
          <CheckSquare className="h-6 w-6 text-foreground" />
        </div>

        <div className="mb-8 text-center">
          <h1 className="mb-2 text-2xl font-semibold tracking-tight text-foreground">
            Create an account
          </h1>
          <p className="text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-foreground underline-offset-4 hover:underline"
            >
              Sign in
            </Link>
          </p>
        </div>

        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full space-y-4"
        >
          <Controller
            name="username"
            control={form.control}
            render={({ field, fieldState }) => (
              <div className="space-y-1.5">
                <label
                  htmlFor={field.name}
                  className="ml-1 text-xs font-medium text-muted-foreground"
                >
                  Username
                </label>
                <Input
                  {...field}
                  id={field.name}
                  placeholder="johndoe"
                  className="h-10 rounded-lg border-border bg-muted/50 text-foreground transition-all placeholder:text-muted-foreground/50 focus-visible:border-ring focus-visible:ring-1 focus-visible:ring-ring"
                  aria-invalid={fieldState.invalid}
                />
                {fieldState.invalid && (
                  <p className="mt-1 ml-1 text-[10px] text-destructive">
                    {fieldState.error?.message}
                  </p>
                )}
              </div>
            )}
          />
          <Controller
            name="email"
            control={form.control}
            render={({ field, fieldState }) => (
              <div className="space-y-1.5">
                <label
                  htmlFor={field.name}
                  className="ml-1 text-xs font-medium text-muted-foreground"
                >
                  Email
                </label>
                <Input
                  {...field}
                  id={field.name}
                  placeholder="m@example.com"
                  className="h-10 rounded-lg border-border bg-muted/50 text-foreground transition-all placeholder:text-muted-foreground/50 focus-visible:border-ring focus-visible:ring-1 focus-visible:ring-ring"
                  aria-invalid={fieldState.invalid}
                />
                {fieldState.invalid && (
                  <p className="mt-1 ml-1 text-[10px] text-destructive">
                    {fieldState.error?.message}
                  </p>
                )}
              </div>
            )}
          />
          <Controller
            name="password"
            control={form.control}
            render={({ field, fieldState }) => (
              <div className="space-y-1.5">
                <label
                  htmlFor={field.name}
                  className="ml-1 text-xs font-medium text-muted-foreground"
                >
                  Password
                </label>
                <Input
                  {...field}
                  id={field.name}
                  type="password"
                  placeholder="••••••••"
                  className="h-10 rounded-lg border-border bg-muted/50 text-foreground transition-all placeholder:text-muted-foreground/50 focus-visible:border-ring focus-visible:ring-1 focus-visible:ring-ring"
                  aria-invalid={fieldState.invalid}
                />
                {fieldState.invalid && (
                  <p className="mt-1 ml-1 text-[10px] text-destructive">
                    {fieldState.error?.message}
                  </p>
                )}
              </div>
            )}
          />
          <Button
            type="submit"
            className="mt-2 h-10 w-full rounded-lg bg-primary font-medium text-primary-foreground transition-all hover:bg-primary/90"
            disabled={loading}
          >
            {loading ? "Creating account..." : "Create Account"}
          </Button>
        </form>

        <div className="mt-8 text-center">
          <p className="max-w-60 text-[11px] leading-relaxed text-muted-foreground">
            By clicking continue, you agree to our{" "}
            <Link
              to="#"
              className="underline underline-offset-4 hover:text-muted-foreground/80"
            >
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link
              to="#"
              className="underline underline-offset-4 hover:text-muted-foreground/80"
            >
              Privacy Policy
            </Link>
            .
          </p>
        </div>
      </motion.div>
    </div>
  )
}

export default RegisterPage
