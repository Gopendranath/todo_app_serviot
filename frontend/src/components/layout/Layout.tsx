import React from "react"
import { useAuthStore } from "@/store/useAuthStore"
import { Button } from "@/components/ui/button"
import { useNavigate, useLocation } from "react-router-dom"
import { Toaster } from "@/components/ui/sonner"
import { cn } from "@/lib/utils"
import { useTheme } from "@/components/theme-provider"
import { Sun, Moon, LogOut, CheckSquare } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

interface LayoutProps {
  children: React.ReactNode
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { isAuthenticated, logout, user } = useAuthStore()
  const navigate = useNavigate()
  const location = useLocation()
  const { theme, setTheme } = useTheme()

  const isAuthPage = ["/login", "/register"].includes(location.pathname)

  const handleLogout = async () => {
    await logout()
    navigate("/login")
  }

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark")
  }

  // Ensure theme is a valid value for Toaster
  const toasterTheme = theme === "dark" || theme === "light" ? theme : "dark"

  return (
    <div className="min-h-screen bg-background font-sans text-foreground transition-colors duration-300 selection:bg-primary/10">
      {!isAuthPage && (
        <header className="sticky top-0 z-50 w-full border-b border-border bg-background/80 backdrop-blur-xl">
          <div className="container mx-auto flex h-16 items-center justify-between px-6">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="group flex cursor-pointer items-center gap-2.5"
              onClick={() => navigate("/")}
            >
              <div className="rounded-lg border border-border bg-muted p-1.5 transition-all duration-300 group-hover:bg-accent">
                <CheckSquare className="h-4 w-4 text-foreground" />
              </div>
              <h1 className="text-sm font-semibold tracking-tight text-foreground">
                Focus
              </h1>
            </motion.div>

            <nav className="flex items-center gap-6">
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleTheme}
                className="h-8 w-8 rounded-full border border-border bg-muted/50 transition-colors hover:bg-accent"
              >
                <AnimatePresence mode="wait">
                  {theme === "dark" ? (
                    <motion.div
                      key="sun"
                      initial={{ scale: 0.5, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0.5, opacity: 0 }}
                    >
                      <Sun className="h-3.5 w-3.5 text-muted-foreground" />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="moon"
                      initial={{ scale: 0.5, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0.5, opacity: 0 }}
                    >
                      <Moon className="h-3.5 w-3.5 text-muted-foreground" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </Button>

              {isAuthenticated ? (
                <div className="flex items-center gap-4 border-l border-border pl-6">
                  <div className="flex flex-col items-end">
                    <span className="text-xs font-semibold text-foreground">
                      {user?.username}
                    </span>
                    <span className="text-[9px] font-bold tracking-widest text-muted-foreground uppercase">
                      PRO ACCOUNT
                    </span>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={handleLogout}
                    className="h-8 w-8 rounded-lg text-muted-foreground transition-all hover:bg-muted hover:text-foreground"
                  >
                    <LogOut className="h-3.5 w-3.5" />
                  </Button>
                </div>
              ) : (
                <div className="flex items-center gap-3">
                  <Button
                    variant="ghost"
                    onClick={() => navigate("/login")}
                    className="text-xs font-medium text-muted-foreground transition-all hover:text-foreground"
                  >
                    Login
                  </Button>
                  <Button
                    onClick={() => navigate("/register")}
                    className="h-8 rounded-lg bg-primary px-4 text-xs font-semibold text-primary-foreground transition-all hover:bg-primary/90 active:scale-[0.98]"
                  >
                    Get Started
                  </Button>
                </div>
              )}
            </nav>
          </div>
        </header>
      )}

      <main
        className={cn(
          "flex min-h-screen flex-col",
          isAuthPage
            ? "items-center justify-center"
            : "container mx-auto px-6 py-12"
        )}
      >
        {children}
      </main>

      <Toaster position="bottom-right" closeButton theme={toasterTheme} />
    </div>
  )
}

export default Layout
