import React from "react"
import { motion } from "framer-motion"
import { CheckSquare } from "lucide-react"

interface AuthHeaderProps {
  title: string
  subtitle: string
}

const AuthHeader: React.FC<AuthHeaderProps> = ({ title, subtitle }) => {
  return (
    <div className="mb-8 flex flex-col items-center text-center">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="mb-4 rounded-2xl bg-primary/10 p-3 shadow-xl shadow-primary/5"
      >
        <CheckSquare className="h-9 w-9 text-primary" />
      </motion.div>
      <h1 className="text-gradient text-4xl font-bold tracking-tight">
        {title}
      </h1>
      <p className="mx-auto mt-3 max-w-xs text-balance text-muted-foreground">
        {subtitle}
      </p>
    </div>
  )
}

export default AuthHeader
